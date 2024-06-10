export const getProvinceData = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
  )
    .then((response) => response.json())
    .then((data) => {
      return data.map((prov: { id: any; name_th: any; amphure: any[] }) => {
        return {
          id: prov.id,
          name: prov.name_th,
          districts: prov.amphure.map(
            (amphure: { id: any; name_th: any; tambon: any[] }) => {
              return {
                id: amphure.id,
                name: amphure.name_th,
                subdistricts: amphure.tambon.map(
                  (tambon: { id: any; name_th: any }) => {
                    return { id: tambon.id, name: tambon.name_th };
                  }
                ),
              };
            }
          ),
        };
      });
    })
    .catch((e) => console.error(e));
  return res;
};
