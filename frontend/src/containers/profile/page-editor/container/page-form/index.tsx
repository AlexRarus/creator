import React from 'react';
import { Grid, GridColumn } from 'src/components/grid';
import { IBlock } from 'src/dal/blocks/interfaces';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import Button from 'src/components/button';
import { IPage } from 'src/dal/pages/interfaces';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import {
  FormWrapper,
  FormHeader,
  HeaderMessage,
  FormFooter,
  IconButton,
  AddBlockButtonWrapper,
} from './style';

interface IProps {
  data: IPage;
  username: string;
  pageSlug: string;
  onClickAddBlock?: () => void;
}

export const PageForm = (props: IProps) => {
  const { data, onClickAddBlock } = props;

  const goToPreviewAction = () => console.log('goToPreviewAction');
  const openPageSettingsModal = () => console.log('openPageSettingsModal');

  return (
    <>
      <FormHeader>
        <HeaderMessage>
          Получить ссылку
          <ArrowRightAltIcon />
        </HeaderMessage>
        <Button onClick={openPageSettingsModal}>Установить</Button>
      </FormHeader>
      <FormWrapper>
        <Grid verticalGap={32}>
          <GridColumn alignItems='center'>
            <Grid>
              {data.blocks.map((block: IBlock<any>) => (
                <GridColumn key={block.id} size={12}>
                  <TargetBlockTypePreview block={block} />
                </GridColumn>
              ))}
            </Grid>
          </GridColumn>
        </Grid>
      </FormWrapper>
      <FormFooter>
        <IconButton onClick={goToPreviewAction}>
          <VisibilityIcon />
        </IconButton>
        <AddBlockButtonWrapper>
          <Button block={true} onClick={onClickAddBlock}>
            Добавить блок
          </Button>
        </AddBlockButtonWrapper>
        <IconButton onClick={openPageSettingsModal}>
          <SettingsIcon />
        </IconButton>
      </FormFooter>
    </>
  );
};
