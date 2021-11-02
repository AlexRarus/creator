import React from 'react';

import { Grid, GridColumn } from './index';

function GridExample() {
  /**
   * отступы между СТРОКАМИ 32px
   * отступы между КОЛОНКАМИ 24px
   */
  return (
    <Grid
      // alignItems="end" колонки будут выравнены по правому краю
      gap={24}
      verticalGap={32}
      // staticSize={6} если передать то пересчета размеров для разных breakPoints НЕ БУДЕТ
      breakPoints={{
        // все переданные здесь значения выставлены по-умолчанию
        // можно передать через контекст ThemeProvider theme: { gridBreakPoints: {...} }
        '320px': 4, // 4 колонки при ширине экрана 320 и меньше
        '530px': 6, // 6 колонок при ширине экрана 530 и меньше
        '950px': 8, // 8 колонок при ширине экрана 950 и меньше
        '1024px': 10, // 10 колонок при ширине экрана 1024 и меньше
        '1280px': 12, // 12 колонок при ширине экрана 1280 и меньше
      }}
    >
      <GridColumn size={2}>
        <div
          style={{
            minHeight: '150px',
            background: 'rgba(200, 0, 0, 0.2)',
          }}
        >
          эта колонка size=2
        </div>
      </GridColumn>
      <GridColumn size={4}>
        <div
          style={{
            minHeight: '150px',
            background: 'rgba(200, 0, 0, 0.2)',
          }}
        >
          эта колонка size=4
        </div>
      </GridColumn>
      <GridColumn size={6}>
        <div
          style={{
            minHeight: '150px',
            background: 'rgba(200, 0, 0, 0.2)',
          }}
        >
          эта колонка size=6
        </div>
      </GridColumn>
      <GridColumn size={8}>
        <div
          style={{
            minHeight: '150px',
            background: 'rgba(200, 0, 0, 0.2)',
          }}
        >
          эта колонка size=8
        </div>
      </GridColumn>
      <GridColumn size={10}>
        <div
          style={{
            minHeight: '150px',
            background: 'rgba(200, 0, 0, 0.2)',
          }}
        >
          эта колонка size=10
        </div>
      </GridColumn>
      <GridColumn size={12}>
        <div
          style={{
            minHeight: '150px',
            background: 'rgba(200, 0, 0, 0.2)',
          }}
        >
          эта колонка size=12
        </div>
      </GridColumn>
    </Grid>
  );
}

export default function Example() {
  return (
    <div style={{ marginTop: '100px' }}>
      <GridExample />
    </div>
  );
}
