/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** backend api base url */
  readonly VITE_API_BASE_URL: string;
  /** websocket base url */
  readonly VITE_WS_BASE_URL: string;
  /** profile image api base url */
  readonly VITE_PROFILE_IMAGE_API: string;
}
