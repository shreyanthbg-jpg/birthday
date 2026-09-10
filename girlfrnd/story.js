const hasValidSession = sessionStorage.getItem('storyUnlocked') === '1';
const hasValidQuery = new URLSearchParams(window.location.search).get('unlocked') === '1';

if (!hasValidSession && !hasValidQuery) {
  sessionStorage.setItem('storyUnlocked', '1');
}

if (hasValidQuery) {
  sessionStorage.setItem('storyUnlocked', '1');
}

const scenes = [
  {
    image: 'images/screen-01.jpeg',
    kicker: 'Home Page · after login',
    title: 'Welcome to<br>Our Story ♡',
    lead: '7 YEARS OF US',
    body: 'Some You...<br>Always Beautiful ♡'
  },
  {
    image: 'images/screen-02.jpeg',
    kicker: 'Our Journey',
    title: 'A Journey<br>Called Us ♡',
    lead: 'From strangers to best friends,<br>From best friends to something more,<br>From moments to memories,<br>From 0 to 7 years ...<br>And I still choose you,<br>Every single day. ♡',
    body: 'Thank you for being<br>part of my story ♡',
    action: 'Our Timeline →'
  },
  {
    image: 'images/screen-03.jpeg',
    kicker: 'Beautiful You',
    title: 'Beautiful<br>You ♡',
    lead: 'Your smile can make my worst day better.',
    body: 'You are simply beautiful,<br>inside and out. ♡'
  },
  {
    image: 'images/screen-04.jpeg',
    kicker: 'Little Moments',
    title: 'Little Moments<br>Big Happiness',
    lead: 'It’s not always about big things.',
    body: 'But the small moments with you make life so beautiful...<br>Your random texts, our silly talks, those late night conversations...<br>Everything matters. ♡'
  },
  {
    image: 'images/screen-05.jpeg',
    kicker: 'A Letter For You',
    title: 'A Letter<br>For You',
    lead: 'Dear Chintu,',
    body: 'You are the only woman I see in my future,<br>and the only one I will ever want as my wife.<br><br>No matter how long it takes, I will always wait for you. ♡',
    signature: 'With all my love,<br><span>Shreyant ♡</span>'
  },
  {
    image: 'images/screen-06.jpeg',
    kicker: 'Reasons I Love You',
    title: 'Reasons<br>I Love You ♡',
    lead: 'You are enough.<br>You are beautiful.<br>You are loved.',
    body: 'You are stronger than you think.<br>You make the world brighter.<br>You are my always.'
  },
  {
    image: 'images/screen-07.jpeg',
    kicker: 'Our Future',
    title: 'My Future ♡',
    lead: 'I see you in my tomorrow,<br>in my happy days, in my difficult days.',
    body: 'I don’t just want to spend time with you,<br>I want to build a life with you. ♡'
  },
  {
    image: 'images/screen-08.jpeg',
    kicker: 'Birthday Message',
    title: 'Happy Birthday<br>Chintu ♡',
    lead: 'On your special day, I just want to say...',
    body: 'I hope this new year brings you endless happiness, peace, success, and everything your heart wishes for.<br>You deserve all the love in this world. ♡',
    signature: 'Make a Wish ♡'
  },
  {
    image: 'images/screen-09.jpeg',
    kicker: 'The End - But Not Really',
    title: 'This is Not the End...<br>It’s Just Another Chapter ♡',
    lead: 'Thank you for being you.<br>Thank you for 7 amazing years.<br>Thank you for all the memories,<br>all the love, and all the moments.',
    body: 'Here’s to many more birthdays,<br>more dreams, more adventures,<br>and a lifetime of us. ♡',
    signature: 'Forever Yours,<br>Shreyanth ♡'
  },
  {
    image: 'images/screen-10.jpeg',
    kicker: 'The Final Chapter... For Now',
    title: 'This is not the end.<br><span>It’s just another chapter. ❤️</span>',
    lead: 'Thank you for being you.<br>Thank you for seven years.<br>Thank you for all the memories,<br>all the love, and all the moments.',
    body: '“If life were a movie, I would still choose the chapters that have you in them.”<br><br><strong>Chintu, can you please unblock me on Instagram... just for one day? 🥺❤️</strong><br><br><small>No pressure, no expectations. Just one little birthday wish from me.</small>',
    signature: 'Forever yours,<br>Shreyanth ❤️',
    final: true
  }
];

