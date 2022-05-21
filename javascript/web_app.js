class Menu {
    makeSticky() {
        let menuSelf = this;
        this.initSticky();
        $(window).scroll(function () {
            menuSelf.initSticky();
        });
    }

    initSticky() {
        if ($(document).scrollTop() > 50) {
            // make sticky nav bar
            $(".nav-scroll").addClass("scroll-sticky");
            //icons from Bootstrap
            $(".basket-icon").addClass("text-black");
            // swap nav bar color
            $(".nav-hided").addClass("nav-sticky");
            // swap logo text background
            $(".logo img:eq(0)").removeClass("visible");
            $(".logo img:eq(1)").addClass("visible");
        } else {
            // remove sticky nav bar
            $(".nav-scroll").removeClass("scroll-sticky");
            //icons from Bootstrap
            $(".basket-icon").removeClass("text-black");
            // remove sticky from nav
            $(".nav-hided").removeClass("nav-sticky");
            // remove logo text background
            $(".logo img:eq(0)").addClass("visible");
            $(".logo img:eq(1)").removeClass("visible");
        }
    }
}

class Calendar {
    initNext() {
        $('.button-next .next').click(function () {
            let elNow  = $('.form-block.show');
            let elNext = elNow.next();
            if (elNext && elNext.length) {
                elNow.removeClass("show");
                elNext.addClass("show");
            }
        });
    }

    initPrev() {
        $('.button-next .prev').click(function () {
            let elNow  = $('.form-block.show');
            let elPrev = elNow.prev();
            if (elPrev && elPrev.length) {
                elNow.removeClass('show');
                elPrev.addClass('show');
            }
        });
    }
}

class AddItem {
    clickButton() {
        $('.show-button').click(function () {

        })
    }
}

class MobileMenu {
    slideLeft() {
        $('.basket-link').on('click', function () {
            $("#mySidenav").animate({
                width: '100%'
            }, "fast");
        });
    }

    slideRight() {
        $('.icon-x').on('click', function () {
            $("#mySidenav").animate({
                width: '0%'
            }, "fast");
        });
    }
}

class Slider {
    animationDuration = 1000;

    getVisibleCount() {
        let cntVisible = 0;
        for (let i = 0; i < slides.length; i++) {
            let isVisible = this.isInViewport($(slides[i]));
            if (isVisible) {
                cntVisible++;
            }
        }
        return cntVisible;
    }

    isInViewport(element) {
        let positionViewportRight = sliderViewport.outerWidth(true);

        if (element.position().left < 0) {
            return false;
        }

        if (element.position().left >= positionViewportRight) {
            return false;
        }

        return true;
    }

    slideRight() {
        let sliderSelf = this;
        $('.slider-icon-next').click(function () {
            let totalElements = Math.abs(currPosition) + sliderSelf.getVisibleCount() * slideWidth;
            if (totalElements < slideMaxWidth) {
                currPosition -= slideWidth;
                $('#slider-content').animate({x: currPosition}, {
                    duration: sliderSelf.animationDuration,
                    step: function (val) {
                        $('#slider-content').css("transform", `translateX(${val}px)`);
                    }
                });
            }
        });
    }

    slideLeft() {
        let sliderSelf = this;
        $('.slider-icon-prev').click(function () {
            if (currPosition !== 0) {
                currPosition += slideWidth;
                $('#slider-content').animate({x: currPosition}, {
                    duration: sliderSelf.animationDuration,
                    step: function (val) {
                        $('#slider-content').css("transform", `translateX(${val}px)`);
                    }
                });
            }
        });
    }

    initSlider(slidesVisible, animationDuration) {
        this.animationDuration = animationDuration;

        let slidesCount = Math.floor(($(window).width() - (slideWidth * 2)) / slideWidth);
        let sliderWidth = (slidesCount <= 0 ? 1 : slidesCount) * slideWidth;

        let sliderContentWidth = slides.length * slideWidth + 200;

        sliderBlock.css("width", sliderWidth);
        sliderContent.css("width", sliderContentWidth);
    }
}


//configuration
let slides         = $('#slider-content .slide');
let slideWidth     = slides.outerWidth(true);
let slideMaxWidth  = slideWidth * slides.length;
let sliderViewport = $('.slider-viewport');
let sliderBlock    = $('.slick-slider');
let sliderContent  = $('#slider-content');
let currPosition   = 0;