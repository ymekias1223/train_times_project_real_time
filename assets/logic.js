

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


$("#submit").on("click", function(event) {
  event.preventDefault();


  var name = $("#name").val().trim();
  
  var destination = $("#destination").val().trim();
  
  var time =$("#time").val().trim();

  var frequency = $("#frequency").val().trim();

  var newTrain = {
    name: name,
    destination: destination,
    time: time,
    frequency: frequency
  };
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  console.log(name);
  console.log(destination);
  console.log(time);
  console.log(frequency);

  $("#trainTimes > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  time + "</td><td>" + frequency + "</td><td>" + tMinutesTillTrain + "</td><td>" + nextTrain +"</td></tr>");
}); 

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  console.log("Train Added");

  $("#name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});

var time = moment($("#time").val(), "hh:mm").subtract(1, "years");

var timeConverted = moment(time, "hh:mm").subtract(1, "years");

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(timeConverted), "minutes");

var tRemainder = diffTime % frequency;

var tMinutesTillTrain = frequency - tRemainder;

var nextTrain = moment().add(tMinutesTillTrain, "minutes");

