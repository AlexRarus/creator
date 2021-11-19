// дополнительные данные которые не отображены на форме
export interface AdditionalData {
  pageSlug: string;
  blockType: string;
  blockId?: string;
}

export interface DataForServer<FormInputs> {
  data: FormInputs;
  page_slug: string;
  type: string;
  id: string;
}
