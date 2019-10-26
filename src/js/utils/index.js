
//math
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;
const lerp = (a, b, n) => (1 - n) * a + n * b;
const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);



//scroll
// scroll position update function
const getPageYScroll = () =>
  window.pageYOffset || document.documentElement.scrollTop;


export {
    map,
    lerp,
    getRandomFloat,
    getPageYScroll
}