export function pluralString(count: number, forms: string[]) {
  const [form1, form2, form3] = forms;

  if ([11, 12, 13, 14].includes(count % 100)) {
    return form3;
  } else if ([1].includes(count % 10)) {
    return form1;
  } else if ([2, 3, 4].includes(count % 10)) {
    return form2;
  }

  return form3;
}
