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

$(document).ready(function () {
    $('.nav-buttons .next').click(function () {
        let elNow = $('.form-block.show');
        let elNext = elNow.next();
        if (elNext && elNext.length) {
            elNow.removeClass("show");
            elNext.addClass("show");
        }
    });
    $('.nav-buttons .prev').click(function () {
        let elNow = $('.form-block.show');
        let elPrev = elNow.prev();
        if (elPrev && elPrev.length) {
            elNow.removeClass('show');
            elPrev.addClass('show');
        }
    });

});


