import { RawData, DataForServer } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer => ({
  id: rawData.id,
  x: rawData.x,
  y: rawData.y,
  width: rawData.width,
  height: rawData.height,
  borderRadius: rawData.borderRadius,
  rotate: rawData.rotate,
  scale: rawData.scale,
  ratio: rawData.ratio,
  previewFile: rawData.previewFile as any,
});
