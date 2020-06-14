window.addEventListener('load', () => {
 document.querySelector('.navbar-toggle').addEventListener('click', () => {
  if (document.querySelector('#main-nav').style.display == "") {
   document.querySelector('#main-nav').style.display = "block";
  } else {
   document.querySelector('#main-nav').style.display = "";
  }
 })
})

