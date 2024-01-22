import ServiceError from '../../../utils/ServiceError';

import api from './api.service';

const userService = {
  register: async (body) => {
    try {
      const { data } = await api.post('/users', body);
      return data;
    } catch (error) {
      const info =
        error.request.status === 422
          ? 'Пользователь с такими данными уже существует'
          : 'Ошибка регистрации пользователя';
      throw new ServiceError(error, info);
    }
  },
  login: async (body) => {
    try {
      const { data } = await api.post('/users/login ', body);
      return data;
    } catch (error) {
      const info = 'Ошибка при входе пользователя';
      throw new ServiceError(error, info);
    }
  },
  checkAuth: async () => {
    try {
      if (!localStorage.getItem('token')) return null;
      const { data } = await api.get('/user');
      return data;
    } catch (error) {
      const info = 'Ошибка при проверке авторизации';
      throw new ServiceError(error, info);
    }
  },
  update: async (body) => {
    try {
      const { data } = await api.put('/user', body);
      return data;
    } catch (error) {
      const info = 'Ошибка при обновлении профиля';
      throw new ServiceError(error, info);
    }
  },
};

export default userService;
