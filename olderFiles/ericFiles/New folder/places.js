
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


$(document).ready(function () {



    var listItems = ["tourist_facilities", "cafes", "bars", "adult", "shops", "amusements", "natural", "historic", "religion", "architecture", "cultural"];

    var selectedItems = [];
    var valueInput;

    function createAForm() {


        $('#form2Location').append('<form id ="formLocation" action="' + selectedItems + '">');

        for (var k = 0; k < listItems.length; k++) {

            $('#formLocation').prepend('<input class="test' + k + '" type="checkbox" name="chkBox' + k + '"><label>' + listItems[k] + '</label><br>');

        }
        $('#form2Location').append('</form>');


        $("input").click(function () {

            if (this) {
                console.log($(this).next().html());
                valueInput = $(this).next().html();
                if (!selectedItems.includes(valueInput)) {
                    console.log(selectedItems);
                    selectedItems.push(valueInput);
                    //   console.log("you made it inside");
                } 
                // else {
                   
                //    // this.remove($(this).next().html().index(), selectedItem);
                //     console.log("removed");
                //     console.log($(this).next().html().index());
                // }
            }

        });
        $( "input" ).dblclick(function() {
            if (!selectedItems.includes(valueInput)) {
                $($(this).next()).append('<button class="buttonDelete"> Delete?</button>');
               // selectedItems.remove($(this).html());
                console.log("hello");
          }});

    }
    createAForm();

    $('#populateList').click(function () {

        // var newLocation= "enter text or a new variable here"
        // var queryURL = "https://api.opentripmap.com/0.1/en/places/geoname?name=" + newLocation + "&apikey=5ae2e3f221c38a28845f05b6f0fdbe212d0570adee77bc404c19df22";
        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // }).then(function (response) {

        // // Printing the entire object to console   response.lon -86.78444 response.lat  36.16589
        // console.log(response); }


        var long = -86.78444;
        var lata = 36.16589;
        var kindOf = selectedItems.toString();
        var limitOf = "40";
        var limitDistance = 2000;

        console.log(kindOf);

        var locationURL = "https://api.opentripmap.com/0.1/en/places/radius?lang=en&radius=" + limitDistance + "&lon=" + long + "&lat=" + lata + "&kinds=" + kindOf + "&limit=" + limitOf + "&apikey=5ae2e3f221c38a28845f05b6f0fdbe212d0570adee77bc404c19df22";

        $.ajax({
            url: locationURL,
            method: "GET"
        }).then(function (locationResponse) {
            console.log(locationResponse);
            console.log(locationResponse.features.length);

            for (var i = 0; i < locationResponse.features.length; i++) {
                if (locationResponse.features[i].properties.name !== "") {
                    console.log("you made it")
                    $('.h3').append('<div class="result' + i + '"> ' + '<h3 style="display: inline;" id="c3p' + i + '">' + '<button class="' + "b" + i + '">' + locationResponse.features[i].properties.name + '</button></h3></div><br>');
                }
            }
            $("button").click(function () {

                if (this.className) {
                    console.log(this.className + " Clicked");
                    var keyName = this.className;
                    var valueInput = $(this).html();
                    localStorage.setItem(keyName, valueInput);

                }

            });
        })





    });
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