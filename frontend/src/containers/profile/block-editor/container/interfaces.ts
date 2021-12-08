// дополнительные данные которые не отображены на форме
export interface AdditionalData {
  pageSlug: string;
  blockType: string;
  blockId?: number;
  index?: number; // от 0 (нуля) в какую позицию на странице должен встать блок
}

export interface DataForServer<FormInputs> {
  data: FormInputs;
  page_slug: string;
  type: string;
  id: number;
  index?: number; // от 0 (нуля) в какую позицию на странице должен встать блок
}
