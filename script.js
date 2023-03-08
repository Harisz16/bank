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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// movements.forEach(function (mov, i, arr) {
//   movements > 0
//     ? console.log(`transcation:${i}: ${mov}`)
//     : console.log(`transcation:${i}: ${mov}`);
// });

// //challenge #1
// const juliaDog = [3, 5, 2, 12, 7];
// const kateDog = [4, 1, 15, 8, 3];
// const juliaDog2 = [9, 16, 6, 8, 3];
// const kateDog2 = [10, 5, 6, 1, 4];
// // const juliaDogCorrected = juliaDog.splice(2);
// // //juliaDogCorrected = juliaDog.splice(-2);
// // console.log(juliaDogCorrected);
// const checkDogs = function (juliaDog, kateDog) {
//   let juliaDogCorrected = juliaDog.splice(2);

//   juliaDogCorrected = juliaDog.splice(-2);
//   const dogdata = [...juliaDogCorrected, ...kateDog];
//   for (const [i, dogs] of dogdata.entries()) {
//     dogs >= 3
//       ? console.log(`dog number ${i + 1} is an adult, and ${dogs} year old`)
//       : console.log(`dog number ${i + 1} is still a pubby`);
//   }
//   console.log(`----------------`);
//   dogdata.forEach(function (dogs, i) {
//     dogs >= 3
//       ? console.log(`dog number ${i + 1} is an adult, and ${dogs} year old`)
//       : console.log(`dog number ${i + 1} is still a pubby`);
//   });
// };
// checkDogs(juliaDog, kateDog);
// checkDogs(juliaDog2, kateDog2);

// const euro = 1.2;
// const euroTousd = movements.map(mov => {
//   return mov * euro;
// });
// console.log(euroTousd);

const call = mov => {
  diaplayMovements(mov.movements);
  balanceInAccount(mov);
  movementsIn(mov.movements);
  movementsout(mov.movements);
};

containerApp.style.opacity = 0;
const createUserName = name => {
  name.forEach(mov => {
    mov.username = mov.owner
      .toLowerCase()
      .split(' ')
      .map(mov => mov[0])
      .join('');
  });
};
createUserName(accounts);
console.log(accounts);
let currentAccount;

//movements

//balance
const balanceInAccount = function (mov) {
  mov.balance = mov.movements.reduce((acc = 0, cur) => {
    return acc + cur;
  });
  labelBalance.textContent = `${mov.balance} IND`;
};

//movements in

const movementsIn = function (movement) {
  const inm = movement
    .filter(mov => mov > 0)
    .reduce((acc = 0, cur) => acc + cur);
  labelSumIn.textContent = `${inm}€`;
};

//movementsOut
const movementsout = function (mov) {
  const outs = mov.filter(movs => movs < 0).reduce((acc = 0, cur) => acc + cur);
  labelSumOut.textContent = `${outs}€`;
};

// finding intrest
const intrest = function (mov, ints) {
  const int = mov
    .filter(movs => movs > 0)
    .map(movs => (movs * ints) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, cur) => acc + cur, 0);
  console.log(int);
  labelSumInterest.textContent = int;
};

//intrest(account1.movements);
//finding the bigest tran
movementsout(movements);

const bigTran = function (mov) {
  const big = mov.reduce((acc = mov[0], cur) => {
    return acc < cur ? cur : acc;
  });
  console.log(big);
};
bigTran(movements);

// const createUserName = user => {
//   const username = user
//     .toLowerCase()
//     .split(' ')
//     .map(mov => mov[0])
//     .join('');
//   return username;
// };

//console.log(account1);

const deposit = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);
//console.log(deposit, withdrawals);

//challenge #2

const calcAverageHumanAge = function (julia, kate) {
  const dogage = [...julia, ...kate];
  const dogInHumanAge = dogage.map(age => age * 2);
  const filters = dogInHumanAge.filter(age => age > 18);
  const total = filters.reduce((acc = 0, cur, i) => acc + cur);
  const average = total / filters.length;

  const dogInHumanAge2 = dogage
    .map(age => age * 2)
    .filter(age => age > 18)
    .reduce((acc = 0, cur, i, arr) => acc + cur / arr.length);
  console.log(dogInHumanAge2, filters, total, average);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3], [16, 6, 10, 5, 6, 1, 4]);

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(inputLoginUsername.value);
  console.log(inputLoginPin.value);
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount.pin);
  //

  if (Number(inputLoginPin.value) === currentAccount.pin) {
    containerApp.style.opacity = 100;
    labelWelcome.textContent = ` Welcome ${currentAccount.owner.split(' ')[0]}`;
    console.log(currentAccount.movements);
    call(currentAccount);
    intrest(currentAccount.movements, currentAccount.intrest);
    inputLoginPin.value = ' ';
    inputLoginUsername.value = '';

    btnTransfer.addEventListener('click', e => {
      e.preventDefault();
      const inputvalu = Number(inputTransferAmount.value);
      const recicer = accounts.find(
        name => inputTransferTo.value === name.username
      );
      if (recicer && inputvalu < currentAccount.balance)
        currentAccount.movements.push(-inputvalu);
      recicer.movements.push(inputvalu);
      call(currentAccount);
      inputTransferAmount.value = '';
      inputTransferTo.value = '';

      console.log(recicer);
    });

    btnLoan.addEventListener('click', e => {
      e.preventDefault();
      const input = Number(inputLoanAmount.value);

      if (
        currentAccount.movements.some(mov => mov >= input * 0.1) &&
        input > 0
      ) {
        currentAccount.movements.push(input);
        call(currentAccount);
        inputLoanAmount.value = '';
      }
      //console.log(loan);
    });
  }
});
inputLoginPin.value = 1111;
inputLoginUsername.value = 'js';

const diaplayMovements = function (move, sort = false) {
  //containerMovements.innerHTML = '';
  const movs = sort ? move.slice().sort((a, b) => a - b) : move;
  movs.forEach((mov, i) => {
    let type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } deposit</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const dice = Math.round(Math.random() * 6) + 1;
console.log(dice);
const rand = Array.from({ length: 100 }, () => dice);
console.log(rand);
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  diaplayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
