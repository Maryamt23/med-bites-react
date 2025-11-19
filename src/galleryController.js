export function initGallery() {
    const slidesContainer = document.querySelector(".slides");
    if (!slidesContainer) return () => {};
    const slides = Array.from(document.querySelectorAll(".slide"));
    let current = 0;
  
    function show(n) {
      if (slides.length === 0) return;
      current = (n + slides.length) % slides.length;
      const width = slides[0].clientWidth;
      slidesContainer.style.transform = `translateX(${-current * width}px)`;
    }
  
    function next() { show(current + 1); }
    function prev() { show(current - 1); }
  
    const onNext = () => next();
    const onPrev = () => prev();
  
    window.addEventListener('galleryNext', onNext);
    window.addEventListener('galleryPrev', onPrev);
  
    window.addEventListener("resize", () => show(current));
    const interval = setInterval(() => show(current + 1), 3000);
  
    setTimeout(() => show(0), 50);
  
    // cleanup function
    return () => {
      clearInterval(interval);
      window.removeEventListener('galleryNext', onNext);
      window.removeEventListener('galleryPrev', onPrev);
    };
  }
  