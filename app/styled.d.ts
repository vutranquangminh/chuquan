import 'styled-components';

/**
 * styled-components theme augmentation. @aic-kits/react renders its components
 * through a styled-components ThemeProvider, so the theme returned by
 * `getTheme()` is available on every styled component via `props.theme`.
 *
 * Replace this permissive shape with the concrete theme contract as the design
 * system solidifies.
 */
declare module 'styled-components' {
  export interface DefaultTheme {
    [key: string]: any;
  }
}
