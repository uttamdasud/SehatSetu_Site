/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OWNER_UPI_ID?: string;
  readonly VITE_OWNER_CONTACT_PHONE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
