$(document).ready(function() {

    // Плавный скролл страницы по клику на элементы навигации

    $('.header-list .list__link').click(function(event) {
        event.preventDefault();

        $('html').animate({scrollTop: $($(this).attr('href')).offset().top}, 1500);
    });

    // -----------------------------------------------------------------------------

    // Открытие и закрытие navbar по клику на соответствующие иконки

    $('.header-list-btn').click(function() {
        $('.header-list').css({'left': '0'});
    });

    $('.header-list-close-btn').click(function() {
        $('.header-list').css({'left': '-100%'});
    });

    // -----------------------------------------------------------------------------

    // Изменение background-image по клику на стрелки в секции header

    var HEADER_BACKGROUND_IMAGES = 3;

    var backgroundImageCounter = 1;

    $('.left__arrow').click(function() {
        backgroundImageCounter++;

        if (backgroundImageCounter > HEADER_BACKGROUND_IMAGES || backgroundImageCounter < 1) {
            backgroundImageCounter = 1;
        }

        $('.header-section').css('background-image', 'url(../img/header-bg-' + backgroundImageCounter + '.png)');
    });

    $('.right__arrow').click(function() {
        backgroundImageCounter--;

        if (backgroundImageCounter > HEADER_BACKGROUND_IMAGES || backgroundImageCounter < 1) {
            backgroundImageCounter = 3;
        }

        $('.header-section').css('background-image', 'url(../img/header-bg-' + backgroundImageCounter + '.png)');
    });

    // -----------------------------------------------------------------------------

    // Открытие разделов по клику в секции about

    $('.block-who').click(function() {
        $(this).find('.image').toggleClass('image-reverse');

        $(this).find('.description').toggleClass('active');
    });

    $('.block-experiences').click(function() {
        $(this).find('.image').toggleClass('image-reverse');

        $(this).find('.description').toggleClass('active');
    });

    $('.block-learn-more').click(function() {
        $(this).find('.image').toggleClass('image-reverse');

        $(this).find('.description').toggleClass('active');
    });

    // -----------------------------------------------------------------------------

    // Изменение отзывов клиентов каждые 5 секунд в секции clients

    var REVIEW_BLOCKS = 3;

    var clientsCarouselCount = 1;

    setInterval(function() {
        clientsCarouselCount++;
  
        if (clientsCarouselCount > REVIEW_BLOCKS) {
            clientsCarouselCount = 1;
        }
  
        $('.review-block').hide();
        $('.square-block .square').css('background-color', 'grey');
        
        $('.review-block-' + clientsCarouselCount).fadeIn(1000);
        
        $('.square-' + clientsCarouselCount).css('background-color', 'crimson');
    }, 5000);

    // -----------------------------------------------------------------------------

    // Показать другие новости по клику на кнопку в секции blog

    $('.blog-content .blog-arrow').click(function() {
        $('.blog-arrow').hide();

        $('.other-news').slideDown(1000);
    });

    // -----------------------------------------------------------------------------
});