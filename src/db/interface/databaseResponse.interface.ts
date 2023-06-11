export interface IDatabaseResponse<T> {
  status: number,
  data: string | T,
}
