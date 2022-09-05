import { client } from "./client";

export async function getProduct(queryKey: any): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, id] = queryKey.queryKey;
  if(id){
    const res = await client({
        url: `/products/${id}`,
        method: "get",
      });
    
      console.log("getProduct", res.data);
      return res.data;
  }else{
    return undefined;
  }

}
