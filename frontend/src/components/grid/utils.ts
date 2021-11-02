import { IGridBreakPoints } from 'src/components/theme/interfaces';

export const defaultBreakPoints: IGridBreakPoints = {
  '320px': 4, // 4 колонки при ширине экрана 320 и меньше
  '530px': 6, // 6 колонок при ширине экрана 530 и меньше
  '950px': 8, // 8 колонок при ширине экрана 950 и меньше
  '1024px': 10, // 10 колонок при ширине экрана 1024 и меньше
  '1280px': 12, // 12 колонок при ширине экрана 1280 и меньше
};

export function filterComponentsByType(children: Array<any>, type: any) {
  const nullOrCorrectType = children.map((child: any) => {
    if (!child) {
      return null;
    }
    return child.type === type ? child : null;
  });

  return nullOrCorrectType.filter(Boolean);
}
