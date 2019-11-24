

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
    //Add individual dates to dates array
    tDates.push(
        {
            //JSON.parse(localStorage.trips).data[tripId].tripName
            id: tripLocationValue + date,
            name: date,
            activities: []
        });
    })
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
}