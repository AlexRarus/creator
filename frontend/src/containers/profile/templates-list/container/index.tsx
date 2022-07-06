import React, { useState, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Confirm } from 'src/components/confirm';
import { MuiTabs } from 'src/components/mui-tabs';
import { ITemplate, ITemplateType } from 'src/dal/templates/interfaces';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

import { AddTemplateModal } from './add-template-modal';
import { TemplatePreviewItem } from './template-preview-item';
import { useMapStoreToProps } from './selectors';
import {
  TemplatesListWrapper,
  TemplatesListTitleDesktop,
  SwiperWrapper,
  NewTemplateButtonWrapper,
} from './style';

interface IProps {
  username: string;
  templateType: string;
}

export const TemplatesListContainer = observer((props: IProps) => {
  const { username, templateType } = props;
  const {
    isLoading,
    templateTypes,
    templates,
    getTemplatesTypesAction,
    getTemplatesListByTypeAction,
    createPageByTemplate,
    deleteTemplateAction,
    user,
  } = useMapStoreToProps();
  const theme = useTheme();
  const { i18n, t } = useTranslation('templates');
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm')); // больше чем 600px
  const matchesMD = useMediaQuery(theme.breakpoints.up('md')); // больше чем 900px
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg')); // больше чем 1200px
  const matchesXL = useMediaQuery(theme.breakpoints.up('xl')); // больше чем 1536px
  const [slidesPerView, setSlidesPerView] = useState(1);
  const navigate = useNavigate();
  const [confirmTemplate, setConfirmTemplate] = useState<ITemplate | null>(null);
  const [isOpenAddTemplateModal, setIsOpenAddTemplateModal] = useState(false);

  useEffect(() => {
    // получаем типы шаблонов, если их еще нет
    if (!templateTypes.length) {
      getTemplatesTypesAction();
    }
  }, []);

  useEffect(() => {
    getTemplatesListByTypeAction(templateType);
  }, [templateType]);

  useEffect(() => {
    // редирект
    if (!templateType && templateTypes.length) {
      navigate(`${templateTypes[0].slug}`, { replace: true });
    }
  }, [templateType, templateTypes.length]);

  const changeTemplateType = (value: string) => {
    navigate(`/profile/${username}/templates/${value}`);
  };

  const templatesTabs: any[] = useMemo(
    () =>
      templateTypes.map((templateType: ITemplateType) => ({
        label: t(`templateType.${templateType.slug || 'default'}`),
        value: templateType.slug,
      })),
    [templateTypes, i18n.language]
  );

  useEffect(() => {
    if (matchesXL) {
      setSlidesPerView(5);
    } else if (matchesLG) {
      setSlidesPerView(4);
    } else if (matchesMD) {
      setSlidesPerView(3);
    } else if (matchesSM) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  }, [matchesSM, matchesMD, matchesLG]);

  const onConfirmCreatePageByTemplate = (template: ITemplate) => {
    setConfirmTemplate(template);
  };

  const onCreatePageByTemplate = () => {
    createPageByTemplate(confirmTemplate?.id as number);
  };

  const onDeclineCreatePageByTemplate = () => {
    setConfirmTemplate(null);
  };

  const openAddTemplateModal = () => setIsOpenAddTemplateModal(true);
  const closeAddTemplateModal = () => setIsOpenAddTemplateModal(false);

  const onSuccessAddTemplate = (data: any) =>
    navigate(`/profile/${username}/templates/${templateType}/${data.slug}/`);

  return (
    <>
      <TemplatesListTitleDesktop>Шаблоны</TemplatesListTitleDesktop>
      <MuiTabs value={templateType} onChange={changeTemplateType} tabs={templatesTabs} />
      <TemplatesListWrapper>
        {isLoading && 'Loading...'}
        {!isLoading && templates !== null && (
          <SwiperWrapper>
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={30}
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}>
              {templates.map((template: ITemplate) => (
                <SwiperSlide key={template.slug}>
                  <TemplatePreviewItem
                    username={username}
                    templateType={templateType}
                    template={template}
                    onClick={onConfirmCreatePageByTemplate}
                    deleteTemplateAction={deleteTemplateAction}
                    user={user}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>
        )}
        {user?.role === 'admin' && (
          <NewTemplateButtonWrapper>
            <Button onClick={openAddTemplateModal} startIcon={<AddIcon />} variant='contained'>
              Создать шаблон
            </Button>
          </NewTemplateButtonWrapper>
        )}

        {isOpenAddTemplateModal && (
          <AddTemplateModal
            templateType={templateType}
            onClose={closeAddTemplateModal}
            onSuccess={onSuccessAddTemplate}
          />
        )}
        {Boolean(confirmTemplate) && (
          <Confirm
            onConfirm={onCreatePageByTemplate}
            onClose={onDeclineCreatePageByTemplate}
            confirmMessage='Создать страницу из шаблона?'
            confirmTitle='Подтверждение'
          />
        )}
      </TemplatesListWrapper>
    </>
  );
});
