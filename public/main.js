// VIDEO MODAL
function showVideo(title, videoSrc) {
  document.getElementById("videoModal").style.display = "flex";
  document.getElementById("videoTitle").innerText = title;

  const video = document.getElementById("workoutVideo");
  const source = document.getElementById("videoSource");

  source.src = videoSrc;
  video.load();
  video.play();
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("workoutVideo");

  modal.style.display = "none";
  video.pause();
}

function togglePlan(planId){

  const plans = document.querySelectorAll(".plan-days");

  plans.forEach(plan => {
    if(plan.id !== planId){
      plan.style.display = "none";
    }
  });

  const currentPlan = document.getElementById(planId);

  if(currentPlan.style.display === "block"){
    currentPlan.style.display = "none";
  } else {
    currentPlan.style.display = "block";
  }
}

// CLOSE MODAL WHEN CLICK OUTSIDE
window.onclick = function(e) {
  const modal = document.getElementById("videoModal");

  if (e.target == modal) {
    closeVideo();
  }
};

function showVideo(title, videoFile) {
  document.getElementById("videoTitle").innerText = title;
  document.getElementById("videoSource").src = videoFile;
  document.getElementById("workoutVideo").load();
  document.getElementById("videoModal").style.display = "flex";
}

function closeVideo() {
  document.getElementById("workoutVideo").pause();
  document.getElementById("videoModal").style.display = "none";
}

// BMI CALCULATOR
function calculateBMI() {

  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const result = document.getElementById("bmiResult");

  if(height === "" || weight === "") {
    result.innerHTML = "Please enter height and weight.";
    return;
  }

  let bmi = weight / ((height / 100) * (height / 100));
  bmi = bmi.toFixed(1);

  let status = "";

  if(bmi < 18.5){
    status = "Underweight";
  }
  else if(bmi >= 18.5 && bmi <= 24.9){
    status = "Normal Weight";
  }
  else if(bmi >= 25 && bmi <= 29.9){
    status = "Overweight";
  }
  else{
    status = "Obese";
  }

  result.innerHTML = `
    Your BMI is <strong>${bmi}</strong><br>
    Status: <strong>${status}</strong>
  `;
}


// WORKOUT FILTER
function filterWorkout(category) {

  const cards = document.querySelectorAll(".workout-card");

  cards.forEach(card => {

    if(category === "all"){
      card.style.display = "block";
    }
    else{

      if(card.classList.contains(category)){
        card.style.display = "block";
      }
      else{
        card.style.display = "none";
      }

    }

  });

}


// DAILY CHECKLIST
const checkboxes = document.querySelectorAll(".day-check");

checkboxes.forEach(box => {

  box.addEventListener("change", () => {

    let completed = 0;

    checkboxes.forEach(c => {
      if(c.checked){
        completed++;
      }
    });

    document.getElementById("progressText").innerHTML =
      completed + " / " + checkboxes.length + " Days Completed";

  });

});


// DARK HEADER ON SCROLL
window.addEventListener("scroll", () => {

  const header = document.querySelector("header");

  if(window.scrollY > 50){
    header.style.background = "#111";
  }
  else{
    header.style.background = "#242424";
  }

});


// MOTIVATIONAL QUOTES
const quotes = [

  "Push yourself because no one else will do it for you.",
  "Small progress is still progress.",
  "Your body can stand almost anything.",
  "Discipline is stronger than motivation.",
  "Fitness is a journey, not a destination."

];

function randomQuote(){

  const random = Math.floor(Math.random() * quotes.length);

  document.getElementById("quote").innerHTML = quotes[random];

}

setInterval(randomQuote, 4000);

function logout(){
  window.location.href = "login.html";
}
function submitFeedback(){
  const username = localStorage.getItem("loggedInUser") || "User";
  const rating = document.getElementById("feedbackRating").value;
  const message = document.getElementById("feedbackMessage").value;

  if(rating === "" || message === ""){
    alert("Please complete all fields.");
    return;
  }

  const feedback = {
    username: username,
    rating: Number(rating),
    message: message
  };

  let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.push(feedback);

  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  document.getElementById("feedbackRating").value = "";
  document.getElementById("feedbackMessage").value = "";

  displayFeedback();
}

function displayFeedback(){
  const feedbackList = document.getElementById("feedbackList");

  if(!feedbackList){
    console.log("feedbackList not found");
    return;
  }

  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  feedbackList.innerHTML = "";

  feedbacks.slice().reverse().forEach(function(feedback){
    feedbackList.innerHTML += `
      <div class="feedback-item">
        <h4>${feedback.username}</h4>
        <p>${"⭐".repeat(feedback.rating)}</p>
        <p>${feedback.message}</p>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", function(){
  displayFeedback();
});

// START FIRST QUOTE
randomQuote();
