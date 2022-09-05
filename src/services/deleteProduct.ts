import { client } from './client';

export async function deleteProduct(id: string): Promise<any> {
  const res = await client({
    url: `/products/${id}`,
    method: 'delete'
  });

  console.log('deleteProduct', res.data);
  return res.data;
}
