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
