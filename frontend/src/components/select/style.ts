import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

import { getInputFontSize, TDimension } from '../input-components';

export const WrapperCRS = styled.div<{
  dimension: TDimension;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${getInputFontSize};

  .CRS__control {
    position: relative;
    border: none;
    opacity: 1;
    min-height: auto;

    :hover {
      border: none;
    }

    :after {
      position: absolute;
      content: '';
      bottom: -1px;
      left: -1px;
      width: calc(100% + 1px + 1px);
      height: 2px;
      background: transparent;
    }

    &--is-disabled {
      opacity: 0.5;
    }

    &--is-focused {
      box-shadow: none;
    }

    .CRS__indicator-separator {
      display: none;
    }
  }

  .CRS__value-container {
    padding: 0;
    margin: 0;
  }

  .CRS__indicator {
    padding-right: 0;
  }

  .CRS__menu {
    z-index: 100;
    border-radius: 0 0 4px 4px;
    box-shadow: 0px -1.5px 6px rgb(0 0 0 / 6%), 0px 0.6px 1.8px rgb(0 0 0 / 10%),
      0px 3.2px 7.2px rgb(0 0 0 / 14%);
    margin-top: 0;
    background-color: ${COLORS.white};
    &-list {
      font-size: 15px;
      font-weight: 400;
      line-height: 24px;
      .CRS__option--is-focused {
        background-color: ${COLORS.grey[100]};
        color: ${COLORS.blue[400]};
      }
    }
  }
`;

export const MobileSelectWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  background: ${COLORS.white};
`;

export const MobileSelect = styled.select`
  position: absolute;
  font-size: 16px;
  border: none;
  outline: none;
  height: 34px;
  width: 100%;
  padding-right: 24px;
  background: linear-gradient(
    to right,
    ${COLORS.white},
    ${COLORS.white} calc(100% - 24px),
    rgba(255, 255, 255, 0) calc(100% - 24px)
  );
  color: black;
  appearance: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MobileSelectOption = styled.option``;

export const MobileSelectIconWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 36px;
  background: ${COLORS.white};

  svg {
    color: ${COLORS.black};
    font-size: 24px;
  }
`;

export const PositionWrapper = styled.div`
  position: relative;
`;
