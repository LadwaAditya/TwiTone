var app = angular.module('TwiTone', []);


function range(value, min, max) {
    return (value - min) / (max - min);
}


function rangeToPercent(value, min, max) {
    return Math.round(100 * range(value, min, max));
}

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
            var obj = data["document_tone"]["tone_categories"];

            var emotionalTone = obj[0]["tones"];
            var writeingTone = obj[1]["tones"];
            var socialTone = obj[2]["tones"];

            var emotionalScore = [];
            var writeingScore = [];
            var socialScore = [];

            var emotionalName = [];
            var writeingName = [];
            var socialName = [];

            $.each(emotionalTone, function (i, o) {
                emotionalScore.push(o["score"]);
                emotionalName.push(o["tone_name"]);
            });

            $.each(writeingTone, function (i, o) {
                writeingScore.push(o["score"]);
                writeingName.push(o["tone_name"]);
            });

            $.each(socialTone, function (i, o) {
                socialScore.push(o["score"]);
                socialName.push(o["tone_name"]);
            });
                       
        })
    }
}]);