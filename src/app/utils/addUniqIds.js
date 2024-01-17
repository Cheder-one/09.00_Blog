import { nanoid } from 'nanoid';

const addUniqIds = (data) => {
  const modifiedData = data.map((item) => ({
    id: nanoid(),
    ...item,
  }));
  return modifiedData;
};

export default addUniqIds;
