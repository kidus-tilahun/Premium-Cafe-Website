export * from "./generated/api";
export * from "./generated/api.schemas";
export {
  setBaseUrl,
  setAuthTokenGetter,
  configureApiClient,
  getBaseUrl,
} from "./custom-fetch";
export type { AuthTokenGetter, ApiClientConfig } from "./custom-fetch";
