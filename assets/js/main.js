import { animate, stagger } from 'animejs';

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  animate('.js-reveal', {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 650,
    delay: stagger(90),
    easing: 'outCubic'
  });
} else {
  document.querySelectorAll('.js-reveal').forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}