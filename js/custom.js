(function($){
    $(function() {

        var sliderClass = '.js-slick',
            sliderArrowsClass ='.js-slick-arrows',
            sliderQuizClass = '.js-quiz-slick',
            scrollVar = 0;

    //Text animation
        var typed = [];

        if($('.js-elem').length){
            $('.js-elem').each(function(i, el){
                let text = $(el).data('content');
                if (text !== '' && typeof text !== typeof undefined){
                    var stringArr = text.split('|');
                    typed[i] = new Typed(el, {
                        strings: stringArr,
                        typeSpeed: 180,
                        loop: true,
                    });
                }
            })
        }

        //Scroll to anchor
        $('.js-anchor-link').click(function(e){

            e.preventDefault();
            if($(e.currentTarget).hasClass('menu__links-item')){
                // $('.menu__icon').trigger('click')
                var menu = $(this).closest('.menu');
                menu.removeClass('menu_state_open');
                $('body').removeClass('fixed');
            }
            var target = $(e.currentTarget).attr('href');
            if($(target).length && typeof $(target) !== typeof undefined){
                var scrollTo = $(target).offset().top;

                $('html').animate({scrollTop: scrollTo+'px'}, 800);
            }
        });

        $('.menu__icon').on('click', function(ev) {
            var menu = $(this).closest('.menu');


            if(!menu.hasClass('menu_state_open')){
                scrollVar =  $(window).scrollTop();
                menu.addClass('menu_state_open');
                $('body').addClass('fixed');


            }else{
                menu.removeClass('menu_state_open');
                $('body').removeClass('fixed');
                $(window).scrollTop(scrollVar);
            }
            // $(this).closest('.menu').toggleClass('menu_state_open');
            // $('body').toggleClass('fixed');
        });

        //select-2
        function initSelect() {
            if($('.js-select').length){
                $('.js-select').each(function(i, el){
                    $(el).select2({
                        minimumResultsForSearch: -1,
                    });
                });

                $('.js-select').on('select2:open', function (ev){
                    // var offset = $(ev.currentTarget).offset()
                    var viewportOffset = ev.currentTarget.getBoundingClientRect(), top = viewportOffset.top,
                        dropdownHeight = window.innerHeight - top - 100;

                    if(dropdownHeight < 500){
                        $('.select2-results__options').css('max-height',  dropdownHeight)
                    }
                })
            }
        }

        initSelect();

        $(window).on('resize', function () {
            setTimeout(initSelect, 300);
        });


        function initSlider(cl) {
            if ($(cl).length) {
                $(cl).each(function (i, el){
                    $(el).not('.slick-initialized').slick({
                        dots: true,
                        infinite: false,
                        arrows: false,
                        // variableWidth: true,
                        // swipe: true,
                        // touchMove: true,
                        customPaging : function(slider, i) {
                            return '<a class="slick-dot"></a>';
                        },
                    });
                })
            }
        }

        function initQuizSlider(cl) {
            if ($(cl).length) {
                $(cl).each(function (i, el){
                    $(el).not('.slick-initialized').slick({
                        dots: true,
                        infinite: false,
                        arrows: false,
                        slidesToShow: 2,
                        variableWidth: true,
                        customPaging : function(slider, i) {
                            return '<a class="slick-dot"></a>';
                        },
                    });
                })
            }
        }


        function initSliderArrows(cl) {
            if ($(cl).length) {
                $(cl).each(function(i, el) {
                    $(el).not('.slick-initialized').slick({
                        dots: true,
                        infinite: true,
                        arrows: true,
                        variableWidth: false,
                        swipe: true,
                        touchMove: true,
                        prevArrow:"<a class='slick-prev'><img src='img/icons/slider-arrow-left.svg'></a>",
                        nextArrow:"<a class='slick-next'><img src='img/icons/slider-arrow-right.svg'></a>",
                        customPaging : function(slider, i) {
                            return '<a class="slick-dot"></a>';
                        },
                    });
                })
            }
        }

        function initMasonry(cl = '.review'){
            if ($(cl).length) {
                $(cl).each(function(i, el) {
                   $(el).masonry({
                        columnWidth: '.review-sizer',
                        itemSelector: '.review-item',
                        percentPosition: true,
                        horizontalOrder: true
                    });
                })
            }
        }

        function imageRadioChange(radio, inp){
            $(radio).on('change', function(){
                var v = $(this).val();
                    // inp = $(this).parents('.quiz').find(inp);
                console.log(inp, v);
                    $(inp).val(v);
            })
        }

        function quizSlideChange(holder, slideTo){
            // var next = $(holder).next(),
                var oldHeight = $(holder).outerHeight();

            $('#quiz-holder .container').css('height', oldHeight);

              $(holder).fadeOut('100', function(){
                  var scrollTo = $('#quiz-holder .container').offset().top - 15;
                  $('html').animate({scrollTop: scrollTo+'px'}, 200, function () {
                      $(slideTo).fadeIn('200', function(){
                          $('#quiz-holder .container').css('height', 'auto');

                      });
                  });

              });

        }

        imageRadioChange('.image-radio-anlass', '#image-radio-anlass-inp');

        if($(window).width() > 768) {
            initMasonry();
            $('#collapse-3').addClass('show');
        }

        if($(window).width() < 768) {
            initSlider(sliderClass);
            initQuizSlider(sliderQuizClass);
            initSliderArrows(sliderArrowsClass);
            $('#collapse-3').removeClass('show');
        }

        jQuery.validator.addMethod("phonenumber", function(value, element) {
            return this.optional(element) || /^[+]*[0-9]{6,12}/.test(value)|| /^[0-9]{6,11}/.test(value);
        }, "Bitte geben Sie die Rufnummer mit  Vorwahl ein");

        jQuery.validator.setDefaults({
            errorPlacement: function(error, element) {
                var tool = $(element).parent('div').find('.tool');
                if(tool.length) {
                    error.appendTo($(tool));
                }else{
                    var tool2 = $(element).parent('div').find('.error-block');
                    error.appendTo($(tool2))
                }

            },

            highlight: function(element) {
                $(element).parent('div').addClass('input-error');
            },

            unhighlight: function(element) {
                $(element).parent('div').removeClass('input-error');
            },
            errorClass: 'tooltip-content',
            errorElement: 'span',

        });

        $('.js-phone-inp').on('focus', function(){
            if($(this).val() === ''){
                $(this).val('+49')
            }
        });

        //intro form
        $('.js-intro-next').on('click', function () {

            var validator = $( "#intro-form" ).validate();

            validator.element( "#pre_event_select" );

                if (!(Object.values(validator.invalid).indexOf(true) > -1)) {
                    var guets = $('#intro-form').find('#pre_event_guests').val(),
                        budget = $('#intro-form').find('#pre_event_budget').val(),
                        select = $('#intro-form').find('#pre_event_select').val();

                     $('#formModalStep2').find('#step2_event_select').val(select);
                     $('#step2_event_select').select2().trigger('change');

                     $('#formModalStep2').find('#event_budget').val(budget);
                     $('#formModalStep2').find('#event_guests').val(guets);


                    $('#formModalStep2').modal('show');
                }
        });

        $('.js-quiz-prev').on('click', function (ev) {
            ev.preventDefault();
            var btn = $(ev.currentTarget),
                holder = btn.parents('.quiz'),
                prev = $(holder).prev();
                quizSlideChange(holder, prev);
        });

        $('.js-quiz-next').on('click', function (ev) {
            ev.preventDefault();
            var btn = $(ev.currentTarget),
                holder = btn.parents('.quiz'),
                next = $(holder).next();

            var validator = $( "#quiz-form" ).validate();

            if(holder.find('#image-radio-anlass-inp').length) {
                validator.element('#image-radio-anlass-inp');
                if (!(Object.values(validator.invalid).indexOf(true) > -1)) {
                    quizSlideChange(holder, next)
                }
            }else if(holder.find('#quiz_event_date').length){
                validator.element('#quiz_event_date');
                if (!(Object.values(validator.invalid).indexOf(true) > -1)) {
                    quizSlideChange(holder, next)
                }
            } else{
                quizSlideChange(holder, next);
            }
        });




        //Validate on change
        $('#pre_event_select').on('change', function(){
            var validator = $( "#intro-form" ).validate();
            validator.element( "#pre_event_select" );
        });

        $('#contact-form-step-2').validate({
            submitHandler: function (form) {
                var str = $(form).serialize();

                $.ajax({
                    type: "POST",
                    url: "php/contact-form.php",
                    data: str,
                    success: function(msg) {
                        if(msg == 'ok') {
                            $('#formModalStep2').modal('hide');
                                // .on('hidden.bs.modal', function (e) {
                            setTimeout(function() {
                                $("body").addClass("modal-open");
                                $('#successModal').modal('show');
                                $(form).trigger("reset");
                                $("#intro-form").trigger("reset");
                            }, 300)

                        // }
                        // )
                        }
                        else {
                            console.log('er')
                        }
                    }
                });
                return false;
            }


        });


        //form submit
        $('#contact-form').validate({
                submitHandler: function (form) {

                    var str = $(form).serialize();
                    var t =1;
                    $.ajax({
                        type: "POST",
                        url: "php/contact-form.php",
                        data: str,
                        success: function(msg) {
                            if(msg === 'ok') {
                                $('#formModal').modal('hide');
                                    // .on('hidden.bs.modal', function (e) {
                                setTimeout(function() {
                                    $("body").addClass("modal-open");
                                    $('#successModal').modal('show');
                                    $(form).trigger("reset");
                                }, 300)

                            // })
                        }
                            else {
                                console.log('er')
                        }
                        }
                    });
                    return false;
            }
        } );

        //Quiz form
        $('#quiz-form').validate({
            submitHandler: function (form) {

                var str = $(form).serialize();
                console.log(str);
                $.ajax({
                    type: "POST",
                    url: "php/contact-form.php",
                    data: str,
                    success: function(msg) {
                        if(msg === 'ok') {
                            $('#successModal').modal('show');
                            quizSlideChange('.quiz-step-8', '.quiz-step-1');
                            $(form).trigger("reset");

                            }
                        else {
                            console.log('er')
                        }
                    }
                });
                return false;
            }
        } );


        $(window).bind('orientationchange', function (event) {
            location.reload(true);
        });


        function tabsDraggable (holder ) {
            let isDown = false;
            let startX;
            let scrollLeft;


            if($(holder).length) {
                $(holder).each((i, slider) => {

                    slider.addEventListener('mousedown', (ev) => {
                        isDown = true;
                        startX = ev.pageX - slider.offsetLeft;
                        scrollLeft = slider.scrollLeft;
                    });

                    slider.addEventListener('mouseleave', () => {
                        isDown = false;
                    });

                    slider.addEventListener('mouseup', () => {
                        isDown = false;
                    });

                    slider.addEventListener('mousemove', (ev) => {
                        if (!isDown) return;
                        ev.preventDefault();
                        const x = ev.pageX - slider.offsetLeft;
                        const walk = (x - startX) * 2; //scroll-fast
                        slider.scrollLeft = scrollLeft - walk;

                    });
                })
            }
        }

        tabsDraggable('.intro-links-container');


    });
})(jQuery);
