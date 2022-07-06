import { MouseEvent, ReactNode } from 'react';

export interface IProps {
  isOpen: boolean; // показать или скрыть компонент
  openerElement: HTMLElement | null; // ссылка на елемент относительно которого будет позиционироваться попап
  pointerTargetElement?: HTMLElement | null; // ссылка на компонент на который будет указывать треугольник (для правильного позиционирования PointerTarget должен быть внутри Opener)
  children: ReactNode; // контент Popup
  onClose?(event?: MouseEvent<HTMLDivElement>): void; // если передать, то компонент будет закрываться по клику вне пупапа
  onClick?(event?: any): void; // будет вызван при клике на компонент
  shouldRepositionOnClick?: boolean; // если true то при клике Popup будет корректировать позицию
  hasPointer?: boolean; // указатель (треугольничек) указывает на PointerTarget или на Opener если первый отсутсвует
  pointerSize?: number; // размер указателя, default 10
  plateMargin?: number; // отступ от элемента Opener, default 10
  position?: TPosition; // с какой стороны от Opener будет отображаться Popup (top, right, bottom, left)
  verticalAlign?: TAlign; // вертикальное выравнивание Popup относительно Opener (start, center, end)
  horizontalAlign?: TAlign; // горизонтальное выравнивание Popup относительно Opener (start, center, end)
  maxHeight?: number; // высота Popup после которой начнется прокрутка контента, default 300
  autoAlign?: boolean; // менять выравнивание если компонент выходит за границы экрана
  floatPosition?: boolean; // менять позицию (top|right|bottom|left) если компонент выходит за границы экрана
  floatPositionReflect?: boolean; // если popup не помещается снизу отобразить (зеркально) сверху и наоборот, если не вмещается слева - будет отображен справа от элемента
  fitOnScreen?: boolean; // менять высоту компонента так что бы он не выходил за границу экрана (компонент всегда будет видно полностью)
  horizontalShift?: number; // смещение позиции пупапа по горизонтале (после всех вычислений)
  verticalShift?: number; // смещение позиции пупапа по вертикали (после всех вычислений)
  isCloseOnClick?: boolean;
  zIndex?: number; // default 10
  overflow?: string;
  dataTestId?: string;
  color?: string;
  background?: string;
  className?: string;
  isTransparent?: boolean; // прозрачный фон попапа
  updatePositionHash?: any; // пересчет позиции попапа при изменении hash (нужно когда меняется контент внутри попапа)
  onlyButtonClose?: boolean; // запрет закрытия попапа по любым кликам (вне области попапа) кроме кнопки закрыть
  cssClass?: string; // class для попапа, если дефолтный не подходит
  borderRadius?: string;
  borderColor?: string;
  isFixed?: boolean; // position: fixed
  hasBorder?: boolean;
  hasShadow?: boolean;
  preventCloseClassNames?: string[]; // предотвращать закрытие по клику на элементы с такими классами (могут находится где угодно на странице)
  withLayout?: boolean; // пупап будет открываться с прозрачной подложкой на весь экран для перехвата события клика вне пупапа (нужно для случаев когда на странице есть области с отменой всплытия событий)
}

export interface IOpenerPosition {
  x: number;
  y: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface IPlatePosition {
  width: number;
  height: number;
}

export interface IFieldCoordinates {
  left: number;
  top: number;
  bottom: number;
  right: number;
}

export interface IPlateProps extends Partial<Omit<IProps, 'onClick'>> {
  openerPosition: IOpenerPosition | null;
  platePosition: IPlatePosition | null;
  fieldCoordinates: IFieldCoordinates | null;
  pointerTargetPosition: IOpenerPosition | null;
  isHide: boolean;
  hasPointer: boolean;
  pointerSize: number;
  plateMargin: number;
  zIndex: number;
  position?: TPosition;
  horizontalAlign?: TAlign;
  verticalAlign?: TAlign;
  autoAlign?: boolean;
  isFixed?: boolean; // position: fixed
}

export interface ICalcPositionProp {
  openerPosition: IOpenerPosition | null;
  platePosition: IPlatePosition | null;
  fieldCoordinates: IFieldCoordinates | null;
  plateMargin: number;
  position: TPosition;
  verticalShift: number;
  horizontalShift: number;
  verticalAlign: TAlign;
  horizontalAlign: TAlign;
  pointerSize: number;
  hasPointer: boolean;
  pointerTargetPosition: IOpenerPosition | null;
  autoAlign: boolean;
  floatPosition: boolean;
  openerInModal?: boolean; // если opener в модалке, то позицию будем рассчитывать без учета скролла страницы
}

export interface IPlateContentProps extends Partial<IProps> {
  maxHeight?: number;
  isWin?: boolean;
  isScrolling?: boolean;
  scrollBarWidth?: number;
  isTransparent?: boolean;
}

export type TPosition = 'left' | 'right' | 'top' | 'bottom';

export type TAlign = 'start' | 'center' | 'end';

export interface ISize {
  width: number;
  height: number;
}
