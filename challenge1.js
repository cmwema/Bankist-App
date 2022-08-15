const checkDogs = function (dogsJulia, dogsKate) {
  const julias = dogsJulia.slice(1, -2); //create a shallow copy of Julia's array, and remove the cat ages from that copied array

  const allData = [...julias, ...dogsKate]; //Create an array with both Julia's (corrected) and Kate's data

  allData.forEach(function (age, i, dogs) {
    if (age >= 3) {
      console.log(`Dog 🐶 number ${i} is an adult, and is ${age} years old"`);
    } else {
      console.log(`Dog number ${i} is still a puppy`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
