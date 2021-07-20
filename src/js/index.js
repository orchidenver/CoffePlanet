import $ from 'jquery';
import 'slick-carousel';

$('.slider__slides').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: '.button-left',
    nextArrow: '.button-right',
});

let btnMobile = document.querySelector('.btn-mobile');
let headerNav = document.querySelector('.main-header__nav');
function mobileMenuOpen() {
    btnMobile.classList.add('is-open');
    headerNav.classList.add('is-open');
    document.body.classList.add('ov-h');
}
function mobileMenuClose() {
    btnMobile.classList.remove('is-open');
    headerNav.classList.remove('is-open');
    document.body.classList.remove('ov-h');
}
btnMobile.addEventListener('click', () => {
    if (btnMobile.classList.contains('is-open')) {
        mobileMenuClose();
    } else {
        mobileMenuOpen();
    }
});

headerNav.addEventListener('click', e => {
    if (headerNav.classList.contains('is-open')) {
        mobileMenuClose();
    }
})

let modalBtns = document.querySelector('.btn-modal');
let modalOverlay = document.querySelector('.modal-overlay');
let modalModals = document.querySelector('.modal');
let modalCloser = document.querySelector('modal-overlay__close');

function modalOpen(e) {
    e.preventDefault();
    let anchor = e.target.getAttribute('data-href');
    let goal = document.querySelector(anchor);

    modalOverlay.classList.add('active');
    modalOverlay.classList.add('animate__animated');
    goal.classList.add('active');
    goal.classList.add('animate__animated');
    document.body.classList.add('ov-h');
};

function modalClose(e) {
    let actives = document.querySelectorAll('.modal-overlay.active, .modal.active');
    actives.forEach(active => {
        active.classList.remove('active');
        active.classList.remove('animate__animated');
    });
    document.body.classList.remove('ov-h');
};

modalBtns.forEach(modalBtns => {
    modalBtns.addEventListener('click', modalOpen);
});

modalCloser.addEventListener('click', modalClose);
modalModals.forEach(modal => {
    modal.addEventListener('click', e => {
        e.stopPropagation();
    });
});
modalOverlay.addEventListener('click', modalClose);

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        modalClose();
        mobileMenuClose();
    }
});