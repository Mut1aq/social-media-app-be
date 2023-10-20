import { RequestMethod } from '@nestjs/common';
import { DynamicObjectI } from 'shared/interfaces/dynamic-object.interface';
import { LoggedRequestI } from 'shared/interfaces/logged-request.interface';
import { RequestI } from 'shared/interfaces/request.interface';

export const requestMapper = (request: RequestI) => {
  const { params, path, query, headers, body, method } = request;

  const mappedRequest: LoggedRequestI = {
    path,
    body,
    token: (headers.authorization ?? 'Bearer ').split(' ')[1],
    lang: headers['accept-language'] ?? 'en',
    queryParams: query,
    routeParams: params,
    method: (RequestMethod as DynamicObjectI)[method],
  };

  return mappedRequest;
};
