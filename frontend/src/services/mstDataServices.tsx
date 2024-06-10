import { Province } from "../types/mstTypes";

export const getProvinceDatas = async (signal: AbortSignal) => {
  const res: Province[] = await fetch(
    "http://localhost:3000/api/getProvinceData",
    {
      signal: signal,
    }
  ).then((response) => response.json());
  return res;
};
