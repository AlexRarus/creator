import React, { Fragment, useState } from 'react';
import update from 'immutability-helper';
import InputText from 'src/components/input-text';

import { IOption, ISearchingProps } from './interfaces';
import { SearchingWrapper, SearchingOptions } from './style';
import Option from './option';

export const Searching = (props: ISearchingProps) => {
  const {
    searchLabel,
    selectedOptions,
    searchOptions,
    onChange,
    name,
    onSearch,
    onBlur,
    CustomOption,
    CustomOptionLabel,
  } = props;
  const [search, setSearch] = useState('');

  const searchHandler = (searchValue: string) => {
    setSearch(searchValue);
    onSearch && onSearch(searchValue);
  };

  const blurHandler = (e: any) => {
    setSearch('');
    onBlur && onBlur(e);
  };

  const focusHandler = () => {
    searchHandler('');
  };

  const renderSearchingOption = (option: IOption, index: any) => {
    const onAddOption = () => {
      const updatedOptions = update(selectedOptions, {
        $push: [option],
      });
      onChange && onChange(updatedOptions);
    };
    const disabled = selectedOptions.some(
      (selectedOption: IOption) => selectedOption.value === option.value
    );

    return (
      <Fragment key={option.value}>
        {CustomOption ? (
          <CustomOption option={option} index={index} onAdd={onAddOption} disabled={disabled} />
        ) : (
          <Option option={option} index={index} onAdd={onAddOption} disabled={disabled}>
            {CustomOptionLabel && <CustomOptionLabel option={option} />}
          </Option>
        )}
      </Fragment>
    );
  };

  return (
    <SearchingWrapper>
      <InputText
        name={name}
        label={searchLabel}
        value={search}
        onChange={searchHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
      />
      <SearchingOptions>
        {searchOptions.map((option: IOption, i) => renderSearchingOption(option, i))}
      </SearchingOptions>
    </SearchingWrapper>
  );
};
