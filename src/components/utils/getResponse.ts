import axios from 'axios';
import type { IRequest } from './interfaces';

export const getResponse = async (request: IRequest) => {
  console.log('start asking');

  const response = await axios.post('http://109.205.19.154:8082/ask', request, {
    headers: { 'Content-Type': 'application/json' },
  });

  console.log('stop asking');
  return response.data;
};
