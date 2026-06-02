const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const counter = document.getElementById('slide-counter');
const progress = document.getElementById('progress');
let cur = 0, total = slides.length;

function goTo(n) {
    slides[cur].classList.remove('active');
    slides[cur].classList.add('exit');
    setTimeout(() => slides[cur].classList.remove('exit'), 600);
    dots[cur].classList.remove('active');
    cur = (n + total) % total;
    slides[cur].classList.add('active');
    dots[cur].classList.add('active');
    counter.textContent = (cur + 1) + ' / ' + total;
    progress.style.width = ((cur + 1) / total * 100) + '%';
}
function next() { goTo(cur + 1) }
function prev() { goTo(cur - 1) }

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') next();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
});

// Touch swipe
let tx = 0;
document.addEventListener('touchstart', e => tx = e.touches[0].clientX);
document.addEventListener('touchend', e => {
    const dx = tx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) { dx > 0 ? next() : prev() }
});

// Init progress
progress.style.width = (1 / total * 100) + '%';
