window.addEventListener("DOMContentLoaded", function () {

  // header dropdown

  const params = {
    btnClassName: "header__select-btn",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

    if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(`[data-target="${path}"]`);

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });

  // hero-swiper
  const swiper = new Swiper('.hero__swiper', {
    // Optional parameters
    loop: true,
    autoplay: {
      delay: 3000,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

  });
  // galary-gropdown
  const element = document.querySelector('#galaryFilter');
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });

  let ariaLabel = element.getAttribute('aria-label');
  element.closest('.choices').setAttribute('aria-label', ariaLabel);

  // galary-swiper
  const galarySwiper = new Swiper('.galary__slider', {
    // Optional parameters
    //кол-во слайдов для показа
    slidesPerView: 3,
    slidesPerGroup: 3,
    // отступ между слайдами
    spaceBetween: 50,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    keyboard: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },
      // when window width is >= 1231px
      1231: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    }
  });

  // catalog accordion
  $(".accordion").accordion({
    icons: false,
    heightStyle: "content",
    collapsible: true,
    active: 0,
  });

  //catalog tabs
  document.querySelectorAll('.accordion__painter-btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (e) {
      const path = e.currentTarget.dataset.path;
      document.querySelectorAll('.accordion__painter-btn').forEach(function (btn) {
        btn.classList.remove('accordion__painter-btn--active')
      });
      e.currentTarget.classList.add('accordion__painter-btn--active');

      document.querySelectorAll('.painter__item').forEach(function (tabsBtn) {
        tabsBtn.classList.remove('painter__item--active')
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('painter__item--active');
    });
  });

  //events-slider
  const eventsSwiper = new Swiper('.events__slider', {
    // Optional parameters
    //кол-во слайдов для показа
    slidesPerView: 3,
    // отступ между слайдами
    spaceBetween: 50,
    // Navigation arrows
    navigation: {
      nextEl: '.events__button-next',
      prevEl: '.events__button-prev',
    },
    pagination: {
      el: '.events__slider-pagination',
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 27,
        slidesPerGroup: 3,
      },
      // when window width is >= 1231px
      1231: {
        slidesPerView: 3,
        spaceBetween: 50,
      }
    }

  });

  //projects tooltips

  tippy('#tooltip-1', {
    content: 'Пример современных тенденций - современная методология разработки',
    theme: 'custom',
    trigger: 'click',
  });

  tippy('#tooltip-2', {
    content: 'Приятно граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
    theme: 'custom',
    trigger: 'click',
  });

  tippy('#tooltip-3', {
    content: 'В стремлении повысить качество',
    theme: 'custom',
    trigger: 'click',

  });

  //projects-slider
  const projectsSwiper = new Swiper('.projects__slider', {
    // Optional parameters
    //кол-во слайдов для показа
    slidesPerView: 3,
    // отступ между слайдами
    spaceBetween: 50,
    // Navigation arrows
    navigation: {
      nextEl: '.projects__slider-btn-next',
      prevEl: '.projects__slider-btn-prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 50,
        
      },
      // when window width is >= 1231px
      1231: {
        slidesPerView: 3,
        spaceBetween: 50,
      }
    }


  });

  //mask
  var selector = document.getElementById("tel");

  var im = new Inputmask("+7(999) 999-99-99");
  im.mask(selector);

  // Validation

  const validation = new JustValidate('#form', {
    errorFieldCssClass: 'is-invalid',
    errorLabelStyle: {
      fontSize: '12px',
      color: '#D11616',
    },
    focusInvalidField: true,
    lockForm: true,
  });

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Как вас зовут?',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Имя слишком короткое',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Имя слишком длинное',
      },
      {
        rule: 'customRegexp',
        value: /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ ]{1,28}[a-zA-Zа-яА-ЯёЁ]$/,
        errorMessage: 'Недопустимый формат',
      },
    ])
    .addField('#tel', [
      {
        rule: 'required',
        errorMessage: 'Укажите ваш телефон'
      },
      {
        validator: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        },
        errorMessage: 'Некорректный номер',
      },
    ]);

  ymaps.ready(init);
  function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.760382812669974, 37.61402491528322],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "360px", right: "15px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "270px", right: "15px" }
      }
    );

    myMap.behaviors.disable('scrollZoom');


    var myPlacemark = new ymaps.Placemark([55.760382812669974, 37.61402491528322], {
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: './img/icons/point.svg',
      // Размеры метки.
      iconImageSize: [20, 20],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-10, -8]
    });
    //Размещение геобъекта на карте
    myMap.geoObjects.add(myPlacemark);

  };
  //   modal
  class Modal {
    constructor(options) {
      let defaultOptions = {
        isOpen: () => { },
        isClose: () => { },
      }
      this.options = Object.assign(defaultOptions, options);
      this.modal = document.querySelector('.modal');
      this.speed = false;
      this.isOpen = false;
      this.modalContainer = false;
      this.previousActiveElement = false;
      this.fixBlocks = document.querySelectorAll('.fix-block');
      this.focusElements = [
        'a[href]',
        'input',
        'button',
        'select',
        'textarea',
        '[tabindex]'
      ];
      this.events();
    }

    events() {
      if (this.modal) {
        document.addEventListener('click', function (e) {
          const clickedElement = e.target.closest('[data-role="show-modal"]');
          if (clickedElement) {
            let target = clickedElement.dataset.path;
            let speed = clickedElement.dataset.speed;
            this.speed = speed ? parseInt(speed) : 300;
            this.modalContainer = document.querySelector(`[data-target="${target}"]`);
            this.open();
            return;
          }

          if (e.target.closest('.modal-close')) {
            this.close();
            return;
          }
        }.bind(this));

        window.addEventListener('keydown', function (e) {
          if (e.keyCode == 27) {
            if (this.isOpen) {
              this.close();
            }
          }

          if (e.keyCode == 9 && this.isOpen) {
            this.focusCatch(e);
            return;
          }

        }.bind(this));

        this.modal.addEventListener('click', function (e) {
          if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container') && this.isOpen) {
            this.close();
          }
        }.bind(this));
      }
    }

    open() {
      this.previousActiveElement = document.activeElement;

      this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
      this.modal.classList.add('is-open');
      this.disableScroll();
      this.modalContainer.classList.add('modal-open');

      setTimeout(() => {
        this.options.isOpen(this);
        this.isOpen = true;
        this.focusTrap();
      }, this.speed);
    }

    close() {
      if (this.modalContainer) {
        this.modal.classList.remove('is-open');
        this.modalContainer.classList.remove('modal-open');

        this.enableScroll();
        this.options.isClose(this);
        this.isOpen = false;
        this.focusTrap();
      }
    }

    focusCatch(e) {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }

      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        focusArray[0].focus();
        e.preventDefault();
      }
    }

    focusTrap() {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      if (this.isOpen) {
        focusable[0].focus();
      } else {
        this.previousActiveElement.focus();
      }
    }

    disableScroll() {
      let pagePosition = window.scrollY;
      this.lockPadding();
      document.body.classList.add('disable-scroll');
      document.body.dataset.position = pagePosition;
      document.body.style.top = -pagePosition + 'px';
    }

    enableScroll() {
      let pagePosition = parseInt(document.body.dataset.position, 10);
      this.unlockPadding();
      document.body.style.top = 'auto';
      document.body.classList.remove('disable-scroll');
      window.scroll({ top: pagePosition, left: 0 });
      document.body.removeAttribute('data-position');
    }

    lockPadding() {
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      this.fixBlocks.forEach((el) => {
        el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
    }

    unlockPadding() {
      this.fixBlocks.forEach((el) => {
        el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
    }
  }

  // modal-window
  const modal = new Modal({});

  // burger-menu
  const burgerBtn = document.querySelector('.burger')

  burgerBtn.addEventListener('click', () =>{
    document.querySelector('.header__nav').classList.toggle('header__nav-open');
    burgerBtn.classList.toggle('burger-active')
  })
  // search-form-mobile
  // открытие
  document.querySelector('.header__btn-search-mobile').addEventListener('click', () =>{
    document.querySelector('.search-form-mobile').classList.add('search-form-mobile-open');
    document.querySelector('.header__btn-search-mobile').classList.add('header__btn-search-mobile-disable');
  });

  // закрытие
  document.querySelector('.search-form-mobile__btn-close').addEventListener('click', () =>{
    document.querySelector('.search-form-mobile').classList.remove('search-form-mobile-open');
    document.querySelector('.header__btn-search-mobile').classList.remove('header__btn-search-mobile-disable');
  
  });

});
