export interface DataTableColumn {
  name: string;
  objectKey?: string;
  label: string;
  tooltip?: string;
  numeric?: boolean;
  format?: (value: any) => any;
}
