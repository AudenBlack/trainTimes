var config = {
    apiKey: "AIzaSyAuyS2SYOoL5egFnQBVMfu43IPBV6nbQd4",
    authDomain: "traintime-8c2d3.firebaseapp.com",
    databaseURL: "https://traintime-8c2d3.firebaseio.com",
    projectId: "traintime-8c2d3",
    storageBucket: "",
    messagingSenderId: "887986083793"
  };
  firebase.initializeApp(config);

  var firebaseData = firebase.database();

  $('#submit').on('click', function(event){
      event.preventDefault()
      var train = {
          name: $("#name").val().trim(),
          destination: $("#destination").val().trim(),
          firstTrain: $("#time").val().trim(),
          frequency: $("#frequency").val().trim(),
      };

      firebaseData.ref().push(train);

      // clears corresponding input fields
      $("#name").val('')
      $("#destination").val('')
      $("#time").val('')
      $("#frequency").val('')
  })

  firebaseData.ref().on('child_added', function(childSnapshot){
      var name = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var frequency = childSnapshot.val().frequency;
      var firstTrain = childSnapshot.val().firstTrain;

      var firstTrainArriv = moment(firstTrain, "HH:mm")
      var convertTime = moment(firstTrainArriv, "HH:mm").subtract(1, "years")
      var timeDiff = moment().diff(moment(convertTime), "minutes")
      var remainTime = timeDiff % frequency
      var mintilNext = frequency - remainTime
      var newTrain = moment().add(mintilNext, "minutes");

      var trainSched = $("<ul>")
      trainSched.append($("<li>").text("Name: " + name))
      trainSched.append($("<li>").text("Destination: " + destination))
      trainSched.append($("<li>").text("Frequency: " + frequency))
      trainSched.append($("<li>").text("Arrival Time: " + moment(newTrain).format("HH:mm")))
      trainSched.append($("<li>").text("Minutes until next train: " + mintilNext))
      
      $("#trains").prepend(trainSched)
  })