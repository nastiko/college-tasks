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
                // make nav sticky
                $(".nav-scroll").addClass("scroll-sticky");
                // swap nav bar color
                $(".nav-web").addClass("nav-sticky");
                // swap logo text background
                $(".logo img:eq(0)").removeClass("visible");
                $(".logo img:eq(1)").addClass("visible");
            } else {
                // remove sticky nav bar
                $(".nav-scroll").removeClass("scroll-sticky");
                // remove sticky from nav
                $(".nav-web").removeClass("nav-sticky");
                // swap logo to black text
                $(".logo img:eq(0)").addClass("visible");
                $(".logo img:eq(1)").removeClass("visible");
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