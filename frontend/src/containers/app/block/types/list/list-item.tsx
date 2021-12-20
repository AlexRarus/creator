import React from 'react';
import { IListItem } from 'src/dal/blocks/data-interfaces';
import { ImageIcon } from 'src/components/image-icon';

import {
  ListItemWrapper,
  ListItemContent,
  ListItemIconWrapper,
  ListItemTitle,
  ListItemDescription,
} from './style';

interface IProps {
  item: IListItem;
  template?: string;
  fontSize?: string;
  iconSize?: string;
}

export const ListItem = (props: IProps) => {
  const { item, template, fontSize, iconSize = '30' } = props;

  return (
    <ListItemWrapper template={template} fontSize={fontSize} iconSize={parseInt(iconSize)}>
      <ListItemIconWrapper>
        <ImageIcon icon={item.icon} iconColor='red' size={parseInt(iconSize)} />
      </ListItemIconWrapper>
      <ListItemContent>
        <ListItemTitle>{item.title}</ListItemTitle>
        <ListItemDescription>{item.description}</ListItemDescription>
      </ListItemContent>
    </ListItemWrapper>
  );
};
