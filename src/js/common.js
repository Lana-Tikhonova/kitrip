document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        easing: 'ease-in-out',
        delay: 100,
        once: true,
        duration: 700,
        offset: window.innerWidth < 577 ? 0 : 100,
    });

    document.querySelector('.menu_btn').addEventListener('click', function () {
        this.classList.toggle('active');
        document.querySelector('.mobile_menu').classList.toggle('active');
    });

    document.querySelector('.arrow_mobile_bottom')?.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.getElementById('tours');
        if (target) {
            const top = target.getBoundingClientRect().top + window.pageYOffset - 20;

            window.scrollTo({
                top: top,
                behavior: 'smooth'
            })
        }
    });


    let parallaxInstances = [];

    function initParallax() {
        parallaxInstances.forEach(instance => instance.destroy());
        parallaxInstances = [];

        if (window.innerWidth > 768) {
            document.querySelectorAll('.parallax').forEach(element => {
                let instance = new Parallax(element);
                parallaxInstances.push(instance);
            });
        }
    }

    initParallax();

    window.addEventListener('resize', () => {
        initParallax();
    });


    // маска для телефона
    const phoneInputs = document.querySelectorAll('.form_input[type="tel"]');
    phoneInputs.forEach(input => {
        IMask(input, {
            mask: '+{7}(000)000-00-00'
        })
    })

    const swiperHead = new Swiper(".head_slider", {
        slidesPerView: 1,
        spaceBetween: 16,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    const swiperTeam = new Swiper(".team_list", {
        slidesPerView: 'auto',
        spaceBetween: 16,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        breakpoints: {
            992: {
                slidesPerView: 'auto',
                spaceBetween: 30,
            },
        },
    });

    const swiperWhy = new Swiper(".why_slider", {
        slidesPerView: 1,
        spaceBetween: 16,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        allowTouchMove: false,
        loop: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
    });

    const swiperFull = new Swiper(".full_slider", {
        slidesPerView: 1,
        spaceBetween: 16,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    document.querySelectorAll('.reviews_slider_wrapper').forEach((wrapper) => {
        const sliderEl = wrapper.querySelector('.reviews_slider');
        const nextBtn = wrapper.querySelector('.swiper-button-next');
        const prevBtn = wrapper.querySelector('.swiper-button-prev');

        new Swiper(sliderEl, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            watchSlidesProgress: true,
            mousewheelControl: true,
            watchOverflow: true,
            watchSlidesVisibility: true,
            speed: 1000,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn
            },
            breakpoints: {
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    });


    const allTabs = document.querySelectorAll(".tabs");

    allTabs.forEach(tabsContainer => {
        const buttons = tabsContainer.querySelectorAll(".tab_btn");
        const panes = tabsContainer.querySelectorAll(".tab_pane");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const targetTab = button.getAttribute("data-tab");

                buttons.forEach(btn => btn.classList.remove("active"));
                panes.forEach(pane => pane.classList.remove("active"));

                button.classList.add("active");

                const targetPane = tabsContainer.querySelector(`.tab_pane[data-tab-id="${targetTab}"]`);
                if (targetPane) {
                    targetPane.classList.add("active");
                } else {
                    console.warn(`Таб с data-tab-id="${targetTab}" не найден`);
                }
            });
        });
    });

    // смена темы
    const themeSwitches = document.querySelectorAll('.theme_switch');

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark_theme', isDark);
        localStorage.setItem('theme', theme);

        themeSwitches.forEach(switchEl => {
            switchEl.classList.toggle('active', isDark);
        });
    }

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        applyTheme('dark');
    } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    }

    themeSwitches.forEach(themeSwitch => {
        const darkToggle = themeSwitch.querySelector('.item.-dark');
        const lightToggle = themeSwitch.querySelector('.item.-light');

        if (darkToggle) {
            darkToggle.addEventListener('click', () => {
                applyTheme('dark');
            });
        }

        if (lightToggle) {
            lightToggle.addEventListener('click', () => {
                applyTheme('light');
            });
        }
    });

    tippy('.tippy_btn', {
        // allowHTML: true,
        // arrow: false,
        placement: 'bottom',
        maxWidth: '150px',
        animation: 'scale',
        interactive: true,
        duration: [400, 200],
        theme: 'consumable_theme',
    });

    let questions = document.querySelectorAll('.faq_item .question');
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const parent = question.parentElement;
            const answer = parent.querySelector('.answer');

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                parent.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                parent.classList.add('active');
            }
        });
    });

    document.addEventListener('click', function (event) {
        const button = event.target.closest('.selection_quantity .button');
        if (!button) return;

        const block = button.closest('.selection_quantity');
        const input = block.querySelector('.counter');

        let count = parseInt(input.getAttribute('data-count'), 10);
        const min = parseInt(input.getAttribute('min'), 10) || 0;

        if (button.classList.contains('down')) {
            count = Math.max(min, count - 1);
        } else if (button.classList.contains('up')) {
            count += 1;
        }

        input.value = count;
        input.setAttribute('data-count', count);
        input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    document.addEventListener('input', function (event) {
        if (event.target.matches('.selection_quantity .counter')) {
            const input = event.target;
            const value = parseInt(input.value, 10);
            const min = parseInt(input.getAttribute('min'), 10) || 0;

            const validValue = isNaN(value) ? min : Math.max(min, value);
            input.value = validValue;
            input.setAttribute('data-count', validValue);
            input.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });

    // валидация телефона
    $.validator.addMethod("phoneRU", function (value, element) {
        const digits = value.replace(/\D/g, '');
        return this.optional(element) || digits.length === 11;
    }, "Введите корректный номер телефона");

    // jq валидация
    $('form.validate').each(function () {
        $(this).validate({
            errorPlacement: function (error, element) {
                error.appendTo(element.closest(".form_input_group"));
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass);
                $(element).closest('.form_input_group').addClass(errorClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass);
                $(element).closest('.form_input_group').removeClass(errorClass);
            },
            rules: {
                agree: "required",
                phone: {
                    required: true,
                    phoneRU: true
                }
            },
            messages: {
                agree: "",
            }
        })
    });

    // Замена placeholder
    document.querySelectorAll('.radio_block').forEach(block => {
        const radios = block.querySelectorAll('input[type="radio"][name="phone"]');
        const input = block.querySelector('.radio_input input[type="tel"]');

        function updatePlaceholder() {
            const checked = block.querySelector('input[type="radio"][name="phone"]:checked');
            if (!checked) return;

            const label = checked.closest('label');
            const text = label.querySelector('.text')?.textContent.trim();

            if (text.includes('WhatsApp')) {
                input.placeholder = 'Номер телефона с WhatsApp';
            } else if (text.includes('Telegram')) {
                input.placeholder = 'Номер телефона с Telegram';
            } else {
                input.placeholder = 'Номер телефона';
            }
        }

        updatePlaceholder();

        radios.forEach(radio => {
            radio.addEventListener('change', updatePlaceholder);
        });
    });

    // куки
    const banner = document.getElementById('cookieBlock');
    const acceptBtn = document.querySelector('.cookies_btn_all');
    const declineBtn = document.querySelector('.cookies_btn_decline');

    const userCookieChoice = localStorage.getItem('cookieConsent');

    if (!userCookieChoice) {
        banner.classList.remove('hidden');
    } else {
        banner.classList.add('hidden');
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.classList.add('hidden');
    });

    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        banner.classList.add('hidden');
    });

})