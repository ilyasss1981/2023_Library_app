import $ from '../core';

$.prototype.animateOverTime = function(dur, cb, fin) {
    let timeStart;

    function _animateOverTime(time) {
        if (!timeStart) {
            timeStart = time;
        }

        let timeElapsed = time - timeStart;
        let complection = Math.min(timeElapsed / dur, 1);

        cb(complection);

        if (timeElapsed < dur) {
            requestAnimationFrame(_animateOverTime);
        } else {
            if (typeof fin === 'function') {
                fin();
            }
        }
    };

    return _animateOverTime;
};

$.prototype.fadeIn = function(dur, display, fin) {
    for (let i = 0; i <this.length; i++) {
        this[i].style.display = display || 'block';

        const _fadeIn = (complection) => {
            this[i].style.opacity = complection;
        };

        const ani = this.animateOverTime(dur, _fadeIn, fin);
        requestAnimationFrame(ani);
    }

    return this;
};

$.prototype.fadeOut = function(dur, fin) {
    for (let i = 0; i <this.length; i++) {
        const _fadeOut = (complection) => {
            this[i].style.opacity = 1 - complection;
            if (complection === 1) {
                this[i].style.display = 'none';
            }
        };

        const ani = this.animateOverTime(dur, _fadeOut, fin);
        requestAnimationFrame(ani);
    }

    return this;
}

$.prototype.fadeToggle = function(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        if (window.getComputedStyle(this[i]).display === 'none') {
            $(this[i]).fadeIn(dur,display, fin)
        } else {
            $(this[i]).fadeOut(dur, fin);
        }
    }

    return this;
}

// $.prototype.fadeToggle = function(dur, display, fin) {
//     for (let i = 0; i < this.length; i++) {
//         if (window.getComputedStyle(this[i]).display === 'none') {
//             this[i].style.display = display || 'block';

//             const _fadeIn = (complection) => {
//                 this[i].style.opacity = complection;
//             };

//             const ani = this.animateOverTime(dur, _fadeIn, fin);
//             requestAnimationFrame(ani);
//         } else {
//             const _fadeOut = (complection) => {
//                 this[i].style.opacity = 1 - complection;
//                 if (complection === 1) {
//                     this[i].style.display = 'none';
//                 }
//             };

//             const ani = this.animateOverTime(dur, _fadeOut, fin);
//             requestAnimationFrame(ani);
//         }
//     }

//     return this;
// }

// Оптимизированный вариант fadeIn, fadeOut, fadeToggle
// $.prototype.fade = function(anim, dur, display, fin) {
//     if (anim == 'fadeIn') {
//         for (let i = 0; i <this.length; i++) {
//             this[i].style.display = display || 'block';

//             const _fadeIn = (complection) => {
//                 this[i].style.opacity = complection;
//             };

//             const ani = this.animateOverTime(dur, _fadeIn, fin);
//             requestAnimationFrame(ani);
//         }

//         return this;
//     } else {
//         for (let i = 0; i <this.length; i++) {
//             const _fadeOut = (complection) => {
//                 this[i].style.opacity = 1 - complection;
//                 if (complection === 1) {
//                     this[i].style.display = 'none';
//                 }
//             };

//             const ani = this.animateOverTime(dur, _fadeOut, fin);
//             requestAnimationFrame(ani);
//         }

//         return this;
//     }
// }

// $.prototype.fadeIn = function(dur, display, fin) {
//     this.fade('fadeIn', dur, display, fin);
// }

// $.prototype.fadeOut = function(dur, fin) {
//     this.fade('fadeOut', dur, fin);
// }

// $.prototype.fadeToggle = function(dur, display, fin) {
//     for (let i = 0; i < this.length; i++) {
//         if (window.getComputedStyle(this[i]).display === 'none') {
//             $(this[i]).fade('fadeIn', dur, display, fin)
//         } else {
//             $(this[i]).fade('fadeOut', dur, fin);
//         }
//     }

//     return this;
// }
