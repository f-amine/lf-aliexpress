type Opts = {
  data: {
    query: string;
    variables?: { [key: string]: any };
  };
  token: string | undefined;
};

export function ls({ token, data }: Opts): Promise<any> {
  if (!token) {
    return Promise.reject(new Error("Token is required"));
  }

  if (!process.env.LF_URL) {
    return Promise.reject(new Error("LF_URL is not defined"));
  }

  return fetch(`${process.env.LF_URL}/api2`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((response) => {
      if (response.errors) {
        const er = new LfError(response.errors);
        return Promise.reject(er);
      }
      return response;
    });
}

export function lf({ token, data }: Opts): Promise<any> {
  if (!token) {
    return Promise.reject(new Error("Token is required"));
  }

  if (!process.env.LF_URL) {
    return Promise.reject(new Error("LF_URL is not defined"));
  }

  return fetch(`${process.env.LF_URL}/graphql`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((response) => {
      if (response.errors) {
        const er = new LfError(response.errors);
        return Promise.reject(er);
      }
      return response;
    });
}
export class LfError extends Error {
  constructor(errors: any) {
    super();
    this.errors = errors;
  }
  errors: { key: string }[];
}
