import { Response } from '@/typings';

export const handleRequest = async <Data extends unknown>(
  url: RequestInfo | URL,
  requestInit?: RequestInit
) => {
  const response = await fetch(url, requestInit);
  const data: Response<Data> = await response.json();
  if (!response.ok) throw new Error(data.errorMessage);
  return data.data;
};
