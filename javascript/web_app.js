class Header {
    initSticky() {
        let menuSelf = this;
        this.makeSticky();
        $(window).scroll(function () {
            menuSelf.makeSticky();
        });
    }

    makeSticky() {
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

class Menu {
    open() {
        $('.desktop-basket_link, .basket-link').on('click', function () {
            let width = $(window).width() >= 475 ? '325px' : '100%';
            $("#mySidenav").animate({
                width: `${width}`
            }, "fast");
            $('#mySidenav').css('box-shadow', '-5px 0px 5px 2px rgb(0 0 0 / 42%)');
        });
    }

    close() {
        $('.icon-x').on('click', function () {
            $("#mySidenav").animate({
                width: '0%'
            }, "fast");
            $('#mySidenav').css('box-shadow', '');
        });
    }

    initialize() {
        this.open();
        this.close();
    }
}

class Slider {
    slides            = $('#slider-content .slide');
    slideWidth        = this.slides.outerWidth(true);
    slideMaxWidth     = this.slideWidth * this.slides.length;
    sliderViewport    = $('.slider-viewport');
    sliderBlock       = $('.slick-slider');
    sliderContent     = $('#slider-content');
    currPosition      = 0;
    animationDuration = 1000;

    getVisibleCount() {
        let cntVisible = 0;
        for (let i = 0; i < this.slides.length; i++) {
            let isVisible = this.isInViewport($(this.slides[i]));
            if (isVisible) {
                cntVisible++;
            }
        }
        return cntVisible;
    }

    isInViewport(element) {
        let positionViewportRight = this.sliderViewport.outerWidth(true);

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
            let totalElements = Math.abs(sliderSelf.currPosition) + sliderSelf.getVisibleCount() * sliderSelf.slideWidth;
            if (totalElements < sliderSelf.slideMaxWidth) {
                sliderSelf.currPosition -= sliderSelf.slideWidth;
                $('#slider-content').animate({x: sliderSelf.currPosition}, {
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
            if (sliderSelf.currPosition !== 0) {
                sliderSelf.currPosition += sliderSelf.slideWidth;
                $('#slider-content').animate({x: sliderSelf.currPosition}, {
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

        let slidesCount = Math.floor(($(window).width() - (this.slideWidth * 2)) / this.slideWidth);
        let sliderWidth = (slidesCount <= 0 ? 1 : slidesCount) * this.slideWidth;

        let sliderContentWidth = this.slides.length * this.slideWidth + 200;

        this.sliderBlock.css("width", sliderWidth);
        this.sliderContent.css("width", sliderContentWidth);

        this.slideLeft();
        this.slideRight();
    }
}