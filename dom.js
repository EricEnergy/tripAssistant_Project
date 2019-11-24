$(document).ready(function(){
// landing page dom
var logo = $('<img>').attr('src', 'images/optimisedLogo.svg').attr('class', 'logo');
var welcomePage = $('<div>').attr('id', 'welcomePage');
var welcomeText = $('<h1>').text('Plan your trip');
var welcomeSubText = $('<p>').text('Click to start a new trip or select from one of your upcoming trips');
var newTripBtn = $('<button>').attr('id', 'newTripBtn').text('Create a new itinerary');
var upcomingTripsBtn = $('<button>').attr('id', 'upcomingTripsBtn').text('See upcoming trips');
var upcomingTripsDisplay = $('<div>').attr('id', 'upcomingTripsDisplay');
var upcomingTripsHeader = $('<h2>').attr('id', 'upcomingTripsHeader').text('Upcoming Trips');
$('body').prepend(logo);
$('body').append(welcomePage);
welcomePage.append(welcomeText, welcomeSubText, newTripBtn, upcomingTripsBtn);

// $('body').prepend(logo);
$('body').append(upcomingTripsDisplay);

// close button
var closeBtn = $('<p>').attr('class', 'closeBtn').append($('<span>').text('X'));
var formLine = $(`<svg class="graphic" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
</svg>`);

// new trip input
var tripInput = $('<form>').attr('id', 'tripInput');
var tripInputDiv1 = $('<div>');
var tripInputDiv2 = $('<div>');
var tripInputDiv3 = $('<div>');
var tripLocation = $('<input>').attr('type', 'text').attr('id', 'tripLocation').attr('required', 'true');
var locationLabel = $('<label>').attr('for', 'tripLocation').text('Where are you going?');
var tripStartDate = $('<input>').attr('type', 'date').attr('id', 'tripStartDate').attr('required', 'true');
var tripStartLabel = $('<label>').attr('for', 'tripStartDate').text('Trip Start');
var tripEndDate = $('<input>').attr('type', 'date').attr('id', 'tripEndDate').attr('required', 'true');
var tripEndLabel = $('<label>').attr('for', 'tripEndDate').text('Trip End');
var tripBtn = $('<button>').attr('id', 'tripBtn').text('Plan Trip!');
var tripLocationValue;
var lata;
var long;

$('body').append(tripInput);
tripInput.append((tripInputDiv1.append(tripLocation, formLine.clone(), locationLabel)));
tripInput.append((tripInputDiv2.append(tripStartDate, formLine.clone(), tripStartLabel)));
tripInput.append((tripInputDiv3.append(tripEndDate, formLine.clone(), tripEndLabel)));
tripInput.append(tripBtn, closeBtn);

//Trip Page
var tripPage = $('<div>').attr('id', 'tripPage');
var backBtn = $('<button>').attr('class', 'backBtn').html('&larr; Back');
var searchActivitiesBtn = $('<button>').attr('class', 'searchActivitiesBtn').text('+');


//localStorage.clear()

var tDates = [], tID;   //variables to pass values to object
var tripsArr = [];      //object for local storage

//function to extract user date input for getDates function
function getDatesArray(event){

    //Extract date elements from Start Date
    var startDate = new Date($("#tripStartDate").val());
    var startDay = startDate.getDate() + 1;
    var startMonth = startDate.getMonth();
    var startYear = startDate.getFullYear();
    
    //Extract date elements from End Date
    var endDate = new Date($("#tripEndDate").val());
    var endDay = endDate.getDate() + 1;
    var endMonth = endDate.getMonth();
    var endYear = endDate.getFullYear();
    
    //Call function that will create array of dates
    tDates = [];
    var dates = getDates(new Date(startYear,startMonth,startDay), new Date(endYear,endMonth,endDay));                                                                                                           
    dates.forEach(function(date) {
        var dateStr = date.toString().split(' ').join('').substring(0,12);
        var str = tripLocationValue + dateStr;
        var result = str.split(' ').join('');
    //Add individual dates to dates array
    tDates.push(
        {
            //JSON.parse(localStorage.trips).data[tripId].tripName
            tripDatesId: result,
            name: date,
            activities: []
        });
    })
    clearTripForm();
};

//Function to create array of dates
var getDates = function(startDate, endDate) {
    var dates = [],
        currentDate = startDate,
        addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};

//function to store tripID
function getTripID(event) {
    var startDate = $("#tripStartDate").val();
    tID = $("#tripLocation").val() + "-" + startDate;//this line creates the tripID
    tID = tID.split(' ').join('');
}


function createTripPage(tripId) {
    var trips = JSON.parse(localStorage.trips);
    $('body').append(tripPage);
    $('body').attr('class', 'tripPageModal');
    tripPage.html('');
    tripPage.append(backBtn);
    tripPage.append($('<h2>').text(trips.data[tripId].tripName));
    
    datesActivities = trips.data[tripId].tripDates;
    datesActivities.forEach(function(item, index){
        var activitiesDiv = $('<div>').attr('data-value', `${item.tripDatesId}`).attr('data-index', index);
        var activitiesPerDay = $('<ul>');
        tripPage.append(activitiesDiv);
        activitiesDiv.append(`<h3>${item.name}</h3>`);
        activitiesDiv.append(activitiesPerDay);
        item.activities.forEach(activitiyItem=>{
            activitiesPerDay.append($('<li>').text(activitiyItem));
        });
        if (activitiesPerDay.html() === ''){
            activitiesPerDay.append( $('<li>').attr('class', 'notScheduled').text('No Activities Scheduled') );
        }
        activitiesDiv.append(searchActivitiesBtn.clone().attr('data-value', `${item.tripDatesId}`).attr('data-index', index));
    })
    
    localStorage.setItem('trips', JSON.stringify(trips));
    getWeather(trips.data[tripId].tripName);
}
function clearTripForm(){
    tripLocation.val('');
    tripStartDate.val('');
    tripEndDate.val('');
}
function populateUpcomingTripsDisplay (){
    $('body').attr('class', 'upcomingTripsModal');
    $(upcomingTripsDisplay).html('');
    upcomingTripsDisplay.append(backBtn);
    upcomingTripsDisplay.append(upcomingTripsHeader);
    if (localStorage.trips){
        JSON.parse(localStorage.trips).data.forEach(item => {
            $(upcomingTripsDisplay).append( $('<p>').attr('id', item.tripID).text(item.tripName));
        });
    } else {
        $(upcomingTripsDisplay).append( $('<p>').text('No Upcoming Trips Planned'))
    }
}
function getLataLong(event) {
    tripLocationValue = tripLocation.val().toLowerCase();

    var queryURL = `https://api.opentripmap.com/0.1/en/places/geoname?name=${tripLocationValue}&apikey=5ae2e3f221c38a28845f05b6f0fdbe212d0570adee77bc404c19df22`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Printing the entire object to console   response.lon 36.16589 response.lat -86.78444
        getTripID(event);
        getDatesArray(event);
        var tripsArr = [];
        if (localStorage.trips) {
            tripsArr = JSON.parse(localStorage.trips).data;
        }
        var trip = {
                    tripID : tID,
                    tripDates : tDates,
                    tripName : tripLocationValue,
                    lat : response.lat,
                    lon : response.lon
                    };
        tripsArr.push(trip);
        var data  = {
            data: tripsArr
        };
        localStorage.setItem("trips", JSON.stringify(data));
        $('body').toggleClass('newTripModal');
        populateUpcomingTripsDisplay();
    });
}

