import type { AuthOptions } from "next-auth";
import { ls } from "@/lib/lightfunnels";
import db from "@/lib/db";

const prefix = "salzi";

export const authOptions: AuthOptions = {
  secret: process.env.APP_SECRET,
  callbacks: {
    session(opts: any) {
      if (opts.session?.user) {
        opts.session.user.id = Number(opts.token.sub);
      }
      return opts.session;
    },
  },
  cookies: {
    sessionToken: {
      name: `${prefix}.session-token`,
      options: { path: "/", sameSite: "none", secure: true },
    },
    callbackUrl: {
      name: `${prefix}.callback-url`,
      options: { path: "/", sameSite: "none", secure: true },
    },
    csrfToken: {
      name: `${prefix}.csrf-token`,
      options: { path: "/", sameSite: "none", secure: true },
    },
    pkceCodeVerifier: {
      name: `${prefix}.pkce.code_verifier`,
      options: { path: "/", sameSite: "none", secure: true },
    },
    state: {
      name: `${prefix}.state`,
      options: { path: "/", sameSite: "none", secure: true },
    },
    nonce: {
      name: `${prefix}.nonce`,
      options: { path: "/", sameSite: "none", secure: true },
    },
  },
  providers: [
    {
      type: "oauth",
      id: "lightfunnels",
      name: "Lightfunnels",
      clientId: process.env.LF_APP_CLIENT,
      clientSecret: process.env.LF_APP_SECRET,
      authorization:
        process.env.LF_FRONT_URL + "/admin/oauth?scope=orders,funnels,products",
      token: process.env.LF_URL + "/oauth/access_token",

      userinfo: {
        async request(ctx) {
          try {
            if (!ctx.tokens.access_token) {
              throw new Error("Access token is missing");
            }

            const response = await fetch(process.env.LF_URL + "/api/v2", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: "bearer " + ctx.tokens.access_token,
              },
              body: JSON.stringify({
                query: `
                  query app{
                    account{
                        id
                        email
                        account_name
                        image{
                          url
                        }
                      }
                    }
                  `,
              }),
            });

            if (!response.ok) {
              console.error("Response not OK:", response);
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();

            const res = json.data.account;
            const userInfo = {
              id: res.id,
              name: res.account_name,
              email: res.email,
              image: res.image?.url,
            };

            if (!userInfo.id) {
              throw new Error("User ID is missing");
            }

            const existingAccount = await db('accounts')
              .where({ lightfunnels_account_id: userInfo.id })
              .first();

            if (existingAccount) {
              await db('accounts')
                .where({ lightfunnels_account_id: userInfo.id })
                .update({
                  lightfunnels_token: ctx.tokens.access_token,
                  email: userInfo.email,
                  updated_at: new Date()
                });
            } else {
              await db('accounts').insert({
                email: userInfo.email,
                lightfunnels_token: ctx.tokens.access_token,
                lightfunnels_account_id: userInfo.id,
                created_at: new Date(),
                updated_at: new Date()
              });
            }

            const backendURL = `${process.env.WEBHOOKS_URL}/api/webhooks`;

            const webhooks = [
              {
                type: "app/uninstalled",
                url: backendURL + `/uninstall`,
                settings: {},
                version: "v2",
              },
            ];

            try {
              await Promise.all(
                webhooks.map((node) => {
                  return ls({
                    token: ctx.tokens.access_token as string,
                    data: {
                      query: `
                          mutation webhooksCreateMutation($node: WebhookInput!){
                            createWebhook(node: $node){
                              _id
                            }
                          }
                        `,
                      variables: {
                        node,
                      },
                    },
                  }).catch((resp:any) => {
                    if (resp.errors) {
                      if (
                        resp.errors.every(
                          (err: any) => err.key === "webhooks_duplicated",
                        )
                      ) {
                        return;
                      }
                    }
                    return Promise.reject(resp);
                  });
                }),
              );
            } catch (webhookError: any) {
              console.error("Error creating webhooks:", webhookError[0].key);
            }
            return {
              ...userInfo,
            };
          } catch (error) {
            console.error(
              "Error in userinfo.request:",
              JSON.stringify(error, null, 2),
            );
            throw error;
          }
        },
      },
      profile(profile) {
        return profile;
      },
    },
  ],
};
