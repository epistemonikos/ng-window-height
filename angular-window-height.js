angular.module("ngWindowHeight", [])
.directive('windowHeight', function ($window, $timeout) {
    return {
        scope: {
            footer: '@',
            bottom_offset: '@bottomOffset'
        },
        link: function (scope, element, attrs) {
            scope.footer_elem = angular.element(scope.footer || '#footer');
            element.css('overflow-x', 'hidden');
            element.css('overflow-y', 'auto');
            var _bottom_offset = isNaN(scope.bottom_offset) || !scope.bottom_offset ? 0 : parseInt(scope.bottom_offset);

            scope.setHeight = function () {
                var new_height = angular.element($window).height();
                if (new_height > 568) {
                    new_height -= scope.footer_elem.outerHeight(true); // footer outer height
                    new_height -= element.offset().top; // element top px
                    new_height -= _bottom_offset; // extra bottom offset
                    element.height(new_height+'px');
                }
                else {
                    element.height('auto');
                }
            };

            /* first height before bind rezise ! */
            $timeout(function () {
                scope.setHeight();
            });

            /* keep size when resize window */
            angular.element($window).bind('resize', scope.setHeight);
            angular.element('body').on('OverflowEvent' in window ? 'overflowchanged' : 'overflow', scope.setHeight);

           /* IE9 overflow fix: notify to all elements */
            scope.$on('MOUSEENTER', function () {
                scope.setHeight();
            });
            element.bind('mouseenter', function () {
                scope.$root.$broadcast('MOUSEENTER');
            });
        }
    };
});
