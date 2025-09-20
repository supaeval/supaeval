export interface ListResponseData<T> {
  items: T[];
  count: number;
  page: number;
  nextPage: number | null;
}
