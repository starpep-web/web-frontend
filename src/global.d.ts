declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL?: string
      BIO_API_URL?: string

      NEXT_PUBLIC_URL?: string
      NEXT_PUBLIC_DOWNLOADS_URL?: string
      LOCAL_DOWNLOADS_URL?: string

      NEXT_REVALIDATE_TIME?: string
      NEXT_INTERNAL_AUTH_SECRET?: string

      STRAPI_API_TOKEN?: string
      NEXT_PUBLIC_STRAPI_URL?: string
    }
  }
}

declare module '*.svg' {
  import React from 'react';

  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

declare module '*.svg?url' {
  const content: any;
  export default content;
}
