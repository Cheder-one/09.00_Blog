import { useEffect } from 'react';

const useArticlePresetOnEdit = (isEdit, articleOne, setValue) => {
  useEffect(() => {
    if (!isEdit) return;
    const { title, description, body, tagList } = articleOne || {};
    setValue('text', body);
    setValue('title', title);
    setValue('description', description);
    setValue(
      'tags',
      tagList?.map((item) => ({ tag: item }))
    );
  }, [articleOne]);
};

export default useArticlePresetOnEdit;
