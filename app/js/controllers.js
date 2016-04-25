'use strict';

/* Controllers */
var afroEarthApp = angular.module('afroEarthApp', ['ngRoute', 'ngResource', 'ngCookies', 'ngAnimate']);
var activateTab = function() {
    var activeTab = $('[href=' + window.location.hash.replace(/\//g, '') + ']');
    activeTab && activeTab.tab('show');
}
afroEarthApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
            templateUrl:'template/home.html',
            controller:'afroEarthMainCtrl'
        })
        .when('/events',{
            templateUrl:'template/events.html',
            controller:'eventsCtrl'
        })
        .when('/sites/:niche', {
            templateUrl:'template/single.html',
            controller:'SingleCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
}]);
/* Factory */
afroEarthApp.factory('Single', ['$resource', function ($resource) {
    return $resource('sites/:niche.:format',{
        niche: 'singles',
        format: 'json'
    })
}])

/* Filter */
afroEarthApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
afroEarthApp.service("AppCodes", function ($rootScope) {
    return {
        setAppCode: function () {
            $(window).load(function () {
                "use strict";
                // Parallax Effect
                (function () {
                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    } else {
                        $(window).stellar({
                            horizontalScrolling: false,
                            responsive: true,
                        });
                    }
                }());

            });
            $(document).ready(function () {

                $(function () {
                    $('#form1').multiStepForm()
                });

                // PreLoader
                if ($(window).width() < 750) {
                    $("li.other-countries a").on("click", function (e) {
                        e.preventDefault();
                        if (!($("li.other-countries").children("ul").hasClass("in"))) {
                            $("li.other-countries").children("ul").css({left: 0});
                            $("li.other-countries").children("ul").addClass("in");
                        } else {
                            $("li.other-countries").children("ul.in").css({left: -9999});
                            $("li.other-countries").children("ul").removeClass("in");
                        }
                    });
                }
                $(window).on('resize', function () {
                    if ($(window).width() < 750) {
                        $("li.other-countries a").on("click", function (e) {
                            e.preventDefault();
                            if (!($("li.other-countries").children("ul").hasClass("in"))) {
                                $("li.other-countries").children("ul").css({left: 0});
                                $("li.other-countries").children("ul").addClass("in");
                            } else {
                                $("li.other-countries").children("ul.in").css({left: -9999});
                                $("li.other-countries").children("ul").removeClass("in");
                            }
                        });
                    }
                });
                // jQuery Smooth Scroll
                $('.page-scroll').on('click', function (event) {
                    var $anchor = $(this),
                        headerH = '55';
                    $('html , body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top - headerH + "px",
                    }, 1200, 'easeInOutExpo');
                    event.preventDefault();
                });
                // jQuery ScrollSpy
                $('body').scrollspy({
                    target: '.navbar-collapse',
                    offset: 70
                });
                // Partners Carousel
                $("#partners-carousel").owlCarousel({
                    // Partners Carousel Settings
                    navigation: false,
                    pagination: false,
                    autoPlay: 3000, //Set AutoPlay to 3 seconds
                    items: 5,
                    itemsDesktop: [1199, 3],
                    itemsDesktopSmall: [979, 3],
                    stopOnHover: true,
                });
                // BLog Post Carousel
                $("#blog-post-carousel").owlCarousel({
                    // BLog Post Carousel Settings
                    navigation: false,
                    slideSpeed: 2000,
                    paginationSpeed: 1000,
                    singleItem: true,
                    pagination: true,
                    autoPlay: true,
                    stopOnHover: true,
                });
                // Counter JS
                $('.our-awards-section').on('inview', function (event, visible, visiblePartX, visiblePartY) {
                    if (visible) {
                        $(this).find('.timer').each(function () {
                            var $this = $(this);
                            $({
                                Counter: 0
                            }).animate({
                                Counter: $this.text()
                            }, {
                                duration: 3000,
                                easing: 'swing',
                                step: function () {
                                    $this.text(Math.ceil(this.Counter));
                                }
                            });
                        });
                        $(this).off('inview');
                    }
                });

            });
        }
    }
})
afroEarthApp.controller('afroEarthMainCtrl',['$scope','$http','$location','$cookies', '$rootScope', '$route', '$timeout', 'AppCodes', function($scope, $http, $location, $cookies, $rootScope, $route, $timeout, AppCodes) {
    $http.get('sites/afro.json').then(
        successHandler,
        errorHandler
    );
    function successHandler(data){
        $scope.myDataFirst = data.data;
        $scope.singleNiche = $scope.myDataFirst.US;
        $rootScope.header = $scope.singleNiche.title;
        $rootScope.myDataVar = $scope.myDataFirst.US;
        $cookies.put("myCountry", "US");
        $scope.setCountry = function (choise) {
            switch (choise){
                case "US" : $scope.singleNiche = $scope.myDataFirst.US;
                    break;
                case "UK" : $scope.singleNiche = $scope.myDataFirst.UK;
                    break;
                case "SA" : $scope.singleNiche = $scope.myDataFirst.SA;
                    break;
                case "CAN" : $scope.singleNiche = $scope.myDataFirst.CAN;
                    break;
                case "AU" : $scope.singleNiche = $scope.myDataFirst.AU;
                    break;
            }
            $cookies.put("myCountry", choise);
            $rootScope.header = $scope.singleNiche.title;

        };
        $rootScope.bodylayout = "home-page";

    }

    function errorHandler(error){
        //show error message when async call fails.
    }
    $timeout(function () {
        AppCodes.setAppCode();
    });
}]);

