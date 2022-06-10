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
    }
}

class MiniCart {
    stopPropagation() {
        $('ul.dropdown-menu.bg-menu').click(function (e) {
            e.stopPropagation();
        });
    }

    addItem() {
        $('.cart-plus').on('click', function () {
            let amountEl   = $(this).siblings('.amount-items');
            let productQty = parseInt(amountEl.html());

            productQty = productQty + 1;
            amountEl.html(`${productQty}`);
        });
    }

    removeItem() {
        $('.cart-minus').on('click', function () {
            let amountEl   = $(this).siblings('.amount-items');
            let productQty = parseInt(amountEl.html());

            productQty = productQty - 1;
            if (productQty <= 0) {
                $(this).parents('.position-item').next('.cart-item-divider').fadeOut(500);
                $(this).parents('.position-item').slideUp(500, function () {
                    $(this).next('.cart-item-divider').remove();
                    $(this).remove();
                });
            } else {
                amountEl.html(`${productQty}`);
            }
        });
    }
}