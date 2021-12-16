import { IConfirmButton } from '../confirm/action-confirm';

export interface IAction {
  id: string;
  label: string;
  kind?: ActionKind;
  disabled?: boolean;
  needConfirm?: boolean;
  confirmTitle?: any;
  confirmMessage?: any;
  confirmButton?: IConfirmButton;
}

export type ActionKind = 'primary' | 'secondary' | 'delete';

export interface IProps {
  onClose(): void;
  actions?: IAction[];
  onActionClick(action: IAction): void;
  zIndex?: number;
  [key: string]: any;
}
