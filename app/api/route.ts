import db from "@/lib/db";
import { graphql } from "graphql";
import { NextRequest, NextResponse } from "next/server";
import setupLoaders from "@/graphql/loaders";
import schema from "@/graphql/schema";
import { getSessionAccount } from "@/lib/session";
import { Account } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { account, error, status } = await getSessionAccount();
    
    if (error) {
      return NextResponse.json(
        {
          data: null,
          errors: [
            {
              key: 'authentication_error',
              message: error
            },
          ],
        },
        { status }
      );
    }

    const body = await request.json();
    
    const loaders = setupLoaders();
    
    const context = {
      loaders,
      account: account as Account,
      db
    };
    
    const response = await graphql({
      schema,
      source: body.query,
      rootValue: {},
      contextValue: context,
      variableValues: body.variables,
    });
    
    // Return GraphQL response
    return NextResponse.json(response);
  } catch (error) {
    console.error('GraphQL API error:', error);
    
    return NextResponse.json(
      {
        data: null,
        errors: [
          {
            message: 'An error occurred while processing your request',
            path: [],
            extensions: {
              code: 'INTERNAL_SERVER_ERROR'
            }
          },
        ],
      },
      { status: 500 }
    );
  }
}
