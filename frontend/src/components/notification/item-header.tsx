import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

import { INotificationItem, INotificationInnerProps } from './interfaces';
import {
  NotificationHeaderWrapper,
  NotificationHeaderIconWrapper,
  NotificationHeaderTitle,
  CloseIconWrapper,
} from './style';

const levelIconsMap = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const levelTitlesMap = {
  ru: {
    success: 'Успех',
    warning: 'Внимание',
    error: 'Ошибка',
    info: 'Уведомление',
  },
  en: {
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
    info: 'Information',
  },
};

export default function NotificationItemHeader(props: INotificationItem & INotificationInnerProps) {
  const { level, hasCloseButton, onClose, locale } = props;
  const Icon = levelIconsMap[level];
  const title = levelTitlesMap[locale][level];

  return (
    <NotificationHeaderWrapper level={level}>
      <NotificationHeaderIconWrapper level={level}>
        <Icon />
      </NotificationHeaderIconWrapper>
      <NotificationHeaderTitle>{title}</NotificationHeaderTitle>
      {hasCloseButton && (
        <CloseIconWrapper onClick={onClose}>
          <CloseIcon />
        </CloseIconWrapper>
      )}
    </NotificationHeaderWrapper>
  );
}
