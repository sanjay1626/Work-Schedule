//Declared global variable 
let DayTime = {
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
  };


$(document).ready(function() {
//Store input using local storage JSON 
    if(!localStorage.getItem('DayTime')) {
        updateTasks(DayTime);
      } else {
        updateTasks(JSON.parse(localStorage.getItem('DayTime')));
      }
    })
 ///Display day using moment.js
    $('#currentDay').text(moment().format('dddd') + "," + moment().format('MMMM Do'));
   

//TIme Validation if past,present or future hour
let counter = 1;
for(const property in DayTime) {
  let textEntry = "#text-area" + counter;
  $(textEntry).text(DayTime[property]);
  let timeId = "#hour" + counter;
  let presentHour = moment().hour();
  let timeString = $(timeId).text();
  let timeNumber = hourNumberFromHourString(timeString);  
  if(timeNumber < presentHour) {
    $(textEntry).addClass("past");
    $("<past>").text("Past Event")
  
  
  } else if (timeNumber > presentHour) {
    $(textEntry).addClass("future");
    $(".future").text("Future Event")
  } else {
    $(textEntry).addClass("present").text("Present Event");
    
  }
  counter++;
}

///Save Button
$("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    
    saveSchedule(hourString, value);
  });

//Number to strings hours
function hourNumberFromHourString(hourString) {
    switch(hourString) {
    
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
    }
  }
//Local Storage Functions
 
  //Initialize and save to Local Storage
  function initializeLocalStorage() {
    localStorage.setItem('DayTime', JSON.stringify(DayTime));
  };
  
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('DayTime', JSON.stringify(dayObj));
  }
  
  function saveSchedule(hourString, val) {
    if(!localStorage.getItem('DayTime')) {
      initializeLocalStorage();
    }
  
    let workHours = JSON.parse(localStorage.getItem('DayTime'));
    workHours[hourString] = val
  
    saveToLocalStorage(workHours);
  }
  //Update task
  function updateTasks(dayObject) {
   
    $(".input-row").each(function(index){
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }
