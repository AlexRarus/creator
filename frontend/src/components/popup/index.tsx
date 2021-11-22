import React, {
  useState,
  useEffect,
  useRef,
  RefObject,
  useCallback,
  useLayoutEffect,
  useContext,
} from 'react';
import { COLORS } from 'src/components/theme';

import Modal from './modal';
import { PlateWrapper, PlateContent, ChildrenWrapper, topPosition, leftPosition } from './style';
import {
  IOpenerPosition,
  IPlatePosition,
  IFieldCoordinates,
  IProps,
  ICalcPositionProp,
  TPosition,
  TAlign,
  ISize,
} from './interfaces';
import { getScrollParents, useScrolling } from './utils';

const usePrev = (value: any) => {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  });

  return valueRef.current;
};

export const REPOSITION_POPUP_MARKER = 'reposition-popup-marker';
export const PopupContext = React.createContext({} as any);
export const usePopupContext = () => useContext(PopupContext);

export default function Popup(props: IProps) {
  const {
    isOpen,
    openerElement,
    pointerTargetElement,
    onClose,
    onClick,
    shouldRepositionOnClick,
    children,
    hasPointer = true,
    position: initPosition,
    verticalAlign: initVerticalAlign,
    horizontalAlign: initHorizontalAlign,
    pointerSize = 10,
    plateMargin = 10,
    maxHeight: initMaxHeight,
    autoAlign = true,
    floatPosition = false,
    fitOnScreen = false,
    isCloseOnClick = true,
    zIndex = 10,
    overflow,
    dataTestId,
    horizontalShift = 0,
    verticalShift = 0,
    color = COLORS.black,
    background = COLORS.white,
    className,
    borderRadius = '2px',
    borderColor = COLORS.grey[300],
    isFixed = false,
    hasBorder = true,
    hasShadow = true,
  } = props;
  const isWin = navigator?.appVersion.toLowerCase().includes('win');
  const prevIsOpen: boolean = usePrev(isOpen);
  const plateRef: RefObject<HTMLDivElement> = useRef(null);
  const [viewPort, setViewPort] = useState<ISize | null>(null);
  const [openerPosition, setOpenerPosition] = useState<IOpenerPosition | null>(null);
  const [platePosition, setPlatePosition] = useState<IPlatePosition | null>(null);
  const [fieldCoordinates, setFieldCoordinates] = useState<IFieldCoordinates | null>(null);
  const [pointerTargetPosition, setPointerTargetPosition] = useState<IOpenerPosition | null>(null);
  const [prepositionMode, setPrepositionMode] = useState(false);
  const [maxHeight, setMaxHeight] = useState(initMaxHeight);
  const [contentRef, scrolling] = useScrolling();
  const detailRef = useRef({});

  const [innerPosition, setInnerPosition] = useState<{
    position: TPosition;
    verticalAlign: TAlign;
    horizontalAlign: TAlign;
  }>({
    position: initPosition || 'bottom',
    horizontalAlign: initHorizontalAlign || 'end',
    verticalAlign: initVerticalAlign || 'end',
  });

  const resetPosition = () => {
    setViewPort(null);
    setOpenerPosition(null);
    setPlatePosition(null);
    setFieldCoordinates(null);
    setPointerTargetPosition(null);
  };

  const setPosition = (prev = false) => {
    const plateElement: HTMLDivElement | null = plateRef && plateRef.current;
    if (plateElement && openerElement) {
      const openerMetrics = openerElement.getBoundingClientRect();
      const plateMetrics = plateElement.getBoundingClientRect();
      const pointerTargetMetrics = pointerTargetElement
        ? pointerTargetElement.getBoundingClientRect()
        : openerElement.getBoundingClientRect();
      const { scrollX, scrollY, innerWidth, innerHeight } = window;

      setViewPort({
        width: innerWidth,
        height: innerHeight,
      });
      setOpenerPosition({
        x: openerMetrics.left,
        y: openerMetrics.top,
        left: openerMetrics.left + scrollX,
        top: openerMetrics.top + scrollY,
        width: openerMetrics.width,
        height: openerMetrics.height,
      });
      setPlatePosition({
        width: plateMetrics.width,
        height: plateMetrics.height,
      });
      setFieldCoordinates({
        top: openerMetrics.top - plateMetrics.height,
        left: openerMetrics.left - plateMetrics.width,
        bottom: innerHeight - (openerMetrics.top + openerMetrics.height + plateMetrics.height),
        right: innerWidth - (openerMetrics.left + openerMetrics.width + plateMetrics.width),
      });
      setPointerTargetPosition({
        x: pointerTargetMetrics.left,
        y: pointerTargetMetrics.top,
        left: pointerTargetMetrics.left + scrollX,
        top: pointerTargetMetrics.top + scrollY,
        width: pointerTargetMetrics.width,
        height: pointerTargetMetrics.height,
      });

      // если явно задан параметр fitOnTheScreen или если верхнее ресположение и нельзя переносить позицию вниз
      if (fitOnScreen || (!floatPosition && innerPosition.position === 'top')) {
        const maxHeightAboveOpener = openerMetrics.top - plateMargin;
        const maxHeightBelowOpener = innerHeight - openerMetrics.top - openerMetrics.height;
        let maxAvailableHeight: number;
        switch (innerPosition.position) {
          case 'top':
            maxAvailableHeight = floatPosition
              ? Math.max(maxHeightAboveOpener, maxHeightBelowOpener)
              : maxHeightAboveOpener;
            break;
          case 'bottom':
            maxAvailableHeight = floatPosition
              ? Math.max(maxHeightAboveOpener, maxHeightBelowOpener)
              : maxHeightBelowOpener;
            break;
          default:
            maxAvailableHeight = innerHeight;
        }
        setMaxHeight(Math.min(maxAvailableHeight, initMaxHeight || Infinity));
      }
      setPrepositionMode(prev);
    }
  };

  // обработчик события 'closePopup'
  const onClosePopup = useCallback(
    (e: any) => {
      if (isOpen && !e.detail.prevent && onClose) {
        onClose();
      }
    },
    [prevIsOpen, isOpen, onClose]
  );

  const onPopupClick = useCallback(
    (e: React.MouseEvent) => {
      onClick && onClick(e);
      // если комопнент НЕ закрывается после клика, то пересчитываем его позицию
      // в случае клика внутри элемента с классом ${REPOSITION_POPUP_MARKER}
      const target: any = e.target;
      const isReset = !isCloseOnClick && Boolean(target.closest(`.${REPOSITION_POPUP_MARKER}`));

      if (isReset) {
        // пересчитываем позиционирование компонента
        // для случая если после клика пупап не закрывается, а контент внутри него меняется
        resetPosition(); // сбрасываем позиционирование элемента
      }
    },
    [isCloseOnClick]
  );

  useEffect(() => {
    if (!isOpen) {
      resetPosition();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!platePosition && isOpen) {
      setPosition(true); // предварительное позиционирование
    }
  }, [Boolean(platePosition), isOpen]);

  useEffect(() => {
    if (prepositionMode && openerPosition) {
      setPosition(); // окончательное позиционирование
    }
  }, [prepositionMode, openerPosition]);

  useEffect(() => {
    setPosition(); // пересчет позиции
  }, [maxHeight]);

  useLayoutEffect(() => {
    const popupElement: HTMLDivElement | null = plateRef.current;
    const detail: any = detailRef.current;

    const preventClose = () => {
      detail.prevent = true;
    };
    const mouseupHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      detail.prevent = Boolean(target?.closest('.popup-component-wrapper')) && !isCloseOnClick;
    };

    // клик на документе
    const clickHandler = () => {
      // создаем объект события закрытия пупапа
      const closePopupEvent = new CustomEvent<any>('closePopup', {
        detail,
      });
      popupElement?.dispatchEvent(closePopupEvent);
    };

    openerElement?.addEventListener('click', preventClose);
    if (isOpen) {
      document.body.addEventListener('mouseup', mouseupHandler);
      document.body.addEventListener('click', clickHandler);
    }
    return () => {
      openerElement?.removeEventListener('click', preventClose);
      document.body.removeEventListener('mouseup', mouseupHandler);
      document.body.removeEventListener('click', clickHandler);
    };
  }, [isOpen, isCloseOnClick, openerElement]);

  // подписываем пупап на событие закрытия
  useEffect(() => {
    const popupElement: HTMLDivElement | null = plateRef.current;

    popupElement?.addEventListener('closePopup', onClosePopup);
    return () => {
      popupElement?.removeEventListener('closePopup', onClosePopup);
    };
  }, [isOpen, onClosePopup]);

  useEffect(() => {
    const scrollableParents = getScrollParents(openerElement);
    setPosition();
    const calcPosition = () => {
      setPosition();
    };

    if (isOpen) {
      scrollableParents.forEach((parent: HTMLElement) =>
        parent.addEventListener('scroll', calcPosition)
      );
      window.addEventListener('resize', resetPosition);
    }

    return () => {
      scrollableParents.forEach((parent: HTMLElement) =>
        parent.removeEventListener('scroll', calcPosition)
      );
      window.removeEventListener('resize', resetPosition);
    };
  }, [isOpen, openerElement]);

  useEffect(() => {
    if (floatPosition && openerPosition && platePosition && viewPort) {
      // top
      const fitTop = openerPosition.y - platePosition.height - plateMargin - verticalShift > 0;
      // right
      const fitRight =
        openerPosition.x +
          openerPosition.width +
          plateMargin +
          horizontalShift +
          platePosition.width <
        viewPort.width;
      // bottom
      const fitBottom =
        openerPosition.y +
          openerPosition.height +
          plateMargin +
          platePosition.height -
          verticalShift <
        viewPort.height;
      // left
      const fitLeft = openerPosition.x - platePosition.width - plateMargin - horizontalShift > 0;

      switch (initPosition) {
        case 'top':
          if (fitTop) {
            setInnerPosition({
              position: initPosition || innerPosition.position,
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          } else if (fitRight) {
            setInnerPosition({
              position: 'right',
              verticalAlign: 'end',
              horizontalAlign: 'end',
            });
          } else if (fitLeft) {
            setInnerPosition({
              position: 'left',
              verticalAlign: 'end',
              horizontalAlign: 'end',
            });
          } else if (fitBottom) {
            setInnerPosition({
              position: 'bottom',
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          } else {
            setInnerPosition({
              position: initPosition || innerPosition.position,
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          }
          break;
        case 'bottom':
          if (fitBottom) {
            setInnerPosition({
              position: initPosition || innerPosition.position,
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          } else if (fitRight) {
            setInnerPosition({
              position: 'right',
              verticalAlign: 'start',
              horizontalAlign: 'start',
            });
          } else if (fitLeft) {
            setInnerPosition({
              position: 'left',
              verticalAlign: 'start',
              horizontalAlign: 'start',
            });
          } else if (fitTop) {
            setInnerPosition({
              position: 'top',
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          } else {
            setInnerPosition({
              position: initPosition || innerPosition.position,
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          }
          break;
        case 'left':
          if (fitLeft) {
            setInnerPosition({
              position: initPosition || innerPosition.position,
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          } else if (fitBottom) {
            setInnerPosition({
              position: 'bottom',
              verticalAlign: 'end',
              horizontalAlign: 'end',
            });
          } else if (fitTop) {
            setInnerPosition({
              position: 'top',
              verticalAlign: 'end',
              horizontalAlign: 'end',
            });
          } else if (fitRight) {
            setInnerPosition({
              position: 'right',
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          } else {
            setInnerPosition({
              position: initPosition || innerPosition.position,
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          }
          break;
        case 'right':
          if (fitRight) {
            setInnerPosition({
              position: initPosition || innerPosition.position,
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          } else if (fitBottom) {
            setInnerPosition({
              position: 'bottom',
              verticalAlign: 'start',
              horizontalAlign: 'start',
            });
          } else if (fitTop) {
            setInnerPosition({
              position: 'top',
              verticalAlign: 'start',
              horizontalAlign: 'start',
            });
          } else if (fitLeft) {
            setInnerPosition({
              position: 'left',
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          } else {
            setInnerPosition({
              position: initPosition || innerPosition.position,
              verticalAlign: initVerticalAlign || innerPosition.verticalAlign,
              horizontalAlign: initHorizontalAlign || innerPosition.horizontalAlign,
            });
          }
          break;
      }
    }
  }, [
    fieldCoordinates,
    openerPosition,
    platePosition,
    viewPort,
    plateMargin,
    initPosition,
    initVerticalAlign,
    initHorizontalAlign,
    floatPosition,
  ]);

  const plateProps: ICalcPositionProp = {
    openerPosition,
    platePosition,
    fieldCoordinates,
    plateMargin,
    verticalShift,
    horizontalShift,
    pointerSize,
    hasPointer,
    pointerTargetPosition,
    autoAlign: autoAlign as boolean,
    floatPosition: floatPosition as boolean,
    ...innerPosition,
  };

  return isOpen ? (
    <Modal>
      <PlateWrapper
        data-test-id={dataTestId}
        ref={plateRef}
        onClick={onPopupClick}
        hasPointer={Boolean(hasPointer)}
        pointerSize={pointerSize}
        plateMargin={plateMargin}
        openerPosition={openerPosition}
        platePosition={platePosition}
        fieldCoordinates={fieldCoordinates}
        pointerTargetPosition={pointerTargetPosition}
        isHide={!platePosition || prepositionMode}
        {...innerPosition}
        autoAlign={autoAlign}
        zIndex={zIndex}
        horizontalShift={horizontalShift}
        verticalShift={verticalShift}
        style={{
          top: `${topPosition(plateProps)}px`,
          left: `${leftPosition(plateProps)}px`,
          maxWidth: viewPort ? `${viewPort.width}px` : 'auto',
          maxHeight: viewPort ? `${viewPort.height}px` : 'auto',
        }}
        color={color}
        background={background}
        className={shouldRepositionOnClick ? REPOSITION_POPUP_MARKER : ''}
        borderColor={borderColor}
        borderRadius={borderRadius}
        isFixed={isFixed}>
        <PlateContent
          maxHeight={maxHeight}
          overflow={overflow}
          className={className}
          ref={contentRef}
          isWin={isWin}
          isScrolling={scrolling}
          scrollBarWidth={0}
          borderColor={borderColor}
          borderRadius={borderRadius}
          hasBorder={hasBorder}
          hasShadow={hasShadow}>
          <ChildrenWrapper>
            <PopupContext.Provider value={{ maxHeight }}>{children}</PopupContext.Provider>
          </ChildrenWrapper>
        </PlateContent>
      </PlateWrapper>
    </Modal>
  ) : null;
}
