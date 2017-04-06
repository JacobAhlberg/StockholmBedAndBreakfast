var reservationInformation = {
    checkIn: '',
    checkOut: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNmb: '',
    room: '',
    adults: 1,
    children: 0,
    price: 0,
    days: 0
}

angular.module('app.controllers', [])
  
.controller('page2Ctrl', ['$scope', '$stateParams', function ($scope, $stateParams) {}])
   
.controller('rumCtrl', function ($scope, $http, $stateParams, $state) {
    $http.get('js/data.json').success(function(data){
        $scope.rooms = data;
    })
})
      
.controller('informationCtrl', function ($scope, $http, $stateParams, $state) {
    //Get the JSON-data with $http service
    $http.get('js/data.json').success(function(data){
        $scope.rooms = data;
    })

    //get the room id
    $scope.whichRoom = $state.params.rId;

    //Adds the name and price to the global variable
    $scope.addRoom = function(room){
        reservationInformation.room = room.name;
        reservationInformation.price = room.price;
    }
})
   
.controller('reservationCtrl', function ($scope, $http, $stateParams, $state) {
    //Read reservationInformation data to a scope
    $scope.reservationInformation = reservationInformation;

    //Calculates the amount of days between the dates
    $scope.calcDays = function(item){
        var diff = new Date(item.checkOut) - new Date(item.checkIn);
        reservationInformation.days = ((((diff / 1000) / 60) / 60) / 24);
    }

    //Makes current day as minimum value for the date-input
    $scope.todayDate= function() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        if(mm < 10)  mm = '0' + mm.toString();
        if(dd < 10)  dd = '0' + dd.toString();

        var todayString = yyyy + '-' + mm + '-' + dd;
        $scope.dateToday = todayString;
    }

    //Makes checkout-date as minimum depending on the checkin-date
    $scope.minDayForCheckOut = function(){
        var checkInDate = new Date(reservationInformation.checkIn);
        var dd = checkInDate.getDate();
        var mm = checkInDate.getMonth()+1;
        var yyyy = checkInDate.getFullYear();

        if(mm < 10)  mm = '0' + mm.toString();
        if(dd < 10)  dd = '0' + dd.toString();

        var minDayString = yyyy + '-' + mm + '-' + dd;
        $scope.minCheckOut = minDayString;
    }


})
   
.controller('confirmationCtrl', function ($scope, $stateParams) {
    //Read reservationInformation data to a scope
    $scope.confirmation = reservationInformation;

    //Returns the total price for the nights
    $scope.totalCost = function(item){
        return item.price * item.days;
    }

    //A functino that sets formatted dates
    $scope.formatedDates = function(checkInDate, checkOutDate) {
        var dd = checkInDate.getDate();
        var mm = checkInDate.getMonth()+1;
        var yyyy = checkInDate.getFullYear();

        if(mm < 10)  mm = '0' + mm.toString();
        if(dd < 10)  dd = '0' + dd.toString();

        $scope.confirmation.checkInDate = yyyy + '-' + mm + '-' + dd;    

        dd = checkOutDate.getDate();
        mm = checkOutDate.getMonth()+1;
        yyyy = checkOutDate.getFullYear();

        if(mm < 10)  mm = '0' + mm.toString();
        if(dd < 10)  dd = '0' + dd.toString();

        $scope.confirmation.checkOutDate = yyyy + '-' + mm + '-' + dd;

    }

})
 