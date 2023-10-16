import { handleResponse } from '../../utils/handle-response';
import to from '../../utils/to';
import service from './service';

const create = async (req, res) => {
  const [error, data] = await to(service.create(req.body)); // Ensure req.body is being passed
  handleResponse(error, data, req, res);
}

export default {
  create,
};
