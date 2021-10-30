//------------------------------------------------------------------------------
// Decleare all custom static modules in this file
//------------------------------------------------------------------------------

declare module '*.jpg' {
  const src: string;
  export default src;
}

//------------------------------------------------------------------------------

declare module '*.png' {
  const src: string;
  export default src;
}

//------------------------------------------------------------------------------

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

//------------------------------------------------------------------------------

declare module '*.module.scss' {
  const cls: {readonly [key: string]: string};
  export default cls;
}
