export interface IImage {
  id: number;
  src: string; // ссылка на исходник картинки
  preview?: string; // ссылка на preview (если есть)

  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  borderRadius?: number; // в процентах от размера изображения
  width?: number;
  height?: number;
  ratio?: number; // соотношение сторон у preview (width/height)
}
