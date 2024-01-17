import ServiceError from '../../utils/ServiceError';
import addUniqIds from '../../utils/addUniqIds';

import api from './api.service';

const articleService = {
  getChunk: async (params) => {
    try {
      const { data } = await api.get('/articles', { params });
      return { ...data, ...addUniqIds(data.articles) };
    } catch (error) {
      const info = 'Ошибка получения articles';
      throw new ServiceError(error, info);
    }
  },
  getOne: async (id) => {
    try {
      const { data } = await api.get(`/articles/${id}`);
      return data;
    } catch (error) {
      const info = `Ошибка получения article с ID ${id}`;
      throw new ServiceError(error, info);
    }
  },
  post: async (data) => {
    try {
      const response = await api.post('/articles', data);
      return response;
    } catch (error) {
      const info = 'Ошибка создания article';
      throw new ServiceError(error, info);
    }
  },
  update: async (id, data) => {
    try {
      const response = await api.put(`/articles/${id}`, data);
      return response;
    } catch (error) {
      const info = `Ошибка обновления article с ID ${id}`;
      throw new ServiceError(error, info);
    }
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/articles/${id}`);
      return response;
    } catch (error) {
      const info = `Ошибка удаления article с ID ${id}`;
      throw new ServiceError(error, info);
    }
  },
};

export default articleService;
