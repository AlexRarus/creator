import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import { rgba } from 'polished';

import { IPlateProps, IPlateContentProps, ICalcPositionProp } from './interfaces';

export const ModalWrapper = styled.div``;

const horizontalAlign = ({
  openerPosition,
  platePosition,
  fieldCoordinates,
  horizontalAlign,
  pointerSize,
  hasPointer,
  pointerTargetPosition,
  autoAlign,
}: ICalcPositionProp) => {
  if (openerPosition && platePosition && fieldCoordinates && pointerTargetPosition) {
    const outEdge: boolean = pointerSize * 2 >= pointerTargetPosition.width; // указатель выходит за края
    const shiftHidePointer = pointerSize * 1.5;
    const openerBiggerThenPlate: boolean = openerPosition.width > platePosition.width;
    const openerPositionRight: number = openerPosition.left + openerPosition.width;
    const center: number = openerPosition.left + openerPosition.width / 2 - platePosition.width / 2;
    let maxLeftPosition: number =
      hasPointer && outEdge ? openerPosition.left - shiftHidePointer : openerPosition.left;
    let maxRightPosition: number =
      hasPointer && outEdge
        ? openerPositionRight + shiftHidePointer - platePosition.width
        : openerPositionRight - platePosition.width;

    if (hasPointer && openerBiggerThenPlate) {
      const openerHalfWidth = openerPosition.width / 2;
      maxLeftPosition = openerPosition.left + openerHalfWidth - shiftHidePointer;
      maxRightPosition =
        openerPositionRight - openerHalfWidth + shiftHidePointer - platePosition.width;
    }

    const targetLeftCoordinate =
      fieldCoordinates.left + openerPosition.width / 2 + platePosition.width / 2;
    const targetRightCoordinate =
      fieldCoordinates.right + openerPosition.width / 2 + platePosition.width / 2;

    switch (horizontalAlign) {
      case 'start':
        return fieldCoordinates.right + openerPosition.width < 0 && autoAlign
          ? Math.max(
              maxRightPosition,
              maxLeftPosition + fieldCoordinates.right + openerPosition.width
            )
          : maxLeftPosition;
      case 'center':
        if (targetLeftCoordinate < 0 && autoAlign) {
          return Math.min(maxLeftPosition, center - targetLeftCoordinate);
        } else if (targetRightCoordinate < 0 && autoAlign) {
          return Math.max(maxRightPosition, center + targetRightCoordinate);
        }
        return center;
      case 'end':
        return fieldCoordinates.left + openerPosition.width < 0 && autoAlign
          ? Math.min(
              maxLeftPosition,
              maxRightPosition - (fieldCoordinates.left + openerPosition.width)
            )
          : maxRightPosition;
      default:
        return 0;
    }
  }

  return 0;
};

const verticalAlign = ({
  openerPosition,
  platePosition,
  fieldCoordinates,
  verticalAlign,
  pointerSize,
  hasPointer,
  pointerTargetPosition,
  autoAlign,
}: ICalcPositionProp) => {
  if (openerPosition && platePosition && fieldCoordinates && pointerTargetPosition) {
    const outEdge: boolean = pointerSize * 2 >= pointerTargetPosition.height; // указатель выходит за края
    const shiftHidePointer = pointerSize * 1.5;
    const openerBiggerThenPlate: boolean = openerPosition.height > platePosition.height;
    const openerPositionBottom: number = openerPosition.top + openerPosition.height;
    const center: number =
      openerPosition.top + openerPosition.height / 2 - platePosition.height / 2;
    let maxTopPosition: number =
      hasPointer && outEdge ? openerPosition.top - shiftHidePointer : openerPosition.top;
    let maxBottomPosition: number =
      hasPointer && outEdge
        ? openerPositionBottom + shiftHidePointer - platePosition.height
        : openerPositionBottom - platePosition.height;

    if (hasPointer && openerBiggerThenPlate) {
      const openerHalfHeight = openerPosition.height / 2;
      maxTopPosition = openerPosition.left + openerHalfHeight - shiftHidePointer;
      maxBottomPosition =
        openerPositionBottom + -openerHalfHeight + shiftHidePointer - platePosition.height;
    }

    const targetBottomCoordinate =
      fieldCoordinates.bottom + openerPosition.height / 2 + platePosition.height / 2;
    const targetTopCoordinate =
      fieldCoordinates.top + openerPosition.height / 2 + platePosition.height / 2;

    switch (verticalAlign) {
      case 'start':
        return fieldCoordinates.bottom + openerPosition.height < 0 && autoAlign
          ? Math.max(
              maxBottomPosition,
              maxTopPosition + fieldCoordinates.bottom + openerPosition.height
            )
          : maxTopPosition;
      case 'center':
        if (targetBottomCoordinate < 0 && autoAlign) {
          return Math.max(maxBottomPosition, center + targetBottomCoordinate);
        } else if (targetTopCoordinate < 0 && autoAlign) {
          return Math.min(maxTopPosition, center - targetTopCoordinate);
        }
        return center;
      case 'end':
        return fieldCoordinates.top + openerPosition.height < 0 && autoAlign
          ? Math.min(
              maxTopPosition,
              maxBottomPosition - (fieldCoordinates.top + openerPosition.height)
            )
          : maxBottomPosition;
      default:
        return 0;
    }
  }

  return 0;
};

