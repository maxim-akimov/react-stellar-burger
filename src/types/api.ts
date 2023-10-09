// export interface IResponse {
//   body: Response,
//   bodyUsed: boolean,
//   headers: Headers,
//   ok: boolean,
//   redirected: boolean,
//   status: number,
//   statusText: string,
//   type: string,
//   url: string,
//   json(): Promise
// }

// export type TResponseBody<TRawUser> = {
//   success: boolean;
//
//   user?: TRawUser;
//   message?: string;
//   headers?: Headers;
// };

export interface IFetchOptions {
  method: string,
  mode: string,
  cache: string,
  credentials: string,
  headers: {
    'Content-Type': string
  },
  redirect: string,
  referrerPolicy: string,
}

export type TCustomFetchOptions<DataType = {}> = {
  body?: DataType;
  headers?: Headers;
  method: string
}


export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]: TDataType
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
};

export interface ICustomBody<T extends any> extends Body {
  json(): Promise<T>;
}

export interface CustomResponse<T> extends ICustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}