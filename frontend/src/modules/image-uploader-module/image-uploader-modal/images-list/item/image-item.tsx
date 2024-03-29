import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { IImage } from 'src/dal/images/interfaces';
import Replies from 'src/components/replies';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popup from 'src/components/popup';
import { ImageIcon } from 'src/components/image-icon';
import { isMobile } from 'react-device-detect';

import { useMapStoreToProps } from '../../../selectors';
import { ImageEditorModal } from '../../../image-editor-modal';

import { ImageItemOuter, ImageItemInner, ActionsButton, ActionsList } from './style';
import { ActionConfirmModal } from './confirm/action-confirm';
import { ActionButton } from './action-button';
import { MobileActions } from './mobile-actions';
import { ActionIcon } from './action-icon';

export type ActionKind = 'primary' | 'secondary' | 'delete';

export interface IAction {
  id: string;
  label: string;
  kind?: ActionKind;
  Icon?: any;
  disabled?: boolean;
  needConfirm?: boolean;
  confirmTitle?: any;
  confirmMessage?: any;
}

interface IProps {
  image: IImage;
  onClickImage(image: IImage): void;
  isSelected: boolean;
  actions?: IAction[];
  deleteImage?(image: IImage): void;
  updateImage?(image: IImage): void;
  blockType?: string; // для какого типа блока запросить (создать) изображения
  getBlockTypes: string[]; // для какого типа блока запросить изображения
  getTags?: string[]; // с какими тегами запросить (создать) изображения
  isEditBorderRadius?: boolean;
  isEditBorder?: boolean;
}

export const ImageItem = observer((props: IProps) => {
  const {
    getBlockTypes,
    getTags,
    image,
    onClickImage,
    isSelected,
    actions = [],
    deleteImage,
    updateImage,
    isEditBorderRadius,
    isEditBorder,
  } = props;
  const [isOpenDesktopActions, setIsOpenDesktopActions] = useState(false);
  const [isOpenMobileActions, setIsOpenMobileActions] = useState(false);
  const [desktopActionsElement, desktopActionsRefCallback] = useState<HTMLElement | null>(null);
  const [desktopActionsButtonWidth, setDesktopActionsButtonWidth] = useState(0);
  const [confirmAction, setConfirmAction] = useState<IAction | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageOuterElement, imageOuterRefCallback] = useState<HTMLElement | null>(null);
  const [imageOuterWidth, setImageOuterWidth] = useState(100);
  const { deleteMyImagesAction, getMyImagesAction } = useMapStoreToProps();

  useEffect(() => {
    if (desktopActionsElement) {
      setDesktopActionsButtonWidth(desktopActionsElement.getBoundingClientRect().width);
    }
    if (imageOuterElement) {
      setImageOuterWidth(imageOuterElement.getBoundingClientRect().width);
    }
  }, [desktopActionsElement, imageOuterElement]);

  const onClick = (e: any) => {
    // если кликнули на экшены, то не снимаем выдиление картинки если оно было
    if (!e.defaultPrevented || !isSelected) {
      onClickImage(image);
    }
  };

  const startEditing = () => setIsEditing(true);
  const endEditing = () => setIsEditing(false);
  const onAction = (actionId: string) => {
    switch (actionId) {
      case 'delete':
        deleteMyImagesAction([image], getBlockTypes, getTags);
        deleteImage && deleteImage(image);
        break;
      case 'edit':
        startEditing();
        break;
      default:
        console.warn('Unknown action type', actionId);
    }
  };
  const onSuccessEditing = (image: IImage) => {
    getMyImagesAction(getBlockTypes, getTags);
    updateImage && updateImage(image);
  };

  const openMobileActions = () => setIsOpenMobileActions(true);
  const closeMobileActions = () => setIsOpenMobileActions(false);

  const toggleDesktopActions = () => setIsOpenDesktopActions((isOpen: boolean) => !isOpen);
  const closeDesktopActions = () => setIsOpenDesktopActions(false);

  const actionClickHandler = (action: IAction) => {
    if (action.needConfirm) {
      setConfirmAction(action);
    } else {
      closeMobileActions();
      closeDesktopActions();
      onAction && onAction(action.id);
    }
  };

  const onConfirmAction = (action: IAction) => {
    setConfirmAction(null);
    closeMobileActions();
    closeDesktopActions();
    onAction && onAction(action.id);
  };
  const onCancelConfirm = () => setConfirmAction(null);

  const openActions = (e: any) => {
    e.preventDefault();

    if (isMobile) {
      openMobileActions();
    } else {
      toggleDesktopActions();
    }
  };

  return (
    <>
      <ImageItemOuter
        isSelected={isSelected}
        onClick={onClick}
        imageOuterWidth={imageOuterWidth}
        ref={imageOuterRefCallback}>
        {actions.length > 1 && (
          <ActionsButton
            onClick={openActions}
            ref={desktopActionsRefCallback}
            isActive={isOpenDesktopActions || isOpenMobileActions}>
            <MoreVertIcon />
          </ActionsButton>
        )}
        {actions.length === 1 && (
          <ActionsButton
            onClick={(e: any) => {
              e.preventDefault();
              actionClickHandler(actions[0]);
            }}>
            <ActionIcon action={actions[0]} />
          </ActionsButton>
        )}
        <ImageItemInner isActive={isOpenDesktopActions || isOpenMobileActions}>
          <ImageIcon image={image} />
          <Replies />
        </ImageItemInner>
      </ImageItemOuter>
      <Popup
        isOpen={isOpenDesktopActions}
        onClose={closeDesktopActions}
        openerElement={desktopActionsElement}
        position='bottom'
        maxHeight={320}
        plateMargin={3}
        zIndex={999}
        hasPointer={false}>
        <ActionsList width={desktopActionsButtonWidth}>
          {actions?.map((action: IAction) => (
            <ActionButton
              key={action.id}
              action={action}
              onClick={() => actionClickHandler(action)}
            />
          ))}
        </ActionsList>
      </Popup>
      {isOpenMobileActions && (
        <MobileActions
          onClose={closeMobileActions}
          actions={actions}
          onActionClick={actionClickHandler}
        />
      )}
      {confirmAction && (
        <ActionConfirmModal
          action={confirmAction}
          onClose={onCancelConfirm}
          onConfirm={onConfirmAction}
        />
      )}
      {isEditing && (
        <ImageEditorModal
          onClose={endEditing}
          onSuccess={onSuccessEditing}
          image={image}
          isEditBorderRadius={isEditBorderRadius}
          isEditBorder={isEditBorder}
        />
      )}
    </>
  );
});
