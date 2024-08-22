declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL?: string

      PUBLIC_URL?: string
      PUBLIC_DOWNLOADS_URL?: string
      LOCAL_DOWNLOADS_URL?: string

      NEXT_REVALIDATE_TIME?: string
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
