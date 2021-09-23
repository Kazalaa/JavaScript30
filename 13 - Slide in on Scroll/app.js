// Function debounce created to avoid the call of checkSlide every time user scroll, it's better for performances //
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
  // console.log(window.scrollY);
  sliderImages.forEach(sliderImage => {
    // window scroll Y give the position from the top of the page where the user scroll inpx, we add window inner height, that give the height of the screen. The goal is to have the position of the scroll at the bottom of the screen.
    // We want that the animation start after that the middle of image appear
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    // sliderImage.offsetTop give the position from the top of the image to the top of the page, we add te height to have th position from the bottom of the image.
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
