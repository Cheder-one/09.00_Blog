import ServiceError from '../../../utils/ServiceError';

import api from './api.service';

const articleService = {
  loadChunk: async (params) => {
    try {
      const { data } = await api.get('/articles', { params });
      return data;
    } catch (error) {
      const info = 'Ошибка получения articles';
      throw new ServiceError(error, info);
    }
  },
  loadOne: async (slug) => {
    try {
      const { data } = await api.get(`/articles/${slug}`);
      return data;
    } catch (error) {
      const info = `Ошибка получения article с ID ${slug}`;
      throw new ServiceError(error, info);
    }
  },
  create: async (body) => {
    try {
      const { data } = await api.post('/articles', body);
      return data;
    } catch (error) {
      const info = 'Ошибка создания article';
      throw new ServiceError(error, info);
    }
  },
  update: async (slug, body) => {
    try {
      const { data } = await api.put(`/articles/${slug}`, body);
      return data;
    } catch (error) {
      const info = `Ошибка обновления article с ID ${slug}`;
      throw new ServiceError(error, info);
    }
  },
  delete: async (slug) => {
    try {
      const { data } = await api.delete(`/articles/${slug}`);
      return data;
    } catch (error) {
      const info = `Ошибка удаления article с ID ${slug}`;
      throw new ServiceError(error, info);
    }
  },
};

export default articleService;
