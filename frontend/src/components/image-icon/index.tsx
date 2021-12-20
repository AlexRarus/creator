import React, { useState, useEffect } from 'react';
import { IImage } from 'src/dal/images/interfaces';

import { ImageIconWrapper, ImageElement, IconElement } from './style';

interface IProps {
  image?: IImage;
  icon?: IImage;
  size?: number; // в пикселях размер изображения
  iconColor?: string; // цвет иконки (если svg)
}

/**
 * если УРЛ картинки заканчивается на .svg то компонент загружает его как текст и вставляет тег <svg>
 * @param props
 * @constructor
 */
export const ImageIcon = React.forwardRef((props: IProps, ref: any) => {
  const { image, icon, size, iconColor } = props;
  const targetData = image || icon || ({} as any);
  const [targetDataUrl, setTargetDataUrl] = useState(targetData?.preview || targetData?.src || '');
  const [isSVG] = useState(targetDataUrl.split('.').pop() === 'svg');
  const [iconElement, iconRefCallback] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setTargetDataUrl(targetData?.preview || targetData?.src || '');
  }, [image, icon]);

  useEffect(() => {
    if (isSVG && iconElement) {
      // если картинка svg, запрашиваем ее и вставляем в разметку
      fetch(`/media/${targetDataUrl}`)
        .then((response) => response.text())
        .then((svg) => iconElement.insertAdjacentHTML('afterbegin', svg));
    }
  }, [targetDataUrl, iconElement]);

  return (
    <ImageIconWrapper size={size} borderRadius={targetData?.borderRadius} ref={ref}>
      {isSVG && <IconElement size={size} iconColor={iconColor} ref={iconRefCallback} />}
      {!isSVG && targetDataUrl && <ImageElement size={size} imageUrl={`/media/${targetDataUrl}`} />}
    </ImageIconWrapper>
  );
});

ImageIcon.displayName = 'ImageIcon';
