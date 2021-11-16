import React from 'react';
import RootStore from 'src/dal/root-store';

import { PagesPreviewContainer } from './container';
import { PagesPreviewStore } from './store';

export const store = new PagesPreviewStore(RootStore);

const PagesPreview = (props: any) => {
  return <PagesPreviewContainer {...props} />;
};

export default PagesPreview;
