import { css, CSSObject } from 'styled-components';

import { IMedia } from './interfaces';

export const MEDIA_QUERY: IMedia = {
  max320: 'max-width: 320px',
  max530: 'max-width: 529px',
  max768: 'max-width: 768px',
  max950: 'max-width: 949px',
  max1024: 'max-width: 1024px',
  max1280: 'max-width: 1280px',
  min1280: 'min-width: 1280px',
};

export const MEDIA = {
  max320: (p: CSSObject, ...args: TemplateStringsArray[]) => css`
    @media (${MEDIA_QUERY.max320}) {
      ${css(p, ...args)}
    }
  `,
  max530: (p: CSSObject, ...args: TemplateStringsArray[]) => css`
    @media (${MEDIA_QUERY.max530}) {
      ${css(p, ...args)}
    }
  `,
  max768: (p: CSSObject, ...args: TemplateStringsArray[]) => css`
    @media (${MEDIA_QUERY.max768}) {
      ${css(p, ...args)}
    }
  `,
  max950: (p: CSSObject, ...args: TemplateStringsArray[]) => css`
    @media (${MEDIA_QUERY.max950}) {
      ${css(p, ...args)}
    }
  `,
  max1024: (p: CSSObject, ...args: TemplateStringsArray[]) => css`
    @media (${MEDIA_QUERY.max1024}) {
      ${css(p, ...args)}
    }
  `,
  max1280: (p: CSSObject, ...args: TemplateStringsArray[]) => css`
    @media (${MEDIA_QUERY.max1280}) {
      ${css(p, ...args)}
    }
  `,
  min1280: (p: CSSObject, ...args: TemplateStringsArray[]) => css`
    @media (${MEDIA_QUERY.min1280}) {
      ${css(p, ...args)}
    }
  `,
};
