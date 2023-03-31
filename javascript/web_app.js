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
    initMonth = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
    ];

    #days;
    #month;
    #year;
    #leftArrow;
    #rightArrow;

    #date = new Date();
    #selectedDate = {};

    constructor(daysId, dayMonthId, yearId, leftArrow, rightArrow) {
        this.#days = document.getElementById(daysId);
        this.#month = document.getElementById(dayMonthId);
        this.#year = document.getElementById(yearId);
        this.#leftArrow = document.getElementById(leftArrow);
        this.#rightArrow = document.getElementById(rightArrow);
    }

    getDays() {
        let days = '';

        for (let k = this.getFirstDayIndex(); k > 0; k--) {
            days += `<div class="prev-date">${this.getPrevDays() - k + 1}</div>`;
        }

        for (let i = 1; i <= this.getLastDay(); i++) {
            let elClass = '';

            // check if current date is currently rendering element
            if (i === new Date().getDate() && this.#date.getMonth() === new Date().getMonth()) {
                elClass = "today";
            }

            // check if saved date is currently rendered element
            if (i === this.#selectedDate.day && this.#date.getMonth() === this.#selectedDate.month) {
                elClass += " clicked";
            }

            days += `<div class="${elClass}" data-month="${this.#date.getMonth()}" data-day="${i}" data-year="${this.#date.getFullYear()}">${i}</div>`;
        }

        for (let j = 1; j <= this.getNextDays(); j++) {
            days += `<div class="next-date">${j}</div>`;
            this.#days.innerHTML = days;
        }
    }

    getLastDay() {
        return new Date(this.#date.getFullYear(), this.#date.getMonth() + 1, 0).getDate();
    }

    getPrevDays() {
        return new Date(this.#date.getFullYear(), this.#date.getMonth(), 0).getDate();
    }

    getNextDays() {
        return 7 - this.getLastDayIndex();
    }

    // get index of the first day of the month
    getFirstDayIndex() {
        return new Date(this.#date.getFullYear(), this.#date.getMonth(), 0).getDay();
    }

    getLastDayIndex() {
        return new Date(this.#date.getFullYear(), this.#date.getMonth() + 1, 0).getDay();
    }

    getDayMonth() {
        this.#month.innerHTML = `${(this.initMonth[this.#date.getMonth()]).toUpperCase()}`;
    }

    getYear() {
        this.#year.innerHTML = `${this.#date.getFullYear()}`;
    }

    getPrevMonth() {
        this.#date.setMonth(this.#date.getMonth() - 1);
        this.update();
    }

    getNextMonth() {
        this.#date.setMonth(this.#date.getMonth() + 1);
        this.update();
    }

    addClickAction() {
        let cells = document.querySelectorAll('#days div:not(.prev-date,.next-date)');
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', (event) => this.clickHandler(event));
        }
    }

    clickHandler(event) {
        // visually mark element as clicked
        document.querySelectorAll('#days div.clicked').forEach((el) => {
            el.classList.remove('clicked');
        });
        event.target.classList.add('clicked');

        // save selected date
        this.#selectedDate.day = parseInt(event.target.dataset.day);
        this.#selectedDate.month = parseInt(event.target.dataset.month);
        this.#selectedDate.year = parseInt(event.target.dataset.year);
    }

    init() {
        this.#leftArrow.addEventListener('click', () => this.getPrevMonth());
        this.#rightArrow.addEventListener('click', () => this.getNextMonth());

        this.update();
    }

    update() {
        this.getDays();
        this.getLastDay();
        this.getDayMonth();
        this.getYear();
        this.addClickAction();
    }
}

let calendar = new Calendar('days', 'day-month', 'year', 'left-arrow', 'right-arrow');
calendar.init();

// class SelectTimeGuest {
//
//     /*#time;
//
//     constructor(time) {
//         this.#time = time;
//     }*/
//
//     selectTime(event) {
//         document.querySelectorAll('#select-time tr .clicked').forEach((el) => {
//             el.classList.remove('clicked');
//         });
//         event.target.classList.add('clicked');
//     }
//
//     clickAction() {
//         let cells = document.querySelectorAll('#select-time tr');
//         for (let i = 0; i < cells.length; i++) {
//             cells[i].addEventListener('click', (event) => this.selectTime(event));
//         }
//     }
// }
//
// let timeGuest = new SelectTimeGuest();
// timeGuest.clickAction();


class Form {

    #fullName;
    #email;
    #phone;
    #message;
    #checkbox;

    #form;
    #validationResult = true;

    constructor(fullName, email, phone, message, checkbox) {
        this.#fullName = fullName;
        this.#email = email;
        this.#phone = phone;
        this.#message = message;
        this.#checkbox = checkbox;
    }

    getFullNameValue(){
        return this.#fullName.value.trim();
    }

    getEmailValue() {
        return this.#email.value.trim();
    }

    getPhoneValue() {
        return this.#phone.value.trim();
    }

    getMessageValue() {
        return this.#message.value.trim();
    }

    /*getCheckboxValue() {
        return this.#checkbox = true;
    }*/

    setError(elem, message) {
        let inputControl = elem.parentElement;
        let errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerHTML = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');

        this.#validationResult = false;
    }

    setSuccess(elem) {
        let inputControl = elem.parentElement;
        let errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerHTML = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }

    isValidEmail(email) {
        return this.#email.value.toLowerCase().match(
                /^[^]+\@[a-zA-z]+\.[a-zA-Z]{2,4}$/);
    }

    isValidPhone(phone) {
        return this.#phone.value.match(/^[\d,\s,\+,\-]{5,20}/);
    }

    validationInput() {

        if (this.getFullNameValue() === '') {
            this.setError(this.#fullName, 'Name is required');
        } else {
            this.setSuccess(this.#fullName);
        }

        if (this.getEmailValue() === '') {
            this.setError(this.#email, 'Email is required');
        } else if (!this.isValidEmail(this.#email)) {
            this.setError(this.#email, 'Provide a valid email address');
        } else {
            this.setSuccess(this.#email);
        }

        if (this.getPhoneValue() === '') {
            this.setError(this.#phone, 'Phone is required');
        } else if (!this.isValidPhone(this.#phone)) {
            this.setError(this.#phone, 'Provide a valid phone number');
        } else {
            this.setSuccess(this.#phone);
        }

        if (this.getMessageValue() === '') {
            this.setError(this.#message, 'Message is required');
        } else {
            this.setSuccess(this.#message);
        }

        if (!this.#checkbox.checked) {
            this.setError(this.#checkbox, 'By clicking here, you agree to our policy');
        } else {
            this.setSuccess(this.#checkbox);
        }

        return this.#validationResult;
    }

    handleSubmit() {
        //validate? true / false
        if(!validateForm.validationInput()){
            return;
        }

        //let blockSubmit =  this.#form.querySelector('button.submit');
        let status = document.createElement('div');
        status.id = 'form-status';
        status.classList.add('submit-style');
        this.#form.appendChild(status);

        let data = new FormData(this.#form);
        fetch(this.#form.action, {
            method: this.#form.method,
            body: data
        }).then(response => {
            if (response.ok) {
                status.innerHTML = 'Thanks for your submission!';
                this.#form.reset();
            } else {
                status.innerHTML = 'Oops! There was a problem submitting your form';
            }
        }).catch(error => {
            status.innerHTML = 'Oops! There was a problem submitting your form';
        });
    }

    init(fullNameId, emailId, phoneId, messageId, checkboxId, formId) {
        this.#fullName = document.getElementById(fullNameId);
        this.#email = document.getElementById(emailId);
        this.#phone = document.getElementById(phoneId);
        this.#message = document.getElementById(messageId);
        this.#checkbox = document.getElementById(checkboxId);
        this.#form = document.querySelector(formId);

        this.#form.querySelector('button.submit').addEventListener('click', () => this.handleSubmit());
    }
}

let validateForm = new Form();

validateForm.init('fullName', 'email', 'phone', 'message', 'checkbox', '#form-submit');


class NextPrevBtn {
    initNext() {
        $('.button-next .next').click(function () {
            let elNow = $('.form-block.show');
            let elNext = elNow.next();
            if (elNext && elNext.length) {
                elNow.removeClass("show");
                elNext.addClass("show");
            }
        });
    }

    initPrev() {
        $('.button-next .prev').click(function () {
            let elNow = $('.form-block.show');
            let elPrev = elNow.prev();
            if (elPrev && elPrev.length) {
                elNow.removeClass('show');
                elPrev.addClass('show');
            }
        });
    }
}

class Menu {
    initOpen() {
        $('.desktop-basket_link, .basket-link').on('click', function () {
            let width = $(window).width() >= 475 ? '400px' : '100%';
            $("#miniCart").animate({
                width: `${width}`
            }, 10);
            $('#miniCart').css('box-shadow', '-5px 0px 5px 2px rgb(0 0 0 / 42%)');
        });
    }

    initClose() {
        $('.icon-x').on('click', function () {
            $("#miniCart").animate({
                width: '0%'
            }, 10);
            $('#miniCart').css('box-shadow', '');
        });
    }

    initialize() {
        this.initOpen();
        this.initClose();
    }
}

class Slider {
    slides = $('#slider-content .slide');
    slideWidth = this.slides.outerWidth(true);
    slideMaxWidth = this.slideWidth * this.slides.length;
    sliderViewport = $('.slider-viewport');
    sliderBlock = $('.slick-slider');
    sliderContent = $('#slider-content');
    currPosition = 0;
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