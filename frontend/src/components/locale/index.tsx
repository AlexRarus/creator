import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Popup from 'src/components/popup';

import { LocaleWrapper, LanguageLabel, LanguagesList, LanguageOption } from './style';

export default function Locale() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [openerElement, openerRefCallback] = useState<HTMLElement | null>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <LocaleWrapper>
      <LanguageLabel ref={openerRefCallback} onClick={toggleOpen}>
        {i18n.language}
      </LanguageLabel>
      <Popup
        isOpen={isOpen}
        onClose={toggleOpen}
        openerElement={openerElement}
        position='top'
        verticalAlign='center'
        horizontalAlign='center'
        zIndex={1}
        isCloseOnClick={true}
        hasPointer={false}
        plateMargin={5}>
        <LanguagesList>
          {['ru', 'en']
            .filter((language: string) => language !== i18n.language)
            .map((language: string) => (
              <LanguageOption key={language} onClick={() => changeLanguage(language)}>
                {language}
              </LanguageOption>
            ))}
        </LanguagesList>
      </Popup>
    </LocaleWrapper>
  );
}
