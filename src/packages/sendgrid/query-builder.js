import { Op } from 'sequelize';

const queryBuilderGetList = (request = {}) => {
  const match = {
    [Op.and]: []
  };

  if (request.searchText) {
    const searchTextQuery = {
      Text: {
        [Op.like]: `%${request.searchText}%`
      }
    };
    match[Op.and].push(searchTextQuery);
  }

  return match;
};

export {
  queryBuilderGetList
};
