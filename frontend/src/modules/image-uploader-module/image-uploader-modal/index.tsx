import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Modal, { DesktopSize, MobileSize } from 'src/components/modal';
import { IImage } from 'src/dal/images/interfaces';
import { ITab, TabContainer, Tabs, useTabs } from 'src/components/tabs';
import { Form } from 'src/components/form';

import { useMapStoreToProps } from '../selectors';

import { imagesTabs, TabValue, getMyImagesActions } from './utils';
import { CommonImagesList } from './tabs/common-images';
import { MyImagesList } from './tabs/my-images';

export type { ITab } from 'src/components/tabs';
export { TabValue } from './utils';

interface IProps {
  blockType: string;
  onClose(): void;
  onChange(value?: IImage | IImage[]): void;
  value?: IImage | IImage[];
  isMulti?: boolean;
  tabs?: ITab<TabValue>[];
}

const setInitValue = (value?: IImage | IImage[]) => {
  if (value && Array.isArray(value)) {
    return [...value];
  } else if (value) {
    return [value];
  }
  return [];
};

export const ImageUploaderModal = observer((props: IProps) => {
  const {
    onChange,
    onClose,
    blockType,
    value: initValue,
    isMulti = false,
    tabs: initTabs = imagesTabs,
  } = props;
  const [tabs, activeTab, onChangeTab] = useTabs(initTabs);
  const [commonSelectedImages, setCommonSelectedImages] = useState(setInitValue(initValue));
  const [mySelectedImages, setMySelectedImages] = useState(setInitValue(initValue));
  const [dropZoneElement, dropZoneRefCallback] = useState<HTMLElement | null>(null);
  const { deleteMyImagesAction } = useMapStoreToProps();

  const onAction = (actionId: string) => {
    switch (actionId) {
      case 'submit':
        if (activeTab.value === TabValue.common) {
          onChange(isMulti ? commonSelectedImages : commonSelectedImages[0]);
        } else {
          onChange(isMulti ? mySelectedImages : mySelectedImages[0]);
        }
        onClose();
        break;
      case 'cancel':
        onClose();
        break;
      case 'delete':
        deleteMyImagesAction(blockType, mySelectedImages);
        break;
      case 'upload':
        dropZoneElement?.click();
        break;
      default:
        console.warn('Unknown action type', actionId);
    }
  };

  const onClickCommonImage = (image: IImage) => {
    const imageHasSelected = commonSelectedImages.some(
      (selectedImage: IImage) => selectedImage.id === image.id
    );
    if (imageHasSelected) {
      setCommonSelectedImages(
        commonSelectedImages.filter((selectedImage: IImage) => selectedImage.id !== image.id)
      );
    } else if (isMulti) {
      setCommonSelectedImages([...commonSelectedImages, image]);
    } else {
      setCommonSelectedImages([image]);
    }
  };

  const onClickMyImage = (image: IImage) => {
    const imageHasSelected = mySelectedImages.some(
      (selectedImage: IImage) => selectedImage.id === image.id
    );
    if (imageHasSelected) {
      setMySelectedImages(
        mySelectedImages.filter((selectedImage: IImage) => selectedImage.id !== image.id)
      );
    } else if (isMulti) {
      setMySelectedImages([...mySelectedImages, image]);
    } else {
      setMySelectedImages([image]);
    }
  };

  return (
    <Modal onClose={onClose} mobileSize={MobileSize.L} desktopSize={DesktopSize.S} title='Картинки'>
      <Tabs tabs={tabs} activeTab={activeTab} onChangeTab={onChangeTab} />
      <Form
        onAction={onAction}
        actions={activeTab.value === TabValue.my ? getMyImagesActions(mySelectedImages) : undefined}
        submitActionLabel='Выбрать'>
        <TabContainer value={TabValue.common} activeTabValue={activeTab.value}>
          {activeTab.value === TabValue.common && (
            <CommonImagesList
              blockType={blockType}
              selectedImages={commonSelectedImages}
              onClickImage={onClickCommonImage}
              emptyListMessage='Нет доступных изображений'
            />
          )}
        </TabContainer>
        <TabContainer value={TabValue.my} activeTabValue={activeTab.value}>
          {activeTab.value === TabValue.my && (
            <MyImagesList
              blockType={blockType}
              selectedImages={mySelectedImages}
              onClickImage={onClickMyImage}
              dropZoneRefCallback={dropZoneRefCallback}
            />
          )}
        </TabContainer>
      </Form>
    </Modal>
  );
});
