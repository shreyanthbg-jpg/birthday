if (document.querySelector('#secretForm')) {
  const secretForm = document.querySelector('#secretForm');
  const secretPassword = document.querySelector('#secretPassword');
  const errorMessage = document.querySelector('#errorMessage');

  secretForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const password = secretPassword.value.trim().toLowerCase();
    if (password === 'pruthvi') {
      sessionStorage.setItem('storyUnlocked', '1');
      errorMessage.textContent = 'Opening your little world...';
      errorMessage.style.color = '#ffb2cd';
      secretPassword.disabled = true;
      const submitButton = secretForm.querySelector('button');
      submitButton.disabled = true;
      submitButton.textContent = 'Surprise unlocked ♡';
      window.setTimeout(() => {
        window.location.href = 'birthday.html?unlocked=1';
      }, 500);
      return;
    }
    errorMessage.textContent = 'That is not it... try the hint ♡';
    secretPassword.select();
  });
}

