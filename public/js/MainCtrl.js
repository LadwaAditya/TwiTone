var app = angular.module('TwiTone',[]);

app.controller('MainCtrl',['$scope','$http',  function ($scope, $http) {

    $scope.phones = [
        {'name': 'Nexus S',
            'snippet': 'Fast just got faster with Nexus S.'},
        {'name': 'Motorola XOOM™ with Wi-Fi',
            'snippet': 'The Next, Next Generation tablet.'},
        {'name': 'MOTOROLA XOOM™',
            'snippet': 'The Next, Next Generation tablet.'}
    ];

    $scope.getTweets = function () {
        console.log("Clicked");
    }
}]);