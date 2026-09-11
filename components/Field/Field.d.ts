import type { CSSProperties, ChangeEventHandler } from 'react';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldProps {
  label?: string;
  /** Native input type. Ignored when `options` is set. */
  type?: string;
  placeholder?: string;
  /** Helper text below the control. Hidden while `error` is set. */
  hint?: string;
  /** Error message — also turns the border red. */
  error?: string;
  /** Green border for a validated value. */
  success?: boolean;
  /** `dark` for app surfaces (orange focus ring), `light` for marketing (gold). */
  theme?: 'light' | 'dark';
  /** Renders a <select> with these options instead of an <input>. */
  options?: Array<string | FieldOption>;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  style?: CSSProperties;
}

export function Field(props: FieldProps): JSX.Element;
