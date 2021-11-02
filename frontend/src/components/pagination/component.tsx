import React from 'react';
import { IOption } from 'src/components/button-select';
import { pluralString } from 'src/utils/pluralString';

import {
  PaginationWrapper,
  LimitBlock,
  CurrentPageBlock,
  OffsetBlock,
  Label,
  ButtonSelectStyled,
} from './style';

interface IProps {
  total: number;
  totalPages: number;
  limitOptions: IOption[];
  limitOption: IOption;
  limit: number;
  pageOptions: IOption[];
  pageOption: IOption;
  offset: number;
  onChangeLimit(limitOption: IOption): void;
  onChangePage(pageOption: IOption): void;
}

export function Pagination(props: IProps) {
  return (
    <PaginationWrapper>
      <LimitBlock>
        <Label>Записей на странице:</Label>
        <ButtonSelectStyled
          value={props.limitOption}
          options={props.limitOptions}
          dimension='s'
          onChange={props.onChangeLimit}
        />
      </LimitBlock>
      <CurrentPageBlock>
        {Math.min(props.limitOption.value, props.total)} записей из {props.total}
      </CurrentPageBlock>
      <OffsetBlock>
        <ButtonSelectStyled
          value={props.pageOption}
          options={props.pageOptions}
          dimension='s'
          onChange={props.onChangePage}
        />
        <Label>
          из {props.totalPages} {pluralString(props.total, ['страницы', 'страниц', 'страниц'])}
        </Label>
      </OffsetBlock>
    </PaginationWrapper>
  );
}
