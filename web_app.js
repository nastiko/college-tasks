/*let currentStep = $('.form-block.show').index()+1;
$('.nav-buttons .next').click(function () {
    let elNow = $('.form-block.show');
    let elNext = elNow.next();
    if (elNext && elNext.length) {
        elNow.removeClass("show");
        elNext.addClass("show");
        $('.calendar-info strong').html(`${++currentStep}/3`);
    } else if (elNext && elNext.length) {
        elNow.removeClass("show");
        elNext.addClass("submit-form");

    }



    else {
        $(this).prop('submit');
    }
});*/

class Menu {
    makeSticky() {
        $(window).scroll(function () {
            if ($(document).scrollTop() > 50) {
                // make sticky nav bar
                $(".nav-scroll").addClass("scroll-sticky");
                // make nav sticky for phone devices
                $(".nav-app").addClass("scroll-sticky");
                // swap color for icons
                $(".menu").addClass("swap-color");
                /*$(".search-items").addClass("swap-color");*/
                //icons from Bootstrap
                $(".icons-scroll").addClass("text-black");
                // swap nav bar color
                $(".nav-hided").addClass("nav-sticky");
                // swap logo text background
                $(".logo img:eq(0)").removeClass("visible");
                $(".logo img:eq(1)").addClass("visible");
                // swap logo colors
                $(".nav-app .logo img:eq(0)").removeClass("visible");
                $(".nav-app .logo img:eq(1)").addClass("visible");
            } else {
                // remove sticky nav bar
                $(".nav-scroll").removeClass("scroll-sticky");
                // remove nav sticky for phone devices
                $(".nav-app").removeClass("scroll-sticky");
                // remove color for icons
                $(".menu").removeClass("swap-color");
                /*$(".search-items").removeClass("swap-color");*/
                //icons from Bootstrap
                $(".icons-scroll").removeClass("text-black");
                // remove sticky from nav
                $(".nav-hided").removeClass("nav-sticky");
                // remove logo text background
                $(".logo img:eq(0)").addClass("visible");
                $(".logo img:eq(1)").removeClass("visible");
                // remove logo colors
                $(".nav-app .logo img:eq(0)").addClass("visible");
                $(".nav-app .logo img:eq(1)").removeClass("visible");
            }
        });
    }
}

class Calendar {
    initNext() {
        $('.nav-buttons .next').click(function () {
            let elNow = $('.form-block.show');
            let elNext = elNow.next();
            if (elNext && elNext.length) {
                elNow.removeClass("show");
                elNext.addClass("show");
            }
        });
    }

    initPrev() {
        $('.nav-buttons .prev').click(function () {
            let elNow = $('.form-block.show');
            let elPrev = elNow.prev();
            if (elPrev && elPrev.length) {
                elNow.removeClass('show');
                elPrev.addClass('show');
            }
        });
    }
}

class ShowButton {
    hoverButton () {
        $('picture').hover(function () {
            $("button").toggle()
        })
    }
}