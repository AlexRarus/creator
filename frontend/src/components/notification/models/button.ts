import { v4 as uuidv4 } from 'uuid';

import { IButtonData, IButton, TButtonType } from '../interfaces';

export default class ButtonModel implements IButton {
  buttonId: string;
  label: string;
  onClick: (buttonId: string) => void;
  closeOnButton: boolean;
  buttonType: TButtonType;

  constructor(data: IButtonData) {
    this.buttonId = data.buttonId || uuidv4();
    this.label = data.label;
    this.onClick = data.onClick;
    this.closeOnButton = data.closeOnButton === undefined || data.closeOnButton;
    this.buttonType = data.buttonType || 'link';
  }
}
