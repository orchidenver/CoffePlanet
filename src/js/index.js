import $ from 'jquery';
import 'slick-carousel';
import * as FocusTrap from 'focus-trap';

$('.slider__slides').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: '.button-left',
    nextArrow: '.button-right',
});

let btnMobile = document.querySelector('.btn-mobile');
let headerNav = document.querySelector('.main-header__nav');
let mobileMenuTrap = FocusTrap.createFocusTrap('.main-header__nav');

function mobileMenuOpen() {
    btnMobile.classList.add('is-open');
    headerNav.classList.add('is-open');
    document.body.classList.add('ov-h');
    headerNav.querySelector('a').focus()
    mobileMenuTrap.activate();
}
function mobileMenuClose() {
    mobileMenuTrap.deactivate();
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

let modalBtns = document.querySelectorAll('.btn-modal');
let modalOverlay = document.querySelector('.modal-overlay');
let modalModals = document.querySelectorAll('.modal');
let modalCloser = document.querySelector('.modal-overlay__close');
let modalTrap = FocusTrap.createFocusTrap(modalOverlay, {
    initialFocus: '.modal.active'
})

function modalOpen(e) {
    e.preventDefault();
    let anchor = e.target.getAttribute('data-href');
    let goal = document.querySelector(anchor);

    modalOverlay.classList.add('active');
    modalOverlay.classList.add('animate__animated');
    goal.classList.add('active');
    goal.classList.add('animate__animated');
    goal.setAttribute('tabindex', 0);
    document.body.classList.add('ov-h');
    modalTrap.activate();
};

function modalClose() {
    let actives = document.querySelectorAll('.modal-overlay.active, .modal.active');
    actives.forEach(active => {
        active.classList.remove('active');
        active.classList.remove('animate__animated');
        active.removeAttribute('tabindex', 0)
    });
    modalTrap.deactivate();
    document.body.classList.remove('ov-h');
};

modalBtns.forEach(modalBtn => {
    modalBtn.addEventListener('click', modalOpen);
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

let tabLinks = document.querySelectorAll('.tabs__link');
function tabsToggle(e) {
    e.preventDefault();
    let anchor = e.target.getAttribute('href');
    let goal = document.querySelector(anchor);

    let actives = document.querySelectorAll('.tabs__item.active, .tabs-content__section.active');
    actives.forEach(active => {
        active.classList.remove('active');
        active.removeAttribute('tabindex')
    });
    e.target.parentElement.classList.add('active');
    goal.classList.add('active');
    goal.setAttribute('tabindex', 0)
    goal.focus();
}

tabLinks.forEach(tabLink => {
    tabLink.addEventListener('click', tabsToggle);
});

let header = document.querySelector('.main-header');
function stickyHeader() {
    if (window.scrollY > 300) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function throttle(func, time) {
    let isThrottled = false;
    return function () {
        if (isThrottled) return;
        let ctx = this;
        let args = arguments;
        func.apply(ctx, args);
        isThrottled = true;
        setTimeout(() => {
            isThrottled = false;
        }, time)
    }
}

window.addEventListener('scroll', throttle(stickyHeader, 300));

let visitorsBoard = document.querySelector('.visitors__board')

$('.visitors__board').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: '.arrow.left',
    nextArrow: '.arrow.right',
    slidesToShow: 1,
    mobileFirst: true,
    responsive: [
        {
            breakpoint: 768,
            settings: 'unslick'
        }
    ]
});

/*function reSize() {
    if (window.innerWidth < 750) {
        visitorsBoard.classList.add('mobile')
    }
    else {
        visitorsBoard.classList.remove('mobile')
    }
}

window.addEventListener('resize', throttle(reSize, 300));*/
