declare module 'react-date-range' {
  import * as React from 'react';

  export interface Range {
    startDate?: Date;
    endDate?: Date;
    key?: string;
  }

  export interface DateRangeProps {
    ranges: Range[];
    onChange: (range: { selection: Range }) => void;
    moveRangeOnFirstSelection?: boolean;
    editableDateInputs?: boolean;
    months?: number;
    direction?: 'horizontal' | 'vertical';
    showDateDisplay?: boolean;
    showPreview?: boolean;
    locale?: Locale;
  }

  export class DateRange extends React.Component<DateRangeProps> {}
  export type RangeKeyDict = { [key: string]: Range };
}
