// дополнительные данные которые не отображены на форме
export interface AdditionalData {
  blockType: string;
  pageSlug?: string; // или страница
  templateSlug?: string; // или шаблон
  blockId?: number;
  index?: number; // от 0 (нуля) в какую позицию на странице должен встать блок
}

export interface DataForServer<DataType> {
  data: DataType;
  type: string;
  id: number;
  page_slug?: string;
  template_slug?: string;
  index?: number; // от 0 (нуля) в какую позицию на странице должен встать блок
}
