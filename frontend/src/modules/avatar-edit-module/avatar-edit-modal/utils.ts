import { RawData, DataForServer } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer => ({
  x: rawData.x,
  y: rawData.y,
  width: rawData.width,
  height: rawData.height,
  borderRadius: rawData.borderRadius,
  rotate: rawData.rotate,
  scale: rawData.scale,
  sourceFile: rawData.sourceFile as any,
  previewFile: rawData.previewFile as any,
});
