var firebaseConfig = {
    apiKey: "AIzaSyA6khYY14S8H34EQvPChp9lTCDEfxSLWf4",
    authDomain: "trains-3.firebaseapp.com",
    databaseURL: "https://trains-3.firebaseio.com",
    projectId: "trains-3",
    storageBucket: "",
    messagingSenderId: "1090157878967",
    appId: "1:1090157878967:web:6c5de5a808d64da1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dataRef = firebase.database()


dataRef.ref().on("child_added", function(childSnapshot) {
  
    const data = childSnapshot.val();

    const $newRow = $("<tr>")
    const $tabledata1 = $("<td>").text(data.name);
    const $tabledata2 = $("<td>").text(data.destination);
    const $tabledata3 = $("<td>").text(data.frequency);
    const mathData = mathMagic(data.frequency,data.time)
    const $tabledata4 = $("<td>").text(mathData.nextArrival.format("HH:mm"))
    const $tabledata5 = $("<td>").text(mathData.tMinutesTillTrain)
    $newRow.append($tabledata1, $tabledata2, $tabledata3, $tabledata4, $tabledata5)
    $("#trainList").append($newRow); 
 
   });
 
   $("#myform").on("submit", function(event){
       event.preventDefault(); 
       
       const newTrain = {
           name:$("#1").val(), 
           destination: $("#2").val(),
           time: $("#3").val(),
           frequency: $("#4").val(),       }
 
       dataRef.ref().push(newTrain);
   })
 function mathMagic(frequency,time){
     
     let firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
     let currentTime = moment();
     let diffTime = currentTime.diff(firstTimeConverted, "minutes");
     let minutesAway = diffTime % frequency;
     let tMinutesTillTrain = frequency - minutesAway;
     let nextArrival = moment().add(tMinutesTillTrain, "minutes");

    //  modular %
    //  return an object using es6 syntax
     return {nextArrival, tMinutesTillTrain};
 }
//  calculate times correctly  and adding them all to pg.  