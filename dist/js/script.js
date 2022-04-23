// Navbar Fixed
window.onscroll = () => {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const buttonToTop = document.querySelector("#button-to-top");

  if(window.pageYOffset > fixedNav){
    header.classList.add("navbar-fixed");
    buttonToTop.classList.remove('hidden');
    buttonToTop.classList.add('flex');
  }else{
    header.classList.remove("navbar-fixed");
    buttonToTop.classList.remove('flex');
    buttonToTop.classList.add('hidden');
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

window.addEventListener("click", (e) => {
  if(e.target != hamburger && e.target != navMenu){
    hamburger.classList.remove('hamburger-active');
    navMenu.classList.add('hidden');
  }
})

// Dark Mode Toggle
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darkToggle.addEventListener("click", () => {
  if(darkToggle.checked){
    html.classList.add('dark');
    localStorage.theme = 'dark';
  }else{
    html.classList.remove('dark');
    localStorage.theme = 'light';
  }
})

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}