export const leftPosition = (props: ICalcPositionProp) => {
  const {
    openerPosition,
    platePosition,
    fieldCoordinates,
    position,
    plateMargin,
    horizontalShift = 0,
    floatPosition,
  } = props;

  if (openerPosition && platePosition && fieldCoordinates) {
    switch (position) {
      case 'top':
        return horizontalAlign(props) + horizontalShift;
      case 'bottom':
        return horizontalAlign(props) + horizontalShift;
      case 'left':
        return fieldCoordinates.left - plateMargin < 0 && floatPosition
          ? openerPosition.left + openerPosition.width + plateMargin - horizontalShift
          : openerPosition.left - platePosition.width - plateMargin - horizontalShift;
      case 'right':
        return fieldCoordinates.right - plateMargin < 0 && floatPosition
          ? openerPosition.left - platePosition.width - plateMargin + horizontalShift
          : openerPosition.left + openerPosition.width + plateMargin + horizontalShift;
      default:
        return openerPosition.left + openerPosition.width - platePosition.width;
    }
  }

  return 0;
};

export const topPosition = (props: ICalcPositionProp) => {
  const {
    openerPosition,
    platePosition,
    fieldCoordinates,
    position,
    plateMargin,
    verticalShift = 0,
    floatPosition,
    openerInModal,
  } = props;

  if (openerPosition && platePosition && fieldCoordinates) {
    switch (position) {
      case 'top':
        return fieldCoordinates.top - plateMargin < 0 && floatPosition
          ? openerPosition[openerInModal ? 'y' : 'top'] +
              openerPosition.height +
              plateMargin -
              verticalShift
          : openerPosition[openerInModal ? 'y' : 'top'] -
              platePosition.height -
              plateMargin -
              verticalShift;
      case 'bottom':
        return fieldCoordinates.bottom - plateMargin < 0 && floatPosition
          ? openerPosition[openerInModal ? 'y' : 'top'] -
              platePosition.height -
              plateMargin +
              verticalShift
          : openerPosition[openerInModal ? 'y' : 'top'] +
              openerPosition.height +
              plateMargin +
              verticalShift;
      case 'left':
        return verticalAlign(props) + verticalShift;
      case 'right':
        return verticalAlign(props) + verticalShift;
      default:
        return openerPosition[openerInModal ? 'y' : 'top'] + openerPosition.height;
    }
  }

  return 0;
};

const pointerLeftPosition = (props: IPlateProps) => {
  const {
    openerPosition,
    platePosition,
    fieldCoordinates,
    pointerTargetPosition,
    position,
    plateMargin,
    pointerSize,
    floatPosition,
  } = props;

  if (openerPosition && platePosition && fieldCoordinates && pointerTargetPosition) {
    switch (position) {
      case 'top':
        return (
          pointerTargetPosition.left +
          (pointerTargetPosition.width - pointerSize) / 2 -
          horizontalAlign(props as ICalcPositionProp)
        );
      case 'bottom':
        return (
          pointerTargetPosition.left +
          (pointerTargetPosition.width - pointerSize) / 2 -
          horizontalAlign(props as ICalcPositionProp)
        );
      case 'left':
        return (
          openerPosition.left -
          pointerSize * 0.7 - // выведено имперически
          (fieldCoordinates.left - plateMargin < 0 && floatPosition
            ? openerPosition.left
            : openerPosition.left - platePosition.width)
        );
      case 'right':
        return (
          openerPosition.left -
          pointerSize * 0.4 - // выведено имперически
          (fieldCoordinates.right - plateMargin < 0 && floatPosition
            ? openerPosition.left - platePosition.width
            : openerPosition.left)
        );
      default:
        return (
          pointerTargetPosition.left -
          pointerSize / 2 -
          (openerPosition.left + openerPosition.width - platePosition.width)
        );
    }
  }

  return 0;
};

