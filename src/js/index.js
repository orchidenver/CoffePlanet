import $ from 'jquery';
import 'slick-carousel';

$('.slider__slides').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: '.button-left',
    nextArrow: '.button-right',

});