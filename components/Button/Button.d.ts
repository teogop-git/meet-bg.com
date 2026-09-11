import type { CSSProperties, ReactNode, MouseEventHandler } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'gold'
  | 'outline'
  | 'ghost'
  | 'appPrimary'
  | 'appOutline'
  | 'appGhost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Visual treatment. The three `app*` variants are for dark app surfaces. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
