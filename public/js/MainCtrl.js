var app = angular.module('TwiTone', []);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {


    $scope.getTweets = function () {
        console.log($scope.user.name);
        $http.get('tweet/' + $scope.user.name).success(function (data) {
            var tweets = [];
            $.each(data, function (i, obj) {
                tweets.push(obj.text);
            });
            $scope.tweets = tweets;
        })
    }
}]);