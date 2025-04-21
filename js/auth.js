const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleToSignup = document.getElementById('toggle-to-signup');
const toggleToSignin = document.getElementById('toggle-to-signin');
const authTitle = document.getElementById('auth-title');
const signinToggleText = document.getElementById('signin-toggle');
const signupToggleText = document.getElementById('signup-toggle');

let signupData = {};

toggleToSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
  authTitle.textContent = 'Sign up';
  signinToggleText.classList.add('hidden');
  signupToggleText.classList.remove('hidden');
});

toggleToSignin.addEventListener('click', (e) => {
  e.preventDefault();
  signupForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  authTitle.textContent = 'Sign in';
  signupToggleText.classList.add('hidden');
  signinToggleText.classList.remove('hidden');
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  signupData = { email, password };

  console.log('Signup data stored:', signupData);
  alert('Signup successful! You can now sign in.');

  toggleToSignin.click();
});