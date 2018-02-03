
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCt3DeRIbp3EayMMdMdu8LSaPi735lGWFo",
    authDomain: "train-times-c2ff6.firebaseapp.com",
    databaseURL: "https://train-times-c2ff6.firebaseio.com",
    projectId: "train-times-c2ff6",
    storageBucket: "",
    messagingSenderId: "731485325698"
  };
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var name = $("#name").val().trim();
  
  var destination = $("#destination").val().trim();
  
var time = moment($("#time").val(), "hh:mm").subtract(1, "years");
console.log(time);

  var frequency = $("#frequency").val().trim();
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: name,
    destination: destination,
    time: time,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Alert
  alert("Train Added");

  // Clears all of the text-boxes
  $("#name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});
var thisTime = function(){
  time = moment().format('HHmm');
  mins = time % 100;
  hours = (time-mins)/100
  timeArr = [hours,mins]
  return timeArr;

}
var convertTime = function(arg){
  if (arg.length === 5){
    hours = ''+arg[0]+arg[1];
    hours = parseInt(hours.trim());
    mins = ''+arg[3]+arg[4];
    mins = parseInt(mins.trim());
    return [hours,mins];
    
  } 
}

    // First Time (pushed back 1 year to make sure it comes before current time)
    var timeConverted = moment(time, "hh:mm").subtract(1, "years");
    console.log(timeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  // console.log(childSnapshot.getKey())

  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log(name);
  console.log(destination);
  console.log(time);
  console.log(frequency);

  // Add each train's data into the table
  $("#trainTimes > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  time + "</td><td>" + frequency + "</td><td>" + tMinutesTillTrain + "</td><td>" + nextTrain +"</td></tr>");
}); 