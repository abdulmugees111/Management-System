export const reFormat = (list) => {
  let arr = [];

  if(list && list.count > 0){
    arr = list.results.map((e) => {
      return {
        value: e.id,
        label: e.name,
      };
    });
  }

  return arr;
};


export const PlansReFormattor = (list) => {
  let arr = [];

  if(list && list.count > 0){
    arr = list.records.map((e) => {
      return {
        value: e.id,
        label: e.name,
        price: e.year_price
      };
    });
  }

  return arr;
};
