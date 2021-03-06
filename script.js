console.log('I am connected to HTML');
var currentDay = $("#currentDay");
var scheduleArea = $(".schedule");
var timeRow = $(".time-row");
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");
var toDoItems = [];

function startSchedule(){

  timeRow.each(function(){
  var thisRow = $(this);
  var thisRowHr = parseInt(thisRow.attr("data-hour"));

  var todoObj = {
    hour: thisRowHr,
    text: "",
  }
  toDoItems.push(todoObj);
});
// Looping all rows, save to local storage
localStorage.setItem("todos", JSON.stringify(toDoItems)); 
};

function saveIt(){
var hourToUpdate = $(this).parent().attr("data-hour");
var itemToAdd = (($(this).parent()).children("textarea")).val(); 
for (var i = 0; i < toDoItems.length; i++){
  if (toDoItems[i].hour == hourToUpdate){
   
    toDoItems[i].text = itemToAdd;
  }
}
localStorage.setItem("todos", JSON.stringify(toDoItems));
renderSchedule();
}

//format the rows colors depending on time
function setUpRows(){
timeRow.each(function(){
var thisRow = $(this);
var thisRowHr = parseInt(thisRow.attr("data-hour"));

// style rows to show where we are in the day
if (thisRowHr == currentHour) {
  thisRow.addClass("present").removeClass("past future");
}
if (thisRowHr < currentHour) {
  thisRow.addClass("past").removeClass("present future");
}
if (thisRowHr > currentHour) {
  thisRow.addClass("future").removeClass("past present");
}
});
}

function renderSchedule(){

toDoItems = localStorage.getItem("todos");
toDoItems = JSON.parse(toDoItems);
  
for (var i = 0; i < toDoItems.length; i++){
  var itemHour = toDoItems[i].hour;
  var itemText = toDoItems[i].text; 
 
  $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
}
}
$(document).ready(function(){
setUpRows();

if(!localStorage.getItem("todos")){

startSchedule();
}

//display current date
currentDay.text(currentDate);

//render schedule from local storage
renderSchedule();
//when a todo item save button is clicked, save it
scheduleArea.on("click", "button", saveIt);

});