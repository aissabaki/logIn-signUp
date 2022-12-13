/*------------ DOM Elements  ----------------*/
const form = document.getElementById('signUpForm'),
 userName = document.getElementById('signupUsername'),
  passWord = document.getElementById('passWord'),
  confirmPsw = document.getElementById('ConfirmPassWord'),
  email = document.getElementById('email'),
  createBtn = document.querySelector('#createAccountBtn'),
  inputGroup = document.querySelectorAll('.form__input');
let mood = 'enabled';

  //Form Refresh State
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

// Input validation 
document.addEventListener('DOMContentLoaded', function () {
  inputGroup.forEach((inputElement) => {
    inputElement.addEventListener('blur', (e) => {
      if (
        e.target.id === 'signupUsername' &&
        e.target.value.length > 0 &&
        e.target.value.length < 5
      ) {
        setInputError(
          inputElement,
          'Username must be at least 5 characters in length'
        );
      }
      if (e.target.id === 'email' && !e.target.value.includes('@')) {
        setInputError(inputElement, 'Please enter a valid Email');
      }
      if (e.target.id === 'passWord') {
        if (e.target.value.length > 0 && e.target.value.length < 10) {
          setInputError(
            inputElement,
            'password must be at least 10 characters in length'
          );
        }
      }
    });

    inputElement.addEventListener('input', (e) => {
      clearInputError(inputElement);
    });
  });
});
/*------------ See password  ----------------*/

let pass = document.querySelector('[type="password"]');

function seePassWord() {
  if (pass.type === 'password') {
    pass.type = 'text';
  } else {
    pass.type = 'password';
  }
}

/*------------ Confirm  password  ----------------*/

function confirmPassWord() {
  if (passWord.value === confirmPsw.value) {
    btnEnabled()
    mood = 'enabled'
  }
  if (passWord.value != confirmPsw.value) {
    setInputError(confirmPsw, "passwords doesn't match");
    mood = 'disabled'
  }
}
confirmPsw.addEventListener('blur', confirmPassWord)

/*------------ Input Error message  ----------------*/

function setInputError(inputElement, message) {
  inputElement.parentElement.querySelector(
    '.form__input-error-message'
  ).textContent = message;
  inputElement.parentElement
    .querySelector('.form__input-error-message')
    .classList.add('show__input--error');
  mood = 'disabled'
}

/*------------ Clear input error ----------------*/

function clearInputError(inputElement) {
  mood = 'enabled'
  inputElement.classList.remove('show__input--error');
  inputElement.parentElement.querySelector(
    '.form__input-error-message'
  ).textContent = '';
}

/*------------ Create a new account ----------------*/

/* disable the create button if there is any invalid input value */

function btnDisabled() {
  createBtn.disabled = true;
  createBtn.classList.add('disabled');
}
function btnEnabled() {
  createBtn.disabled = false;
  createBtn.classList.remove('disabled');
}

//store users in array
let usersList;

if (localStorage.users != null) {
  usersList = JSON.parse(localStorage.users);
} else {
  usersList = [];
}

// create

createBtn.addEventListener('click', createAccount);

function createAccount() {
  if (mood === 'disabled') {
    btnDisabled()
  }
  if (mood === 'enabled') {
    btnEnabled()
    let newUser = {
    username: userName.value,
    email: email.value,
    password: passWord.value,
  };
  usersList.push(newUser);

  localStorage.setItem('users', JSON.stringify(usersList));
  }
  
}
