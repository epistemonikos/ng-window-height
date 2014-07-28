angular.module("window-height", [])
.directive('windowHeight', function ($window) {
    return {
        scope: {
            footer: '@',
            bottom_offset: '@bottomOffset'
        },
        link: function (scope, element, attrs) {
            scope.footer_elem = angular.element(scope.footer || '#footer');
            element.css('overflow-x', 'hidden');
            element.css('overflow-y', 'scroll');
            var _window = angular.element($window);
            var _bottom_offset = isNaN(scope.bottom_offset) ? 0 : parseInt(scope.bottom_offset);

            scope.setHeight = function () {
                var new_height = _window.height();
                new_height -= scope.footer_elem.outerHeight(true); // footer outer height
                new_height -= element.offset().top; // element top px
                new_height -= _bottom_offset; // extra bottom offset
                element.height(new_height+'px');
            };

            /* before bind rezise ! */
            scope.setHeight();

            /* keep size when resize window */
            _window.bind('resize', function () {
                scope.setHeight();
            });
        }
    };
});
