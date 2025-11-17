var MyScroll = "";
(function(window, document, $, undefined) {
    "use strict";
    var isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
            navigator.userAgent
        ) ?
        !0 :
        !1;
    var Scrollbar = window.Scrollbar;
    var Init = {
        i: function(e) {
            Init.s();
            Init.methods();
        },
        s: function(e) {
            (this._window = $(window)),
            (this._document = $(document)),
            (this._body = $("body")),
            (this._html = $("html"));
        },
        methods: function(e) {
            Init.w();
            Init.backToTop();
            Init.preloader();
            Init.header();
            Init.skillBar();
            Init.slick();
            Init.categoryToggle();
            Init.filterSearch();
            Init.passwordIcon();
            Init.countdownInit(".countdown", "2024/12/01");
            Init.formValidation();
            Init.contactForm();
        },
        w: function(e) {
            if (isMobile) {
                $("body").addClass("is-mobile");
            }
        },
        backToTop: function() {
            var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
            var rootElement = document.documentElement;

            function handleScroll() {
                var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
                if (rootElement.scrollTop / scrollTotal > 0.05) {
                    scrollToTopBtn.classList.add("showBtn");
                } else {
                    scrollToTopBtn.classList.remove("showBtn");
                }
            }

            function scrollToTop() {
                rootElement.scrollTo({ top: 0, behavior: "smooth" });
            }
            scrollToTopBtn.addEventListener("click", scrollToTop);
            document.addEventListener("scroll", handleScroll);
        },
        preloader: function() {
            setTimeout(function() {
                $("#preloader").hide("slow");
            }, 3000);
        },
        header: function() {
            function dynamicCurrentMenuClass(selector) {
                let FileName = window.location.href.split("/").reverse()[0];
                selector.find("li").each(function() {
                    let anchor = $(this).find("a");
                    if ($(anchor).attr("href") == FileName) {
                        $(this).addClass("current");
                    }
                });
                selector.children("li").each(function() {
                    if ($(this).find(".current").length) {
                        $(this).addClass("current");
                    }
                });
                if ("" == FileName) {
                    selector.find("li").eq(0).addClass("current");
                }
            }
            if ($(".main-menu__list").length) {
                let mainNavUL = $(".main-menu__list");
                dynamicCurrentMenuClass(mainNavUL);
            }
            if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
                let navContent = document.querySelector(".main-menu__nav").innerHTML;
                let mobileNavContainer = document.querySelector(
                    ".mobile-nav__container"
                );
                mobileNavContainer.innerHTML = navContent;
            }
            if ($(".sticky-header__content").length) {
                let navContent = document.querySelector(".main-menu").innerHTML;
                let mobileNavContainer = document.querySelector(
                    ".sticky-header__content"
                );
                mobileNavContainer.innerHTML = navContent;
            }
            if ($(".mobile-nav__container .main-menu__list").length) {
                let dropdownAnchor = $(
                    ".mobile-nav__container .main-menu__list .dropdown > a"
                );
                dropdownAnchor.each(function() {
                    let self = $(this);
                    let toggleBtn = document.createElement("BUTTON");
                    toggleBtn.setAttribute("aria-label", "dropdown toggler");
                    toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
                    self.append(function() {
                        return toggleBtn;
                    });
                    self.find("button").on("click", function(e) {
                        e.preventDefault();
                        let self = $(this);
                        self.toggleClass("expanded");
                        self.parent().toggleClass("expanded");
                        self.parent().parent().children("ul").slideToggle();
                    });
                });
            }
            if ($(".mobile-nav__toggler").length) {
                $(".mobile-nav__toggler").on("click", function(e) {
                    e.preventDefault();
                    $(".mobile-nav__wrapper").toggleClass("expanded");
                    $("body").toggleClass("locked");
                });
            }
            $(window).on("scroll", function() {
                if ($(".stricked-menu").length) {
                    var headerScrollPos = 130;
                    var stricky = $(".stricked-menu");
                    if ($(window).scrollTop() > headerScrollPos) {
                        stricky.addClass("stricky-fixed");
                    } else if ($(this).scrollTop() <= headerScrollPos) {
                        stricky.removeClass("stricky-fixed");
                    }
                }
            });
        },
        skillBar: function() {
            var lang = {
                css: "90%",
                javascript: "70%",
                angular: "65%",
                php: "50%",
                mysql: "30%",
            };
            var multiply = 3;
            $.each(lang, function(language, pourcent) {
                var delay = 200;
                setTimeout(function() {
                    $("#" + language + "-pourcent").html(pourcent);
                }, delay * multiply);
                multiply++;
            });
        },
        slick: function() {
            if ($(".brand-slider").length) {
                $(".brand-slider").slick({
                    infinite: !0,
                    slidesToShow: 6,
                    arrows: !1,
                    autoplay: !0,
                    cssEase: "linear",
                    autoplaySpeed: 0,
                    speed: 8000,
                    pauseOnFocus: !1,
                    pauseOnHover: !1,
                    responsive: [
                        { breakpoint: 1599, settings: { slidesToShow: 5 } },
                        { breakpoint: 1399, settings: { slidesToShow: 4 } },
                        { breakpoint: 769, settings: { slidesToShow: 3 } },
                        { breakpoint: 576, settings: { slidesToShow: 3 } },
                    ],
                });
            }
            if ($(".testimonials-slider").length) {
                $(".testimonials-slider").slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: !0,
                    autoplay: !1,
                    dots: false,
                    draggable: !0,
                    arrows: !1,
                    lazyLoad: "progressive",
                    speed: 800,
                    autoplaySpeed: 2000,
                    responsive: [
                        { breakpoint: 1025, settings: { slidesToShow: 2 } },
                        { breakpoint: 768, settings: { slidesToShow: 1 } },
                    ],
                });
            }
            if ($(".features-slider").length) {
                $(".features-slider").slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: !0,
                    autoplay: !1,
                    dots: false,
                    draggable: !0,
                    arrows: !1,
                    lazyLoad: "progressive",
                    speed: 800,
                    autoplaySpeed: 2000,
                    responsive: [
                        { breakpoint: 1025, settings: { slidesToShow: 2 } },
                        { breakpoint: 768, settings: { slidesToShow: 1 } },
                    ],
                });
            }
            if ($(".video-slider").length) {
                $(".video-slider").slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: !0,
                    autoplay: true,
                    dots: false,
                    draggable: !0,
                    arrows: !1,
                    lazyLoad: "progressive",
                    speed: 800,
                    autoplaySpeed: 2000,
                    responsive: [
                        { breakpoint: 1025, settings: { slidesToShow: 2 } },
                        { breakpoint: 768, settings: { slidesToShow: 1 } },
                    ],
                });
            }
            $(".btn-prev").click(function() {
                var $this = $(this).attr("data-slide");
                $("." + $this).slick("slickPrev");
            });
            $(".btn-next").click(function() {
                var $this = $(this).attr("data-slide");
                $("." + $this).slick("slickNext");
            });
        },
        categoryToggle: function() {
            if ($(".category-block").length) {
                $(".category-block .title").on("click", function(e) {
                    var count = $(this).data("count");
                    if (
                        $(".category-block.box-" + count + " .content-block").is(":visible")
                    ) {
                        $(".category-block.box-" + count + " i").removeClass(
                            "fa-horizontal-rule"
                        );
                        $(".category-block.box-" + count + " i").addClass("fa-plus");
                        $(".category-block.box-" + count + " .content-block").hide("slow");
                    } else {
                        $(".category-block.box-" + count + " i").removeClass("fa-plus");
                        $(".category-block.box-" + count + " i").addClass(
                            "fa-horizontal-rule"
                        );
                        $(".category-block.box-" + count + " .content-block").show("slow");
                    }
                });
            }
            if ($(".customer-container").length) {
                $(".signin-button").click(function() {
                    $(".sign-form").slideToggle();
                });
            }
        },
        filterSearch: function() {
            if ($("#searchInput").length) {
                $("#searchInput").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                    $(".blogs-block").filter(function() {
                        var hasMatch =
                            $(this).find(".blog-title").text().toLowerCase().indexOf(value) >
                            -1;
                        $(this).toggle(hasMatch);
                    });
                });
            }
        },
        passwordIcon: function() {
            $("#eye , #eye-icon").click(function() {
                if ($(this).hasClass("fa-eye-slash")) {
                    $(this).removeClass("fa-eye-slash");
                    $(this).addClass("fa-eye");
                    $(".password-input").attr("type", "text");
                } else {
                    $(this).removeClass("fa-eye");
                    $(this).addClass("fa-eye-slash");
                    $(".password-input").attr("type", "password");
                }
            });
        },
        // Countdown Timer
        countdownInit: function(countdownSelector, countdownTime, countdown) {
            var eventCounter = $(countdownSelector);
            if (eventCounter.length) {
                eventCounter.countdown(countdownTime, function(e) {
                    $(this).html(
                        e.strftime(
                            "<li><h2>%D</h2><p>Days</p></li>\
              <li><h2>%H</h2><p>Hrs</p></li>\
              <li><h2>%M</h2><p>Mins</p></li>\
              <li><h2>%S</h2><p>Secs</p></li>"
                        )
                    );
                });
            }
        },
        formValidation: function() {
            if ($(".contact-form").length) {
                $(".contact-form").validate();
            }
            if ($(".login-form").length) {
                $(".login-form").validate();
            }
        },
        contactForm: function() {
            $(".contact-form").on("submit", function(e) {
                e.preventDefault();
                if ($(".contact-form").valid()) {
                    var _self = $(this);
                    _self
                        .closest("div")
                        .find('button[type="submit"]')
                        .attr("disabled", "disabled");
                    var data = $(this).serialize();
                    $.ajax({
                        url: "./assets/mail/contact.php",
                        type: "post",
                        dataType: "json",
                        data: data,
                        success: function(data) {
                            $(".contact-form").trigger("reset");
                            _self.find('button[type="submit"]').removeAttr("disabled");
                            if (data.success) {
                                document.getElementById("message").innerHTML =
                                    "<h4 class='color-primary mt-16 mb-16'>Email Sent Successfully</h4>";
                            } else {
                                document.getElementById("message").innerHTML =
                                    "<h4 class='color-primary mt-16 mb-16'>There is an error</h4>";
                            }
                            $("#messages").show("slow");
                            $("#messages").slideDown("slow");
                            setTimeout(function() {
                                $("#messages").slideUp("hide");
                                $("#messages").hide("slow");
                            }, 4000);
                        },
                    });
                } else {
                    return !1;
                }
            });
        },
    };
    Init.i();
})(window, document, jQuery);