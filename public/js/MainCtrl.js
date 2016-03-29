var app = angular.module('TwiTone', []);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {


    $scope.getTweets = function () {
        $http.get('tweet/' + $scope.user.name).success(function (data) {
            var tweets = [];
            $.each(data, function (i, obj) {
                tweets.push(obj.text);
            });
            $scope.tweets = tweets;
        })
    };

    $scope.analyze = function (tweet) {
        $http.get('tone/' + tweet).success(function (data) {
            console.log(data);
        })
    }
}]);