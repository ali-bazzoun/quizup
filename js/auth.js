const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleToSignup = document.getElementById('toggle-to-signup');
const toggleToSignin = document.getElementById('toggle-to-signin');
const authTitle = document.getElementById('auth-title');
const signinToggleText = document.getElementById('signin-toggle');
const signupToggleText = document.getElementById('signup-toggle');

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

  const existingUser = window.usersList.find((user) => user.email === email);
  if (existingUser) {
    alert('User already exists. Please sign in.');
    return;
  }

  const newUser = new User(email, password);
  window.usersList.push(newUser);

  signupData = { email, password };

  console.log('User added to users list:', newUser);
  console.log('Updated users list:', window.usersList);

  alert('Signup successful! You can now sign in.');

  toggleToSignin.click();
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const user = window.usersList.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    alert('Invalid email or password. Please try again.');
    return;
  }

  window.currentUser = user;

  console.log('User signed in:', user);

  alert(`Welcome back, ${user.email}!`);

  window.location.href = 'index.html';
});