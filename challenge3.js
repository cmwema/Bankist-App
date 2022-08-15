const calcAverageHmaAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => {
      // console.log(arr);
      // console.log(i + 1);
      return acc + age / arr.length;
    }, 0);

console.log(calcAverageHmaAge([16, 6, 10, 5, 6, 1, 4]));
