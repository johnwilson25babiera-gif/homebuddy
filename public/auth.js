const SUPABASE_URL = "https://ehthptzueczdmoeksnca.supabase.co";

const SUPABASE_KEY = "sb_publishable_gQakdzLAMY7F_uMtBpWVHg_piXPTVOJ";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

/* REGISTER */
if (registerForm) {

  registerForm.addEventListener("submit", async function(e) {

    e.preventDefault();

    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Registration successful. Check your Gmail.");

    window.location.href = "login.html";

  });

}

/* LOGIN */
if (loginForm) {

  loginForm.addEventListener("submit", async function(e) {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      alert(error.message);
      return;
    }

    /* SAVE LOGGED IN USER */
    localStorage.setItem("loggedInUser", email);

    alert("Login successful.");

    window.location.href = "home.html";

  });

}