var checkListItems = ["tourist_facilities", "cafes", "bars", "adult", "shops", "natural", "historic", "religion", "architecture", "cultural"];
var selectedItems = [];
var activitiesCheckBoxForm = $('<form>').attr('id', 'activitiesCheckBoxForm');
var activitiesCheckBoxSearch = $('<button>').attr('class', 'activitiesCheckBoxSearch').text('Search');
var activitiesSearchResultsPanel = $('<div>').attr('id', 'activitiesSearchResultsPanel');

function createAForm(targetDataValue) {
    $('body').attr('class', 'activitiesCheckModal tripPageModal');
    $('body').append(activitiesCheckBoxForm.attr('data-value', targetDataValue));
    activitiesCheckBoxForm.html('');
    activitiesCheckBoxForm.append(closeBtn.clone());
    activitiesCheckBoxForm.append( $('<h3>').text('Select from the list below') );

    for (var k = 0; k < checkListItems.length; k++) {
        activitiesCheckBoxForm.append(`<div><input id="category${k}" type="checkbox" name="${checkListItems[k]}" class="categoryChecks"><label for="category${k}">${checkListItems[k]}</label></div>`);
    }
    activitiesCheckBoxForm.append(activitiesCheckBoxSearch);

    $(document).on('click', '.activitiesCheckBoxSearch', function(event){
        event.preventDefault();
        $('body').attr('class', 'activitiesSearchResultsModal tripPageModal');
        selectedItems = [];
        $('input:checked').map(function(){
            selectedItems.push( $(this).attr('name'));   
        }).get();        
        // how to assign object variable for lat and lon that exist in the appropriate field
        // var long = -86.7844;
        // var lata = 36.1658;
        var lata = JSON.parse(localStorage.trips).data[tripListId].lat;
        var long = JSON.parse(localStorage.trips).data[tripListId].lon;
        var kindOf = selectedItems.toString();
        var limitOf = "40";
        var limitDistance = 20000;


        var locationURL = "https://api.opentripmap.com/0.1/en/places/radius?lang=en&radius=" + limitDistance + "&lon=" + long + "&lat=" + lata + "&kinds=" + kindOf + "&limit=" + limitOf + "&apikey=5ae2e3f221c38a28845f05b6f0fdbe212d0570adee77bc404c19df22";

        $.ajax({
            url: locationURL,
            method: "GET"
        }).then(function (locationResponse) {
            activitiesSearchResultsPanel.html('');
            activitiesSearchResultsPanel.attr('data-value', targetDataValue);
            $('body').append(activitiesSearchResultsPanel);
            activitiesSearchResultsPanel.append(closeBtn.clone());
            activitiesSearchResultsPanel.append($('<span>').attr('class', 'mask'));
            activitiesSearchResultsPanel.append( $('<h2>').text('What do you want to do?') );
            var activitiesSearchInnerDiv = $('<div>');
            activitiesSearchResultsPanel.append(activitiesSearchInnerDiv);
            for (var i = 0; i < locationResponse.features.length; i++) {
                if (locationResponse.features[i].properties.name !== "") {
                    var activitiesSearchResult = $('<p>').attr('class', 'activitiesSearchResult').attr('data-value', targetDataValue).text(locationResponse.features[i].properties.name);
                    activitiesSearchInnerDiv.append(activitiesSearchResult);
                    // $('.h3').append('<div class="result' + i + '"> ' + '<h3 style="display: inline;" id="c3p' + i + '">' + '<button class="' + "b" + i + '">' + locationResponse.features[i].properties.name + '</button></h3></div><br>');
                }
            }
        })
    });
}
function getWeather(city) {
    //this is how the app will relay the destination information to the API
    var tripLocation = city; //changed to a variable to test and make an easier call
    //if the user leaves destination area blank, the app needs to alert them that a tripLocation has to be entered. This API will recognize location by name instead of requiring Lat and Lon.
    if (tripLocation !== "") {
    //my location API link goes here.
    var APIKey = "f32ce10fcdmshf3587c309489b02p1c2f4ejsn5886632c5b19"; 
    // Here we are building the URL we need to query the database.This originally had the wrong end tag. Needed to add "?q=" ***research***
    var queryURL =
        "https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=" + tripLocation;

    // We then created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
        //had to add in headers to retrieve information. ***research***
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": APIKey
        }
        //this for loop wil convert the needed information to just output the selected info needed to generate the 7 day forecast
        }).then(function(response) {
            var weatherBox = $('<div>').attr('class', 'weatherBox');
            tripPage.prepend(weatherBox);
            for (var i = 0; i < 3; i++) {
         //returns 7 days of info
            var iconCode = response.list[i].weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
            var hiTemp = parseInt((response.list[i].temp.max - 273.15) * 1.8 + 32); //convert from Kelvin to Fahrenheit

            var loTemp = parseInt((response.list[i].temp.min - 273.15) * 1.8 + 32); //convert from Kelvin to Fahrenheit
            weatherBox.append( $('<div>').attr('class', 'weatherPlace').append( $('<img>').attr('src', iconUrl)).append( $('<h4>').text(`min: ${loTemp}`)).append( $('<h4>').text(`max: ${hiTemp}`)));
        }
    });
    }
}
//button functions
$(document).on('click', '.backBtn', event=>{
    event.preventDefault();
    $('body').attr('class', '');
})
newTripBtn.on('click', event=>{
    event.preventDefault();
    $('body').toggleClass('newTripModal');
});
$(tripInput).on('click','.closeBtn', function(event){
    $('body').toggleClass('newTripModal');
    clearTripForm();
})
$(activitiesCheckBoxForm).on('click', '.closeBtn', function(event){
    $('body').toggleClass('activitiesCheckModal');
    // reset checkboxes?
})
$(activitiesSearchResultsPanel).on('click', '.closeBtn', function(event){
    $('body').toggleClass('activitiesSearchResultsModal');
})
$("#tripBtn").on("click", function(event) {
    event.preventDefault();
    getLataLong(event);
})
$(upcomingTripsDisplay).on('click', 'p', function(event){
    var tripListArray = JSON.parse(localStorage.trips).data;
    var tripListId =  tripListArray.findIndex( x => x.tripID === this.id );
    createTripPage(tripListId);
})

