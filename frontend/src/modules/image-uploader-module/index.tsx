import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { IImage } from 'src/dal/images/interfaces';

import { ImageUploaderModal } from './image-uploader-modal';

interface IProps {
  openerElement: HTMLElement | null;
  blockType?: string; // для какого типа блока запросить (создать) изображения
  getTags?: string[]; // с какими тегами запросить изображения
  createTags?: string[]; // с какими тегами создать изображения
  isMulti?: boolean; // возможность выбора нескольких изображений
  value?: IImage | IImage[]; // список выбранных изображений
  onChange?(value?: IImage | IImage[]): void;
  isCommon?: boolean; // загружаемые изображения удут общими для всех пользователей
  isEditable?: boolean; // возможность редактировать свои изображения
  isEditBorderRadius?: boolean;
  isEditBorder?: boolean;
}

export const ImageUploaderModule = observer((props: IProps) => {
  const {
    openerElement,
    onChange,
    blockType,
    getTags,
    createTags,
    value,
    isMulti,
    isCommon,
    isEditable,
    isEditBorderRadius,
    isEditBorder,
  } = props;
  const [isOpenImageUploaderModal, setIsOpenImageUploaderModal] = useState(false);

  const openImageUploaderModal = () => setIsOpenImageUploaderModal(true);
  const closeImageUploaderModal = () => setIsOpenImageUploaderModal(false);

  const onChangeHandler = (value?: IImage | IImage[]) => {
    onChange && onChange(value);
  };

  useEffect(() => {
    if (openerElement) {
      openerElement.addEventListener('click', openImageUploaderModal);
    }

    return () => {
      if (openerElement) {
        openerElement.removeEventListener('click', openImageUploaderModal);
      }
    };
  }, [openerElement]);

  return (
    <>
      {isOpenImageUploaderModal && (
        <ImageUploaderModal
          blockType={blockType}
          getTags={getTags}
          createTags={createTags}
          value={value}
          onClose={closeImageUploaderModal}
          onChange={onChangeHandler}
          isMulti={isMulti}
          isCommon={isCommon}
          isEditable={isEditable}
          isEditBorderRadius={isEditBorderRadius}
          isEditBorder={isEditBorder}
        />
      )}
    </>
  );
});
