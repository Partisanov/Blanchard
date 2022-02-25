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

    });

    //projects tooltips

    tippy('#tooltip-1',{
        content:'Пример современных тенденций - современная методология разработки',
        theme: 'custom',
        trigger: 'click',
    });

    tippy('#tooltip-2',{
        content:'Приятно граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
        theme: 'custom',
        trigger: 'click',
    });

    tippy('#tooltip-3',{
        content:'В стремлении повысить качество',
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
        

    });

      //mask
  var selector = document.getElementById("tel");

  var im = new Inputmask("+7(999) 999-99-99");
  im.mask(selector);

  // Validation

  const validation = new JustValidate('#form',{
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
  function init(){
      // Создание карты.
      var myMap = new ymaps.Map("map", {
          // Координаты центра карты.
          // Порядок по умолчанию: «широта, долгота».
          // Чтобы не определять координаты центра карты вручную,
          // воспользуйтесь инструментом Определение координат.
          center: [55.760382812669974,37.61402491528322],
          // Уровень масштабирования. Допустимые значения:
          // от 0 (весь мир) до 19.
          zoom: 14,
          controls: ['geolocationControl', 'zoomControl']
      });
      var myPlacemark = new ymaps.Placemark([55.760382812669974,37.61402491528322], {
      },{
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

});
