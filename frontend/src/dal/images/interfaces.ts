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
  borderX?: number; // горизонтальный бордер для редактора картинок
  borderY?: number; // вертикальный бордер для редактора картинок
}
