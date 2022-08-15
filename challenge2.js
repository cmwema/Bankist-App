const data1 = [5, 2, 4, 1, 15, 8, 3];

// data1.forEach(element => {
//   console.log(`${element > 2 ? element * 4 + 16 : element * 2}`);
// });

function calcAverageHmaAge(dogAges) {
  const humanAge = dogAges.map(age => (age <= 2 ? age * 2 : age * 4 + 16));
  console.log(humanAge);
  const adultDogs = humanAge.filter(age => (age >= 18 ? age : null));
  console.log(adultDogs);
  const totalAges = adultDogs.reduce((avg, curr, i) => {
    return (avg += curr);
  }, 0);

  const average = totalAges / adultDogs.length;
  console.log(average);
}

// calcHhumaAge(data1);
calcAverageHmaAge(data1);
calcAverageHmaAge([16, 6, 10, 5, 6, 1, 4]);
