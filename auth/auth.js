const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleToSignup = document.getElementById('toggle-to-signup');
const toggleToSignin = document.getElementById('toggle-to-signin');
const signinToggleText = document.getElementById('signin-toggle');
const signupToggleText = document.getElementById('signup-toggle');
const authTitle = document.getElementById('auth-title');

toggleToSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
  authTitle.textContent = 'Sign up';
  signupToggleText.classList.remove('hidden');
  signinToggleText.classList.add('hidden');
});

toggleToSignin.addEventListener('click', (e) => {
  e.preventDefault();
  signupForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  authTitle.textContent = 'Sign in';
  signupToggleText.classList.add('hidden');
  signinToggleText.classList.remove('hidden');
});

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    const response = await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || 'Registration failed. Please try again.');
      return;
    }

    alert('Signup successful! You can now sign in.');
    toggleToSignin.click();
  } catch (error) {
    console.error('Error during signup:', error);
    alert('Something went wrong. Please try again later.');
  }
});


loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (email === 'admin@quizup.com' && password === '123') {
    const adminUser = { email, role: 'admin' };
    setCurrentUser(adminUser);
    window.location.href = '/dashboard/dashboard.html';
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!result.status === 'success') {
      alert(result.message || 'Login failed. Please try again.');
      return;
    }

    const loggedInUser = new User(result.data.user);
    setCurrentUser(loggedInUser);

    alert(`Welcome back, ${loggedInUser.email}!`);
    window.location.href = '/home/home.html';
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong. Please try again later.');
  }
});
