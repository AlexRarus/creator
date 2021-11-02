import React from 'react';

import Symbol, { ISymbol } from './symbol';

interface IProps {
  symbols: ISymbol[];
  style?: {
    display: string;
  };
}

export default function SvgSprite(props: IProps) {
  const { symbols, style, ...other } = props;

  return (
    <svg {...other} style={style} xmlns='http://www.w3.org/2000/svg'>
      {symbols.map((symbol) => {
        return <Symbol key={symbol.name} symbol={symbol} />;
      })}
    </svg>
  );
}

SvgSprite.defaultProps = {
  style: { display: 'none' },
};