const pointerTopPosition = (props: IPlateProps) => {
  const {
    openerPosition,
    platePosition,
    fieldCoordinates,
    pointerTargetPosition,
    position,
    plateMargin,
    pointerSize,
    floatPosition,
  } = props;

  if (openerPosition && platePosition && fieldCoordinates && pointerTargetPosition) {
    switch (position) {
      case 'top':
        return (
          openerPosition.top -
          pointerSize * 0.7 -
          (fieldCoordinates.top - plateMargin < 0 && floatPosition
            ? openerPosition.top
            : openerPosition.top - platePosition.height)
        );
      case 'bottom':
        return (
          openerPosition.top -
          pointerSize * 0.4 -
          (fieldCoordinates.bottom - plateMargin < 0 && floatPosition
            ? openerPosition.top - platePosition.height
            : openerPosition.top)
        );
      case 'left':
        return (
          pointerTargetPosition.top +
          pointerTargetPosition.height / 2 -
          pointerSize / 2 -
          verticalAlign(props as ICalcPositionProp)
        );
      case 'right':
        return (
          pointerTargetPosition.top +
          pointerTargetPosition.height / 2 -
          pointerSize / 2 -
          verticalAlign(props as ICalcPositionProp)
        );
      default:
        return (
          pointerTargetPosition.top - pointerSize / 2 - (openerPosition.top + openerPosition.height)
        );
    }
  }

  return 0;
};

export const PlateWrapper = styled.div<IPlateProps>`
  position: ${({ isFixed }) => (isFixed ? 'fixed' : 'absolute')};
  z-index: ${({ zIndex }) => zIndex};
  opacity: ${({ isHide }) => (isHide ? 0 : 1)};
  transition: opacity 200ms;
  color: ${({ color }) => color};
  background: transparent;

  &:before {
    position: absolute;
    display: ${({ hasPointer }) => (hasPointer ? 'block' : 'none')};
    content: ' ';
    background: ${({ background }) => background};
    width: ${({ pointerSize }) => pointerSize}px;
    height: ${({ pointerSize }) => pointerSize}px;
    transform: rotate(45deg);
    top: ${pointerTopPosition}px;
    left: ${pointerLeftPosition}px;
    box-shadow: 0 0 6px 0 ${rgba(COLORS.black, 0.2)};
    border: ${({ hasBorder, borderColor }) => (hasBorder ? `1px solid ${borderColor}` : 'none')};
    z-index: -1;
  }

  &:after {
    position: absolute;
    display: ${({ hasPointer }) => (hasPointer ? 'block' : 'none')};
    content: ' ';
    background: ${({ background }) => background};
    width: ${({ pointerSize }) => pointerSize}px;
    height: ${({ pointerSize }) => pointerSize}px;
    transform: rotate(45deg);
    top: ${(props) => pointerTopPosition(props) + 1}px;
    left: ${(props) => pointerLeftPosition(props) + 1}px;
  }
`;

export const PlateContent = styled.div<IPlateContentProps>`
  position: relative;
  background: ${({ background }) => background || COLORS.white};
  box-shadow: ${({ hasShadow }) => (hasShadow ? `0 0 6px 0 ${rgba(COLORS.black, 0.2)}` : 'none')};
  border: ${({ hasBorder, borderColor }) => (hasBorder ? `1px solid ${borderColor}` : 'none')};
  border-radius: ${({ borderRadius }) => borderRadius};
  ${({ overflow }) => (overflow ? `overflow: ${overflow}` : 'overflow-y: auto;')};
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}px`};
  width: max-content;
  min-width: 10px;
  min-height: 10px;
  max-width: 100%;
`;

export const ChildrenWrapper = styled.div<IPlateContentProps>`
  position: relative;
  z-index: 2;
`;
