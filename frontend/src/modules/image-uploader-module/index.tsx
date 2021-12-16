import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { IImage } from 'src/dal/images/interfaces';

import { ImageUploaderModal } from './image-uploader-modal';

interface IProps {
  openerElement: HTMLElement | null;
  blockType: string;
  isMulti?: boolean; // возможность выбора нескольких изображений
  value?: IImage | IImage[]; // список выбранных изображений
  onChange?(value?: IImage | IImage[]): void;
  isEditable?: boolean; // возможность редактировать свои изображения
}

export const ImageUploaderModule = observer((props: IProps) => {
  const { openerElement, onChange, blockType, value, isMulti, isEditable } = props;
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
          value={value}
          onClose={closeImageUploaderModal}
          onChange={onChangeHandler}
          isMulti={isMulti}
          isEditable={isEditable}
        />
      )}
    </>
  );
});
