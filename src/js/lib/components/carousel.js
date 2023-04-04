import $ from '../core';

$.prototype.carousel = function() {
    for (let i = 0; i < this.length; i++) {
        const width = +window.getComputedStyle(this[i].querySelector('.carousel-inner')).width.replace(/\D/g, '');
        const slides = this[i].querySelectorAll('.carousel-item');
        const slideFields = this[i].querySelector('.carousel-slides');
        const dots = this[i].querySelectorAll('.carousel-indicators li');

        slideFields.style.width = 100 * slides.length + '%';
        slides.forEach(slide => {
            slide.style.width = width +'px';
        });

        let offset = 0;
        let slideIndex = 0;

        function showSlide(a) {
            offset = a > width * (slides.length - 1) ? 0 :
                a < 0 ? width * (slides.length - 1) : a;

            slideFields.style.transform = `translateX(-${offset}px)`;

            slideIndex = offset / width;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        }

        let timeInterval = setInterval(() => {
            showSlide(offset += width);
        }, 1000);

        this[i].addEventListener('mouseenter', () => {
            clearInterval(timeInterval);
        });
        this[i].addEventListener('mouseleave', () => {
            timeInterval = setInterval(() => {
                showSlide(offset += width);
            }, 1000);
        })

        $(this[i].querySelector('[data-slide="next"]')).click((e) => {
            e.preventDefault();
            showSlide(offset += width);
        })

        $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
            e.preventDefault();
            showSlide(offset -= width);
        })

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');
                offset = width * slideTo;
                showSlide(offset);
            });
        });
    }
}

$('.carousel').carousel();

$.prototype.createCarousel = function(images = []) {
    for (let i = 0; i < this.length; i++) {
        const slider = document.createElement('div');
        slider.classList.add('carousel');
        slider.innerHTML = `
        <ol class="carousel-indicators">

        </ol>
        <div class="carousel-inner">
            <div class="carousel-slides">

            </div>
        </div>
        <a href="#" class="carousel-prev" data-slide="prev">
            <span class="carousel-prev-icon">&lt;</span>
        </a>
        <a href="#" class="carousel-next" data-slide="next">
            <span class="carousel-prev-icon">&gt;</span>
        </a>
        `
        const dots = [],
              slides = [];
        images.forEach(({url, alt}, k) => {
            const dot = document.createElement('li'),
                  slide = document.createElement('div'),
                  img = document.createElement('img');

            dot.setAttribute('data-slide-to', k);
            dots.push(dot);

            slide.classList.add('carousel-item');
            img.setAttribute('src', url);
            img.setAttribute('alt', alt);
            slide.append(img);
            slides.push(slide);
        })

        slider.querySelector('.carousel-indicators').append(...dots);
        slider.querySelector('.carousel-slides').append(...slides);
        document.querySelector('.container').appendChild(slider);
        $(slider).carousel();
    }
}