
const btnDarkMode = document.querySelector(".dark-mode-btn");

// 1. Check Dark-Mode value user system settings
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ) {
    btnDarkMode.classList.add('dark-mode-btn--active');
    document.body.classList.add('dark');
} else {
    btnDarkMode.classList.remove('dark-mode-btn--active');
    document.body.classList.remove('dark');
}


// 2. Check Dark-Mode value localStorage
if (localStorage.getItem('darkMode') === 'dark') {
    btnDarkMode.classList.add('dark-mode-btn--active');
    document.body.classList.add('dark');
} else if (localStorage.getItem('darkMode') === 'light') {
    btnDarkMode.classList.remove('dark-mode-btn--active');
    document.body.classList.remove('dark');
}

// 3. Change Dark-Mode when change system settings without manual refresh
window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (event) => {
    const newColorScheme = event.matches ? 'dark' : 'light';

    if (newColorScheme === 'dark') {
        btnDarkMode.classList.add('dark-mode-btn--active');
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'dark');
    } else {
        btnDarkMode.classList.remove('dark-mode-btn--active');
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'light');

    }
})


// Switch Dark-Mode
btnDarkMode.onclick = function () {
    btnDarkMode.classList.toggle('dark-mode-btn--active');
    const isDark = document.body.classList.toggle('dark');

    if (isDark) {
        localStorage.setItem('darkMode', 'dark')
    } else {
        localStorage.setItem('darkMode', 'light')
    } 
}

// Mobile navbar keep selection
let selectedNavItem = null;

function selectNavItem(navItemNumber) {
  const navItem = document.getElementsByClassName("nav-list__link")[navItemNumber - 1];

  if (selectedNavItem) {
    selectedNavItem.classList.remove("selected");
  }

  navItem.classList.add("selected");
  selectedNavItem = navItem;
}


// Scroll Up Button
let mybutton = document.getElementById("TopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// Form Excel
const scriptURL = 'https://script.google.com/macros/s/AKfycbxync-ay4fwor_5y_736OcQIRyfHABBCSl51yD7mbTo7ce8B6fQbbnxayyTFgFzoY92/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("form__msg");

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        },4000)
        form.reset();
    })
    .catch(error => console.error('Error!', error.message))
})
