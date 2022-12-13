/*------------ DOM Elements  ----------------*/
const loginForm = document.querySelector('#logInForm');

// get the usersList from the localestorage

let usersList = JSON.parse(localStorage.users);

/*------------ See password  ----------------*/

let pass = document.querySelector('[type="password"]');

function seePassWord() {
  if (pass.type === 'password') {
    pass.type = 'text';
  } else {
    pass.type = 'password';
  }
}

/*------------ Form message ----------------*/

function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector('.form__message');

  messageElement.textContent = message;
  messageElement.classList.remove(
    'form__message--success',
    'form__message--error'
  );
  messageElement.classList.add(`form__message--${type}`);
}

/*------------ Login FORM SUBMITION ----------------*/

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const loginPassword = document.getElementById('loginPassword'),
        loginUser = document.getElementById('loginUser');

  
  //  localestorage check login

  for (let i = 0; i <= usersList.length; i++) {
    let user = usersList[i];
    
    if (
      loginUser.value == user.email &&
      loginPassword.value == user.password
    ) {
      
      setFormMessage(loginForm, 'success', 'successfull log in');
      break;
    } else {
      setFormMessage(
        loginForm,
        'error',
        'Invalid username/password combination'
      );
    }
  }
});

