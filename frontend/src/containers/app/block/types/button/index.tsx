import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ITheme } from 'src/dal/themes/interfaces';

import {
  ButtonBlock,
  Title,
  SubTitle,
  WebLink,
  InnerLink,
  ButtonContent,
  IconTemplateButton,
  IconElement,
} from './style';

interface IProps {
  block: IBlock<any>;
  selectedTheme?: ITheme | null;
}

export const ButtonPreview = (props: IProps) => {
  const { block, selectedTheme } = props;
  const buttonType = block?.data?.type;
  const buttonValue = block?.data?.value;
  const buttonIcon = block?.data?.icon;

  return (
    <ButtonBlock {...selectedTheme?.button} kind={block?.data?.kind} isIcon={!!buttonIcon}>
      <TypeWrapper buttonType={buttonType} value={buttonValue}>
        <Title>{block?.data?.label}</Title>
        <SubTitle>{block?.data?.description}</SubTitle>
        <IconTemplateButton>
          {buttonIcon ? <IconElement src={`/media/${buttonIcon.preview || buttonIcon.src}`} /> : ''}
        </IconTemplateButton>
      </TypeWrapper>
    </ButtonBlock>
  );
};

interface ITypeWrapper {
  children: any;
  buttonType?: string;
  value?: string;
}

// обертка с обработкой действий с разными типами кнопок
const TypeWrapper = (props: ITypeWrapper) => {
  switch (props.buttonType) {
    case 'web':
      return (
        <WebLink href={props?.value} target='_blank' rel='noopener noreferer'>
          {props.children}
        </WebLink>
      );
    case 'link':
      return <InnerLink to={props?.value || '/'}>{props.children}</InnerLink>;
    case 'email': {
      const onClick = () => {
        window.location.href = `mailto:${props?.value}?subject=Тема`;
      };
      return <ButtonContent onClick={onClick}>{props.children}</ButtonContent>;
    }
    // TODO нужно потестить
    case 'phone': {
      const onClick = () => {
        window.open(`tel:${props?.value}`);
      };
      return <ButtonContent onClick={onClick}>{props.children}</ButtonContent>;
    }
    // TODO нужно потестить
    case 'sms': {
      const onClick = () => {
        if (navigator.userAgent.match(/Android/i)) {
          window.open(`sms://${props?.value}/?body=encodeURIComponent('sms body......')`, '_blank');
        }
        if (navigator.userAgent.match(/iPhone/i)) {
          window.open(`sms://${props?.value}/&body=encodeURIComponent('sms body......')`, '_blank');
        }
      };
      return <ButtonContent onClick={onClick}>{props.children}</ButtonContent>;
    }
    default:
      return (
        <ButtonContent
          onClick={() => {
            console.log('on click some button');
          }}>
          {props.children}
        </ButtonContent>
      );
  }
};
