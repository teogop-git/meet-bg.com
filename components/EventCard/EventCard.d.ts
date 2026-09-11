import type { CSSProperties, MouseEventHandler } from 'react';

export type SeatsTone = 'normal' | 'low' | 'full';

export interface EventCardProps {
  /** Formatted date line, e.g. `"Пет, 25 Апр · 19:30"`. Rendered in gold caps. */
  date?: string;
  /** Dinner name — set in the display serif. */
  title: string;
  city?: string;
  /** Pre-formatted, currency included, e.g. `"€33"` or `"£18"`. */
  price?: string;
  /** Availability line, e.g. `"3 места остават"`. */
  seats?: string;
  /** Colours the availability pill: amber when running low, red when full. */
  seatsTone?: SeatsTone;
  /** Overrides the label shown across the header band. Falls back to `city`. */
  imageLabel?: string;
  /** CSS background for the header band — swap per city or per cuisine. */
  gradient?: string;
  /** Renders an <a> instead of a <div>. */
  href?: string;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
}

export function EventCard(props: EventCardProps): JSX.Element;
