// Handler when DOM is ready
jQuery(document).ready(function($)
    {
        $(document).ready(function(){
            $("#bottom-header-menu, .slider-btn, .footer-menu, #btn-top").on("click","a", function (event) {
                event.preventDefault();
                var id  = $(this).attr('href'),
                    top = $(id).offset().top;
                $('body,html').animate({scrollTop: top}, 1000);
            });
        });

        $('#banner-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: true
        });

        $(window).bind("beforeunload", function() {
            return confirm("Do you really want to close?");
        });

        function doConfirm(msg, yesFn, noFn) {
            var confirmBox = $("#confirmBox");
            confirmBox.find(".message").text(msg);
            confirmBox.find(".yes,.no").unbind().click(function () {
                confirmBox.hide();
            });
            confirmBox.find(".yes").click(yesFn);
            confirmBox.find(".no").click(noFn);
            confirmBox.show();
        }

        $(function () {
            $(".order-btn form").submit(function (e) {
                e.preventDefault();
                var form = this;
                doConfirm("Successfully added!\nGo to cart or continue shopping?", function yes() {
                    window.open("http://www.yura.artvens.com/My%20Own%20Projects/cart.html");
                }, function no() {
                    // do nothing
                });
            });
        });


        $(".add-to-cart").click(function () {
            setCookie($(this).data().product, $(this).data().price);
        });

        function setCookie(name, price){
            document.cookie = name + "=" + price;
        }

        $("#cart").click(function () {
            getCookie($(this).data().product, $(this).data().price);
            window.open("http://www.yura.artvens.com/My%20Own%20Projects/cart.html");
        });

        function getCookie()
        {
            var cookiename = document.cookie.replace(/(?:(?:^|.*;\s*)name\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var cookieprice = document.cookie.replace(/(?:(?:^|.*;\s*)price\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        }

        $(document).ready(function() {
            $('#contact-form').submit(function(e) {
                var name = $('#inputName');
                var number = $('#inputNumber');
                var email = $('#inputEmail');
                var address = $('#inputAddress');
                var city = $('#inputCity');
                var state = $('#inputState');
                var zip = $('#inputZip');
                var select = $('#inputSelect');
                var message = $('#inputMessage');

                if(name.val() == "" || number.val() == "" || email.val() == "" || address.val() == "" || city.val() == "" || state.val() == "" || zip.val() == "" || select.val() == "" || message.val() == "") {
                    $('.submit-fail').fadeToggle(400);
                    return false;
                }
                else {
                    $.ajax({
                        method: 'POST',
                        url: '//formspree.io/yura.heiko@gmail.com',
                        data: $('#contact-form').serialize(),
                        datatype: 'json'
                    });
                    e.preventDefault();
                    $(this).get(0).reset();
                    $('.submit-success').fadeToggle(400);
                }
            });
            $('.submit-fail, .submit-success').click(function() {
                $(this).hide();
            });
        });

        $('#reviews-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: true
        });
    }
);

function initMap() {
    var location = {lat: 49.83195, lng: 24.02300 };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        scrollwheel: false,
        zoom: 17
    });

    var marker = new google.maps.Marker({
        map: map,
        position: location
    });
}