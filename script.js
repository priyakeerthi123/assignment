// Hamburger Menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('show');
});

// Product Gallery Logic
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumb');

thumbnails.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    mainImage.src = thumb.src;
  });
});

// Add to Cart Link Update
const fragranceRadios = document.getElementsByName('fragrance');
const subscriptionRadios = document.getElementsByName('subscription');
const addToCart = document.getElementById('addToCart');

function updateAddToCart() {
  let fragrance = '';
  let subscription = '';

  fragranceRadios.for
