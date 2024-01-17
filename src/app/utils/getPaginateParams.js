const getPaginateParams = ({ pagination }) => {
  const { currentPage, pageSize } = pagination;
  return { limit: pageSize, offset: pageSize * (currentPage - 1) };
};

export default getPaginateParams;
