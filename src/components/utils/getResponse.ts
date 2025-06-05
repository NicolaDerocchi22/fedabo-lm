import type { IRequest } from './interfaces';
import simpleResponse from './sample_simple_response.json';
import complexResponse from './saple_complex_response.json';

export const getResponse = (request: IRequest) => {
  return complexResponse;
};
