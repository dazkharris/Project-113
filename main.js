Webcam.set = ({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured-image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:',  ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wyvYcX2eJ/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        gesture = results[0].label;


        toSpeak = "";

        if (gesture == "amazing") {
            toSpeak = "This is looking amazing";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
        } else if (gesture == "best") {
            toSpeak = "All the best";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
        } else if (gesture == "victory") {
            toSpeak = "That was a marvellous victory";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
        }

        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}