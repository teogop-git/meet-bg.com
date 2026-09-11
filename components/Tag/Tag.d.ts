import type { CSSProperties, ReactNode, MouseEventHandler } from 'react';

export type TagTone = 'cream' | 'gold' | 'dark' | 'orange' | 'active';

export interface TagProps {
  /** `cream`/`gold` on light marketing surfaces · `dark`/`orange`/`active` on dark app surfaces. */
  tone?: TagTone;
  /** Makes the tag selectable — e.g. interest pickers in onboarding. */
  onClick?: MouseEventHandler;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Tag(props: TagProps): JSX.Element;
