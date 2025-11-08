/// <reference types="jest" />

declare module "next/link" {
  import { LinkProps } from "next/dist/client/link";
  import * as React from "react";
  export default function Link(props: LinkProps): React.ReactElement;
}

declare module "next/image" {
  import { ImageProps } from "next/dist/client/image";
  import * as React from "react";
  export default function Image(props: ImageProps): React.ReactElement;
}

