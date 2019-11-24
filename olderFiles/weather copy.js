//
$(document).ready(function(){

//create weather button and on click run function. We need to create weather button in HTML.  
  $('#checkWeather').click(function(){

//User will need to enter their tripLocation/destination which will be assigned an ID in HTML. 

//this is how the app will relay the destination information to the API
    var tripLocation = $('#tripLocation').val();

//if the user leaves destination area blank, the app needs to alert them that a tripLocation has to be entered.    
    if(tripLocation == ''){

//my location API link goes here. Need to make sure that the information is delivered in correct unit. 
      $.ajax({

        url:"http://weatherbit-v1-mashape.p.rapidapi.com" /* RapidAPI */+ tripLocation + "f32ce10fcdmshf3587c309489b02p1c2f4ejsn5886632c5b19"//my Rapid API Key
        type:"GET",
        dataType:"jsonp",
        success: finction(data){
            
        }
        console.log(data)
        //my location API link goes here. Need to make sure that the information is delivered in correct unit.

      });
    }else{
      $("#error").html('Please enter destination here');
    }

  });

});