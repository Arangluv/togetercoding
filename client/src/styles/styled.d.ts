import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    bgImage: string;
    insideBgColor: string;
    errorColor: string;
    successColor: string;
  }
}
