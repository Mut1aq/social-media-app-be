import { LoggedRequestI } from 'shared/interfaces/logged-request.interface';
import { RequestI } from 'shared/interfaces/request.interface';

export const requestMapper = (request: RequestI) => {
  const { params, path, query, headers, body } = request;

  const mappedRequest: LoggedRequestI = {
    path,
    body,
    token: (headers.authorization ?? 'Bearer ').split(' ')[1],
    lang: headers['accept-language'] ?? 'en',
    queryParams: query,
    routeParams: params,
  };

  return mappedRequest;
};
