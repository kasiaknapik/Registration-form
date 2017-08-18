var app = angular.module('myApp', ['ngSanitize', 'ui.select', 'ui.mask']);

var formCtrlFunction = function ($scope, $http) {

    var vm = this;

    vm.countries = [];
    $http({
        method: "GET",
        url: "api/countryCodes.json"
    }).then(function mySuccess(response) {
        vm.countries = response.data;
    }, function myError(response) {
        vm.countries = response.statusText;
    });

    vm.days = [];
    vm.GetDays = function (days) {
        if (days != vm.days.length) {
            vm.days = [];
            for (let i = 1; i <= days; i++) {
                if (i < 10)
                    vm.days.push("0" + i);
                else
                    vm.days.push(i);
            }
        }
    }

    vm.months = {};
    $http({
        method: "GET",
        url: "api/months.json"
    }).then(function mySuccess(response) {
        vm.months = response.data;
    }, function myError(response) {
        vm.months = response.statusText;
    });

    vm.years = [];
    vm.GetYears = function (year1, year2) {
        for (let i = year1; i <= year2; i++) {
            vm.years.push(i);
        }
        vm.years.sort( (a, b) => {return b-a;} );
    }

    vm.onSelectCallback = function (item) {
        var days = item['value'].days;
        vm.GetDays(days);
    };

    vm.init = function () {
        vm.user = {
            fullName: "",
            countryCode: "",
            phone: "",
            gender: "",
            birthDay: "",
            birthMonth: "",
            birthYear: ""
        };
        vm.GetDays(31);
        var date = new Date();
        var currentYear = date.getFullYear();
        vm.GetYears(currentYear - 100, currentYear);
    }

    vm.send = function () {
        if($scope.registerForm.$valid) {
            console.log("user name: " + vm.user.fullName);
            console.log("user phone: " + vm.user.countryCode.dial_code + " " + vm.user.phone);
            console.log("user gender: " + vm.user.gender);
            console.log("user date of birth: " + vm.user.birthDay + "/" + vm.user.birthMonth + "/" + vm.user.birthYear);
        }
    }

}
app.controller('formCtrl', formCtrlFunction);
formCtrlFunction.$inject = ['$scope', '$http'];

