import { AsYouType } from 'libphonenumber-js';

// добавляем +7 для соответствия маски российским номерам
const formatInitialValue = (value?: string) => {
  let formattedVal = value || '';
  if (formattedVal.length > 0 && formattedVal[0] === '8') {
    formattedVal = formattedVal.replace('8', '+7 ');
  }
  if (formattedVal.length > 0 && formattedVal[0] === '9') {
    formattedVal = `+7${formattedVal}`;
  }
  if (formattedVal.length > 0 && formattedVal[0] !== '+') {
    formattedVal = `+${formattedVal}`;
  }
  return formattedVal;
};

export const useMask = (maskType?: string, onChange?: any) => {
  switch (maskType) {
    case 'phone':
    case 'sms':
      const asYouTypeIns = new AsYouType();
      const onMaskedChange = (value: any) => {
        const formattedInitialVal = formatInitialValue(value);
        const number = value && asYouTypeIns.input(formattedInitialVal);
        onChange && onChange(number);
      };
      return onMaskedChange;
    default:
      return onChange;
  }
};
