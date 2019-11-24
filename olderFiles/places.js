
//Kinds of places you can search for 
//
//restaurants
//cafe
//bars
//adult
//shops
//amusements
//natural
//historic
//religion
//architecture
//cultural





    var checkListItems = ["tourist_facilities", "cafes", "bars", "adult", "shops", "natural", "historic", "religion", "architecture", "cultural"];
    var selectedItems = [];
    var activitiesCheckBoxForm = $('<form>').attr('id', 'activitiesCheckBoxForm');
    var activitiesCheckBoxSearch = $('<button>').attr('class', 'activitiesCheckBoxSearch').text('Search');

    function createAForm(targetDataValue) {
        $('body').attr('class', 'activitiesCheckModal tripPageModal');
        $('body').append(activitiesCheckBoxForm.attr('data-value', targetDataValue));
        activitiesCheckBoxForm.html('');
        //$('#form2Location').append('<form id ="formLocation" action="' + selectedItems + '">');
        for (var k = 0; k < checkListItems.length; k++) {
            activitiesCheckBoxForm.append(`<input id="category${k}" type="checkbox" name="${checkListItems[k]}" class="categoryChecks"><label for="category${k}">${checkListItems[k]}</label>`);
        }
        activitiesCheckBoxForm.append(activitiesCheckBoxSearch);
        // $("input[type=checkbox]").click(function () {
        //     if (this) {
        //         console.log(this.className + " Clicked");
        //         var valueInput = $(this).next().html();
        //         console.log(selectedItems);
        //         if (!selectedItems.includes(valueInput)) {
        //             selectedItems.push(valueInput);
        //             console.log("you made it inside");
        //         }
        //     }
        // });
        console.log('end of create a form');
    }
    $(document).on('click', '.activitiesCheckBoxSearch', function(event, targetDataValue){
        event.preventDefault();
        $('body').attr('class', 'activitiesSearchResultsModal tripPageModal');
        selectedItems = [];
        $('input:checked').map(function(){
            selectedItems.push( $(this).attr('name'));   
        }).get();        
        // how to assign object variable for lat and lon that exist in the appropriate field
        var long = -86.7844;
        var lata = 36.1658;
        var kindOf = selectedItems.toString();
        var limitOf = "40";
        var limitDistance = 20000;


        var locationURL = "https://api.opentripmap.com/0.1/en/places/radius?lang=en&radius=" + limitDistance + "&lon=" + long + "&lat=" + lata + "&kinds=" + kindOf + "&limit=" + limitOf + "&apikey=5ae2e3f221c38a28845f05b6f0fdbe212d0570adee77bc404c19df22";

        $.ajax({
            url: locationURL,
            method: "GET"
        }).then(function (locationResponse) {
            var activitiesSearchResultsPanel = $('<div>').attr('id', 'activitiesSearchResultsPanel').attr('data-value', targetDataValue);
            $('body').append(activitiesSearchResultsPanel);
            console.log(locationResponse);
            for (var i = 0; i < locationResponse.features.length; i++) {
                if (locationResponse.features[i].properties.name !== "") {
                    var activitiesSearchResult = $('<p>').attr('class', 'activitiesSearchResult').attr('data-value', targetDataValue).text(locationResponse.features[i].properties.name);
                    activitiesSearchResultsPanel.append(activitiesSearchResult);
                    // $('.h3').append('<div class="result' + i + '"> ' + '<h3 style="display: inline;" id="c3p' + i + '">' + '<button class="' + "b" + i + '">' + locationResponse.features[i].properties.name + '</button></h3></div><br>');
                }
            }
            // $("button").click(function () {

            //     if (this.className) {
            //         console.log(this.className + " Clicked");
            //         var keyName = this.className;
            //         var valueInput = $(this).html();
            //         localStorage.setItem(keyName, valueInput);

            //     }

            // });
        })





    });



// this is going to store the selected activities the consumer wants to do






                     // This below is just saved stuff to ref or store



//http://api.opentripmap.com/0.1/en/places/xid/Q372040?apikey=5ae2e3f221c38a28845f05b6f0fdbe212d0570adee77bc404c19df22


/// this is just in case we want to not have the results printed as a button but as a string with a button next to it.

// $("button").click(function () {

//     if (this.className) {
//         console.log(this.className + " Clicked");
//         var keyName = this.className;
//         var valueInput = $(this).prev().html();
//         localStorage.setItem(keyName, valueInput);

//     }

// });