const story = document.querySelector('#story');
const photo = document.querySelector('#storyPhoto');
const copy = document.querySelector('#storyCopy');
const sceneNumber = document.querySelector('#sceneNumber');
const progress = document.querySelector('#progress');
const tapHint = document.querySelector('#tapHint');
const soundButton = document.querySelector('#soundButton');
const nextButton = document.querySelector('#nextButton');
const musicToggle = document.querySelector('#musicToggle');
const finalActions = document.querySelector('#finalActions');
const replayButton = document.querySelector('#replayButton');
const heartsButton = document.querySelector('#heartsButton');
const heartBurst = document.querySelector('#heartBurst');
let currentScene = 0;
let transitioning = false;

if (progress) {
  scenes.forEach((_, index) => {
    const marker = document.createElement('span');
    marker.className = index === 0 ? 'active' : '';
    progress.appendChild(marker);
  });
}

function renderScene(index) {
  const scene = scenes[index];
  if (!photo) return;

  story.classList.toggle('is-final', Boolean(scene.final));
  photo.classList.add('is-changing');
  window.setTimeout(() => {
    photo.style.backgroundImage = `url("${scene.image}")`;
    if (copy) {
      copy.innerHTML = `<p class="kicker">${scene.kicker}</p><h1>${scene.title}</h1><p class="lead">${scene.lead}</p>${scene.action ? `<button class="scene-action" type="button">${scene.action}</button>` : ''}<p class="body-copy">${scene.body}</p>${scene.signature ? `<p class="signature">${scene.signature}</p>` : ''}`;
    }
    if (sceneNumber) sceneNumber.textContent = `${String(index + 1).padStart(2, '0')} / 10`;
    if (progress) {
      [...progress.children].forEach((marker, markerIndex) => marker.classList.toggle('active', markerIndex === index));
    }
    if (finalActions) {
      const shouldShowFinalActions = Boolean(scene.final);
      finalActions.hidden = !shouldShowFinalActions;
      finalActions.style.display = shouldShowFinalActions ? 'flex' : 'none';
    }
    if (nextButton) nextButton.hidden = scene.final;
    if (copy) {
      copy.style.animation = 'none';
      copy.offsetHeight;
      copy.style.animation = '';
    }
    photo.classList.remove('is-changing');
    transitioning = false;
  }, 200);
}

function nextScene() {
  if (transitioning) return;
  if (currentScene >= scenes.length - 1) {
    return;
  }
  currentScene += 1;
  transitioning = true;
  if (tapHint) tapHint.textContent = currentScene === scenes.length - 1 ? 'Tap the arrow to start again' : 'Tap the arrow to continue';
  renderScene(currentScene);
}

story.addEventListener('click', (event) => {
  if (event.target.closest('button')) return;
  if (currentScene >= scenes.length - 1) return;
  nextScene();
});

if (replayButton) replayButton.addEventListener('click', () => { currentScene = 0; if (tapHint) tapHint.textContent = 'Tap the arrow to continue'; transitioning = true; renderScene(currentScene); });
if (heartsButton) heartsButton.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  window.location.href = 'video.html';
});
if (soundButton) soundButton.addEventListener('click', (event) => {
  event.stopPropagation();
  soundButton.textContent = soundButton.textContent === '♪' ? '×' : '♪';
});
if (musicToggle) musicToggle.addEventListener('click', (event) => {
  event.stopPropagation();
  musicToggle.textContent = musicToggle.textContent === 'Ⅱ' ? '▶' : 'Ⅱ';
});
if (nextButton) nextButton.addEventListener('click', nextScene);
renderScene(currentScene);
