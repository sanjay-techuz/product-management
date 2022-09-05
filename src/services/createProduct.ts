import ProductType from "../types/ProductType";
import { client } from "./client";

export async function createProduct(obj: ProductType): Promise<any> {
  const prodObj = {
    object: obj,
  };
  const res = await client({
    url: `/products`,
    method: "post",
    data: JSON.stringify(prodObj),
  });

  console.log("createProduct", res.data);
  return res.data;
}
