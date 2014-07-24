angular.module("window-height", [])
.directive('windowHeight', function ($window) {
    return {
        scope: {
            footer: '@',
            bottom_offset: '@bottomOffset'
        },
        link: function (scope, element, attrs) {
            scope.bottom_offset = isNaN(scope.bottom_offset) ? 0 : parseInt(scope.bottom_offset);
            scope.footer = scope.footer || 'footer';
            scope.footer_elem = angular.element('.footer').length ? angular.element('.footer') : angular.element('#footer');
            element.css('overflow','hidden');
            var _window = angular.element($window);

            scope.setHeight = function () {
                var new_height = _window.height();
                new_height -= scope.footer_elem.outerHeight(true); // footer outer height
                new_height -= element.offset().top; // element top px
                new_height -= scope.bottom_offset; // extra bottom offset
                element.height(new_height+'px');
            };

            /* before bind rezise ! */
            scope.setHeight();

            _window.bind('resize', function () {
                scope.setHeight();
            });
        }
    }
});
