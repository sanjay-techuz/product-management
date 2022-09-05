import { client } from './client';

export async function productList(): Promise<any> {
  const res = await client({
    url: '/products',
    method: 'get'
  });

  console.log('productList', res.data);
  return res.data;
}
