function loadNav(){
  fetch('nav.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('nav-placeholder').innerHTML = html;
      const script=document.createElement('script');
      script.src='time-tracker.js';
      document.body.appendChild(script);
    });
}
window.addEventListener('DOMContentLoaded', loadNav);
