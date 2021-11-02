import React from 'react';

export interface ISymbol {
  svg: string;
  name: string;
  viewBox?: string;
  className?: string;
}

interface IProps {
  symbol: ISymbol;
}

export default function Symbol(props: IProps) {
  const { svg, name, viewBox, className, ...other } = props.symbol;

  return (
    <symbol
      {...other}
      key={name}
      id={attribute('id', name, svg)}
      viewBox={attribute('viewBox', viewBox, svg)}
      className={attribute('class', className, svg)}
      dangerouslySetInnerHTML={extractChildren(svg)}
    />
  );
}

function attribute(name: string, value: string | undefined, svg: string): string | undefined {
  let result: string | undefined = value;
  const pattern = new RegExp(`${name}=(?:"|')([^("|')]*)(?:"|')`);

  if (!value) {
    const firstMatch = svg.match(/<svg[^>]*>/);
    const svgOpenTag: string | null = firstMatch && firstMatch[0];
    const secondMatch = svgOpenTag && svgOpenTag.match(pattern);
    result = secondMatch ? secondMatch[1] : undefined;
  }

  return result;
}

function extractChildren(svg: string) {
  return {
    __html: svg.replace(/<svg[^>]*>|<\/svg>/g, ''),
  }; // remove svg tags
}
