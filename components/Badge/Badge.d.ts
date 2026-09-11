import type { CSSProperties, ReactNode } from 'react';

export type BadgeTone = 'green' | 'yellow' | 'red' | 'blue' | 'verified' | 'count';

export interface BadgeProps {
  /** `green` confirmed · `yellow` seats running low · `red` full · `blue` waitlist · `verified` identity · `count` dinners attended. */
  tone?: BadgeTone;
  /** Leading status dot. Defaults to on for the tones that define one. */
  dot?: boolean;
  /** Leading checkmark — use with `tone="verified"`. */
  check?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
