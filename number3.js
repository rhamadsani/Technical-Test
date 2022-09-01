//answer number 3 point a 
function mergeArr(range) {
  let data = [];
  for (let i = 0; i <= range; i++) {
    i % 7 === 0 ? data.push("bestada") : data.push(i);
  }
  return data.join(",");
}
console.log(mergeArr(8));

//answer number 3 point b
function uniqueSort(input){
    const unique = input.filter(function (
      value,
      index,
      self
    ) {
      return self.indexOf(value) === index;
    });

    return unique.sort();
}

console.log(uniqueSort([1, 2, 5, 5, 1, 2, 6, 7, 8, 9]));
