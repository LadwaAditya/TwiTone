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
            $scope.status = tweet;
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

            console.log(emotionalScore);
            var chart = new CanvasJS.Chart("chartContainer", {

                title: {
                    text: "Emotion summary"

                },
                animationEnabled: true,
                axisX: {
                    interval: 1,
                    gridThickness: 0,
                    labelFontSize: 10,
                    labelFontStyle: "normal",
                    labelFontWeight: "normal",
                    labelFontFamily: "Lucida Sans Unicode"

                },
                axisY2: {
                    interlacedColor: "rgba(1,77,101,.2)",
                    gridColor: "rgba(1,77,101,.1)"

                },

                data: [
                    {
                        type: "bar",
                        name: "companies",
                        axisYType: "secondary",
                        color: "#014D65",
                        dataPoints: [

                            {y: emotionalScore[0], label: emotionalName[0]},
                            {y: emotionalScore[1], label: emotionalName[1]},
                            {y: emotionalScore[2], label: emotionalName[2]},
                            {y: emotionalScore[3], label: emotionalName[3]},
                            {y: emotionalScore[4], label: emotionalName[4]}

                        ]
                    }

                ]
            });

            chart.render();


        })
    }
}]);