afroEarthApp.controller('SingleCtrl',['$scope','$http', '$location', '$routeParams', 'Single', '$cookies', '$rootScope', '$timeout', 'AppCodes', function($scope, $http, $location, $routeParams, Single, $cookies, $rootScope, $timeout, AppCodes) {
    $scope.niche = $routeParams.niche;
    $rootScope.bodylayout = "single-page";
    var url = 'sites/'+$routeParams.niche+'.json';
    Single.get({niche: $routeParams.niche}, function (data) {
        $scope.singleFirst = data;
        $scope.singleNiche = $scope.singleFirst.US;
        var getCountry = String($cookies.get("myCountry"));
        $scope.setCountry = function (choice) {
            switch (choice) {
                case "US" :
                    $scope.singleNiche = $scope.singleFirst.US;
                    break;
                case "UK" :
                    $scope.singleNiche = $scope.singleFirst.UK;
                    break;
                case "SA" :
                    $scope.singleNiche = $scope.singleFirst.SA;
                    break;
                case "CAN" :
                    $scope.singleNiche = $scope.singleFirst.CAN;
                    break;
                case "AU" :
                    $scope.singleNiche = $scope.singleFirst.AU;
                    break;
            }
            $rootScope.header = $scope.singleNiche.title;
        }
        $scope.setCountry(getCountry);
        $rootScope.header = $scope.singleNiche.title;
    })

    $scope.stories = 1;
    var countUp = function() {
        if( $scope.stories < 4)
            $scope.stories += 1;
        else{
            $scope.stories = 1;
        }
        $timeout(countUp, 2000);
    }

    $timeout(countUp, 2000);
    $timeout(function () {
        AppCodes.setAppCode();
    });
}]);
afroEarthApp.controller('eventsCtrl',['$scope','$http','$location','$cookies', '$rootScope', '$route', '$timeout', 'AppCodes', function($scope, $http, $location, $cookies, $rootScope, $route, $timeout, AppCodes) {
    $rootScope.bodylayout = "events";
    $rootScope.header = "AfroEarth Events";
    $timeout(function () {
        AppCodes.setAppCode();
        function get_ebdata() {
            var authurl = "https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=FCEXOG3EKJXKTHHAAE";
            var tkn = 'LADQY7SKSX4EK57DBHFJ';
            var auth_headers = {'Authorization': 'Bearer ' + tkn};
            var url = "https://www.eventbriteapi.com/v3/events/search/?token=" + tkn + "&expand=venue";
            $.ajax({
                url: url,
                data: {'user.id': '169016428766', 'sort_by': 'date'},
                dataType: "json",
                headers: auth_headers,
                success: function (data) {
                    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    for (var i = 0; i < data.events.length; i++) {
                        var evnt = data.events[i];
                        var dat = new Date(evnt.start.utc);
                        var date = days[dat.getDay()] + ", " + months[dat.getMonth()] + " " + dat.getDate();
                        var ven1 = evnt.venue.address.address_1;
                        if (evnt.venue.address.address_2 !== null) {
                            ven1 = ven1 + " " + evnt.venue.address.address_2;
                        }
                        if (ven1 !== 'TBA') {
                            var enddat = new Date(evnt.end.utc);
                            var ven2 = evnt.venue.address.city + ", " + evnt.venue.address.region;
                            var ven3 = evnt.name.html;
                            var img1 = evnt.logo.url;
                            var description = evnt.description.html;
                            var time = meridian_time(dat) + " - " + meridian_time(enddat);
                            var btn = "<a class='btn btn-primary portfolio-btn' href=" + evnt.url + " target='new'>Learn more</a>";
                            var contentEver = "<div class='event'>";
                            contentEver += "<div class='col-sm-6 col-xs-12 no-padding'><img src='" + img1 + "'></div>";
                            contentEver += "<div class='col-sm-6 col-xs-12 no-padding'><h3>" + ven3 + "</h3>";
                            contentEver += description;
                            contentEver += "<div class='col-sm-6 col-xs-12 no-padding location'><p><i class='fa fa-calendar-check-o'></i>" + date + "</p>";
                            contentEver += "<p><i class='fa fa-map-marker'></i>" + ven2 + "</p></div>";
                            contentEver += "<div class='col-sm-6 col-xs-12 no-padding'>" + btn + "</div>";
                            contentEver += "</div></div>";
                            $("#event-stuff").append(contentEver);
                        } else {
                            $("#event-stuff").append("<p>" + date + "<br>" + ven1 + "<br>" + time + "</p>")
                        }
                    }
                }
            })
        }

        var meridian_time = function (date) {
            var meridian = "am";
            var hours = date.getHours();
            var minutes = date.getMinutes();
            if (hours > 12) {
                hours -= 12;
                meridian = "pm"
            } else if (hours == 0) {
                hours = 12;
            }
            if (minutes < 10) {
                minutes = minutes + "0";
            }
            return hours + ":" + minutes + " " + meridian;
        }
        get_ebdata();
    });
}]);


