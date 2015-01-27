// Synchronous highlighting with highlight.js
marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

angular.module('plain', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/index'
            })
            .when('/:wikiId*', {
                templateUrl: 'partials/page.html',
                controller: 'PageCtrl'
            });
    }])

    .controller('PageCtrl', ['$scope', '$routeParams', '$http', '$sce',
        function ($scope, $routeParams, $http, $sce) {
            console.log($routeParams.wikiId);
            $http.get('wiki/' + $routeParams.wikiId + '.md')
                .success(function (data) {
                    $scope.content = $sce.trustAsHtml(marked(data));
                })
                .error(function (data, status) {
                    $scope.content = $sce.trustAsHtml(data);
                });
        }]);
