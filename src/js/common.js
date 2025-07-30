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


    var scene = document.querySelectorAll('.parallax');
    if (scene) {
        scene.forEach(element => {
            var parallaxInstance = new Parallax(element)
        });
    }


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

})