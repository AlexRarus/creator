import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export { InnerHTMLBlockByTinyEditor } from './style';

interface IProps {
  name?: string;
  value?: string;
  onChange?(value: string): void;
  onBlur?(): any;
  imageUploadAction?(formData: FormData, success: (imgUrl: string) => void, failure: any): void;
  height?: number;
}

export function prepareImgSrc(html: string): string {
  const targetOrigin: string = window.location.origin;

  return html ? html.replace(/src="(\.\.\/)+/g, `src="${targetOrigin}/`) : '';
}

const TinyEditor = React.forwardRef((props: IProps, ref: any) => {
  const { height = 500, imageUploadAction, value = '', onChange, ...inputProps } = props;
  const [innerValue, setInnerValue] = useState(value || ''); // на момент загрузки редактора предполагается что исходные данные уже доступны

  const imageUploadHandler = (blobInfo: any, success: (imgUrl: string) => void, failure: any) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    imageUploadAction && imageUploadAction(formData, success, failure);
  };

  const changeHandler = (html: string) => {
    const preparedHtml = prepareImgSrc(html);
    onChange && onChange(preparedHtml === '<p></p>' ? '' : preparedHtml);
  };

  useEffect(() => () => setInnerValue(''), []);

  return (
    <Editor
      {...inputProps}
      initialValue={innerValue}
      init={{
        elementpath: true,
        height,
        width: '100%',
        menubar: true,
        plugins: [
          'advlist autolink lists link image imagetools charmap fullscreen table paste wordcount charmap codesample',
        ],
        toolbar1:
          'undo redo codesample | styleselect | fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | forecolor backcolor',
        toolbar2: 'bullist numlist outdent indent | table image link | fontselect | fullscreen',
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        language: 'ru',
        imagetools_cors_hosts: [], // TODO tinyEditor требует перечислить домены с которых он разрешит редактировать изображения
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        default_link_target: '_blank',
        target_list: false,
        link_title: true,
        images_upload_handler: imageUploadHandler,
      }}
      onEditorChange={changeHandler}
      tinymceScriptSrc={`/assets/tinymce/js/tinymce/tinymce.min.js`}
    />
  );
});

export default TinyEditor;
