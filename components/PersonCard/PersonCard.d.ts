import type { CSSProperties, MouseEventHandler } from 'react';

export interface PersonCardProps {
  name: string;
  /** Avatar initials. Derived from `name` when omitted. */
  initials?: string;
  location?: string;
  /** Dinners attended — rendered after the location. */
  dinners?: number;
  /** Interest tags. */
  tags?: string[];
  /** Shows the blue verified check next to the name. */
  verified?: boolean;
  /** Drives the follow button's appearance and label. */
  following?: boolean;
  /** CSS background for the avatar — vary it per person. */
  avatarGradient?: string;
  /** Omit to hide the follow button entirely. */
  onFollow?: MouseEventHandler;
  followLabel?: string;
  followingLabel?: string;
  style?: CSSProperties;
}

export function PersonCard(props: PersonCardProps): JSX.Element;