var tripListId;
$(document).on('click', '.searchActivitiesBtn', function(event) {
    event.preventDefault();
    var tripListArray = JSON.parse(localStorage.trips).data;
    var targetDataValue = $(this).data('value');
    tripListId = tripListArray.findIndex(function(x) {
        return x.tripDates[$(this).data('index')].tripDatesId === targetDataValue;
    }.bind(this));
    createAForm(targetDataValue);
})
$(document).on('click', '.activitiesSearchResult', function(event){
    var trips = JSON.parse(localStorage.trips);
    var resultContent = $(this).text();
    var tripListArray = trips.data;
    var searchResultItem = $(this).data('value');
    tripListArray.forEach( function(tripItem){
        let tripResult = tripItem.tripDates.findIndex(x => x.tripDatesId === searchResultItem);
        if (tripResult >= 0 ) {
            tripItem.tripDates[tripResult].activities.push(resultContent);
            localStorage.setItem('trips', JSON.stringify(trips));
            var appendLi = $(`div[data-value=${searchResultItem}]`).children('ul');
            var notScheduledLi = appendLi.children( $('.notScheduled') ); //$('<li class="notScheduled">');
            $(notScheduledLi).attr('class', 'notScheduled hidden') ;
            appendLi.append( $('<li>').text(resultContent) );
            //$(`div[data-value=${searchResultItem}]`).children($('ul').append($('<li>').text(resultContent)));
        } else ( console.log('didnt find it') );

    }.bind(this));
    $('body').toggleClass('activitiesSearchResultsModal');
})
$(document).on('click', '#upcomingTripsBtn', function(event) {
    event.preventDefault();
    populateUpcomingTripsDisplay();
});


});
