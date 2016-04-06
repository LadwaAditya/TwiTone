var app = angular.module('TwiTone', []);


function range(value, min, max) {
    return (value - min) / (max - min);
}


function rangeToPercent(value, min, max) {
    return Math.round(100 * range(value, min, max));
}

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

    $('#per').hide();

    $scope.getTweets = function () {

        $http.get('tweet/' + $scope.user.name).success(function (data) {
            var tweets = [];

            $('#per').show();
            $.each(data, function (i, obj) {
                tweets.push(obj.text);

            });
            $scope.tweets = tweets;


        })
    };

    $scope.analyze = function (tweet) {
        tweet = tweet.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
        console.log(tweet);
        $http.get('tone/' + tweet).success(function (data) {
            $scope.status = tweet;

            var obj = data["document_tone"]["tone_categories"];

            var emotionalTone = obj[0]["tones"];
            var writingTone = obj[1]["tones"];
            var socialTone = obj[2]["tones"];

            var emotionalScore = [];
            var writingScore = [];
            var socialScore = [];

            var emotionalName = [];
            var writingName = [];
            var socialName = [];

            $.each(emotionalTone, function (i, o) {
                emotionalScore.push(o["score"]);
                emotionalName.push(o["tone_name"]);
            });

            $.each(writingTone, function (i, o) {
                writingScore.push(o["score"]);
                writingName.push(o["tone_name"]);
            });

            $.each(socialTone, function (i, o) {
                socialScore.push(o["score"]);
                socialName.push(o["tone_name"]);
            });


            var emotionalChart = new CanvasJS.Chart("chartEmotional", {

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

            var languageChart = new CanvasJS.Chart("chartLanguage", {
                title: {
                    text: "Language Style summary "
                },
                data: [
                    {

                        type: "column",
                        dataPoints: [
                            {label: writingName[0], y: writingScore[0]},
                            {label: writingName[1], y: writingScore[1]},
                            {label: writingName[2], y: writingScore[2]}

                        ]
                    }
                ]
            });

            var socialChart = new CanvasJS.Chart("chartSocial", {

                title: {
                    text: "Social summary"

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

                data: [
                    {
                        type: "bar",
                        name: "companies",
                        axisYType: "secondary",
                        color: "#014D65",
                        dataPoints: [

                            {y: socialScore[0], label: socialName[0]},
                            {y: socialScore[1], label: socialName[1]},
                            {y: socialScore[2], label: socialName[2]},
                            {y: socialScore[3], label: socialName[3]},
                            {y: socialScore[4], label: socialName[4]}

                        ]
                    }

                ]
            });

            socialChart.render();
            languageChart.render();
            emotionalChart.render();

        })
    }

    $scope.personality = function () {
        var allTweets = "";
        for (i = 0; i < $scope.tweets.length; i++) {
            allTweets += $scope.tweets[i];

        }
        console.log(allTweets);

        
    }


}]);