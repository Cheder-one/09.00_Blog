const getPaginateParams = ({ currentPage, pageSize }) => {
  return { limit: pageSize, offset: pageSize * (currentPage - 1) };
};

export default getPaginateParams;
