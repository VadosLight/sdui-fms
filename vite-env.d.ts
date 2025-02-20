/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** https://openrouter.ai/ */
  readonly VITE_AI_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
