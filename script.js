'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};
const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovement = function (movs, sort = false) {
  containerMovements.innerHTML = '';

  const movements = sort ? movs.slice().sort((a, b) => a - b) : movs;

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov} €</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  /***/
};

// displayMovement(account1.movements);

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

// calcPrintBalance(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const spend = Math.abs(
    acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
  );

  labelSumOut.textContent = `${spend} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((total, interest) => total + interest, 0);
  labelSumInterest.textContent = `${interest} €`;
};

// calcDisplaySummary(account1.movements);

// updateUI
function updateUI(acc) {
  // display movements
  displayMovement(acc.movements);
  // display summary
  calcDisplaySummary(acc);
  // display balance
  calcPrintBalance(acc);
}
// the login
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // alert('Logged in!!!!');
    // display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    } 🤑`;
    containerApp.style.opacity = 100;
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  // console.log(amount, '\n', transferToAcc);
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // console.log('Transfer valid!!!');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(+amount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) == currentAccount.pin
  ) {
    // console.log('Deletion initiated.');
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }

  inputClosePin.value = inputCloseUsername.value = '';
});

// loan request and approval
// using the some(0 method
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement to the account
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
    // /clear the input
  }
  inputLoanAmount.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// get the overall balance of the bank
const allBalances = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);
console.log('Bank networth!.', allBalances);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // the some methood
// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// // find method
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log('First widrawal: ', firstWithdrawal);
// const firstDeposit = movements.find(mov => mov > 0);
// console.log('First deposit: ', firstDeposit);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// // using for of loop
// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') {
//     console.log(acc);
//   }
// }

// const max = movements.reduce(function (acc, cur, i, arr) {
//   if (acc > cur) {
//     return acc;
//   } else {
//     return cur;
//   }
// }, movements[0]);

// console.log(max);

// const eurToUsd = 1.1;
// const movementsUsd = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// //const movementsUsd = movements.map(mov => mov * eurToUsd); using arrow funciton
// //

// console.log(movementsUsd);

// const movementsDescription = movements.map((mov, i) => {
//   if (mov > 0) {
//     return `You have deposited ${mov}`;
//   } else {
//     return `You have withdrawn ${Math.abs(mov)}`;
//   }
// });

// console.log(movementsDescription);

// // compute usernames
// const user = 'Caleb Mwema';
// const createUserNames = function (accs) {
//   accs.forEach(acc => {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(name => name[0].toLocaleUpperCase())
//       .join('');
//   });
// };
// createUserNames(accounts);
// console.log(accounts);

// // filter
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(deposits);

// const withdrawals = movements.filter(function (mov) {
//   return Math.abs(mov < 0);
// });

// console.log(withdrawals);

// const balance = movements.reduce(function (accumulator, mov, i, arrr) {
//   return accumulator + mov;
// }, 0);

// console.log(balance);

// // foreach method
// movements.forEach(element => {
//   if (element > 0) {
//     console.log(`You have deposited ${element}`);
//   } else {
//     console.log(`You have withdrawn ${Math.abs(element)}`);
//   }
// });

// currencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });

// const currenciesUnique = new Set(['USD', 'EUR', 'GBP']);

// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${value}`);
// });

/////////////////////////////////////////////////

// CREATING ARRAYS more methods
// using the array constructor function
const x = new Array(7); //creates and empty array of length = 7
console.log(x);

// use the fil ,ethod to enter data onto the array
console.log(x.fill(6));

//
const y = Array.from({ length: 7 }, () => 1);

console.log(y);
const z = Array.from({ length: 7 }, (cur, i) => i + 1);

console.log(z);

const diceRolls = Array.from({ length: 100 }, (curr, i) => i + 1);
console.log('A hundred dice rolls array: ', diceRolls);
