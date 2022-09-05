import ProductType from "../types/ProductType";
import { client } from "./client";

export async function updateProduct(obj: ProductType): Promise<any> {
  const prodObj = {
    object: obj,
  };
  const id = obj.id;
  delete obj.id;
  const res = await client({
    url: `/products/${id}`,
    method: "put",
    data: JSON.stringify(prodObj),
  });

  console.log("updateProduct", res.data);
  return res.data;
}
