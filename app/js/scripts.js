$(document).ready(function() {

    // Плавный скролл страницы по клику на элементы навигации

    $('.header-list .list__link').click(function(event) {
        event.preventDefault();

        $('html').animate({scrollTop: $($(this).attr('href')).offset().top}, 1500);
    });

    // -----------------------------------------------------------------------------

    // Изменение background-image по клику на стрелки в секции header

    let backgroundImageCounter = 1;

    $('.left__arrow').click(function() {
        backgroundImageCounter++;

        if (backgroundImageCounter > 3 || backgroundImageCounter < 1) {
            backgroundImageCounter = 1;
        }

        $('.header-section').css('background-image', 'url(../img/header-bg-' + backgroundImageCounter + '.png)');
    });

    $('.right__arrow').click(function() {
        backgroundImageCounter--;

        if (backgroundImageCounter > 3 || backgroundImageCounter < 1) {
            backgroundImageCounter = 3;
        }

        $('.header-section').css('background-image', 'url(../img/header-bg-' + backgroundImageCounter + '.png)');
    });

    // -----------------------------------------------------------------------------

    // Открытие разделов по клику в секции about

    $('.about-content-blocks .block-title').click(function(event) {
        event.preventDefault();

        $('.description').hide();
    
        $($(this).attr('href')).fadeIn();
    });

    // -----------------------------------------------------------------------------

    // Показать другие новости по клику на кнопку в секции blog

    $('.blog-content .blog-arrow').click(function() {
        $('.blog-arrow').fadeOut();

        $('.other-news').slideDown(1000);
    });

    // -----------------------------------------------------------------------------
});