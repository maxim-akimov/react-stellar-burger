import { IUser } from "./data";

export type TCustomFetchOptions = {
  body?: BodyInit;
  headers?: Headers;
  method: string
}


// type TResponseBodyWithKey<TDataKey extends string = '', TDataType = {}> = {
//   [key in TDataKey]: TDataType
// };
//
// type TResponseBodyWithoutKey<TDataType = {}> = {
//   [key in TDataType]: TDataType
// }


type TResponseWithKey<TDataKey extends string, TDataType = {}> = {
  [key in TDataKey]: TDataType
}


type TResponseWithoutKey<TDataType = {}> = TDataType


type TConditionalResponseType<TDataKey extends string | undefined, TDataType> =
  TDataKey extends string
  ? TResponseWithKey<TDataKey, TDataType>
  : TResponseWithoutKey<TDataType>;


export type TResponseBody<TDataType = {}, TDataKey extends string | undefined = undefined,> =
  TConditionalResponseType<TDataKey, TDataType> & {
  success: boolean;
  message?: string;
  headers?: Headers;
  json(): Promise<TDataType>
};

// export type TResponseBody<TDataKey extends string | undefined = '', TDataType = {}> = {
//   [key in TDataKey]: TDataType
// } & {
//   success: boolean;
//   message?: string;
//   headers?: Headers;
// };




export interface IRefreshTokenResponse {
  accessToken: string,
  refreshToken: string
}