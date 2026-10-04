// ==========================================
// EventEase - Main JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("EventEase JavaScript loaded.");

    // ==========================================
    // Registration
    // ==========================================

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const message = document.getElementById("registerMessage");

            message.textContent = "Testing connection...";

            try {

                // Check whether Supabase is loaded
                if (typeof supabase === "undefined") {

                    message.textContent =
                        "ERROR: Supabase is not loaded.";

                    return;
                }

                message.textContent =
                    "Supabase loaded. Creating account...";


                const fullName =
                    document.getElementById("fullName").value.trim();

                const email =
                    document.getElementById("email").value.trim();

                const phone =
                    document.getElementById("phone").value.trim();

                const password =
                    document.getElementById("password").value;

                const confirmPassword =
                    document.getElementById("confirmPassword").value;


                // Validation

                if (fullName.length < 2) {

                    message.textContent =
                        "Please enter your full name.";

                    return;
                }

                if (!/^[0-9]{10}$/.test(phone)) {

                    message.textContent =
                        "Please enter a valid 10-digit phone number.";

                    return;
                }

                if (password.length < 6) {

                    message.textContent =
                        "Password must contain at least 6 characters.";

                    return;
                }

                if (password !== confirmPassword) {

                    message.textContent =
                        "Passwords do not match.";

                    return;
                }


                // Supabase signup

                const result = await supabaseClient.auth.signUp({

                    email: email,

                    password: password,

                    options: {
                        data: {
                            full_name: fullName,
                            phone: phone
                        }
                    }

                });


                console.log("Supabase result:", result);


                if (result.error) {

                    message.textContent =
                        "Supabase error: " + result.error.message;

                    return;
                }


                message.textContent =
                    "SUCCESS! Account created. Check your email if verification is required.";

                registerForm.reset();


            } catch (error) {

                console.error("REAL ERROR:", error);

                message.textContent =
                    "REAL ERROR: " + error.message;

            }

        });

    }


    // ==========================================
    // Login
    // ==========================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const message =
                document.getElementById("loginMessage");

            const email =
                document.getElementById("loginEmail").value.trim();

            const password =
                document.getElementById("loginPassword").value;


            if (!email || !password) {

                message.textContent =
                    "Please enter your email and password.";

                return;
            }


            try {

                  const result =
                     await supabaseClient.auth.signInWithPassword({

                        email: email,

                        password: password

                    });


                if (result.error) {

                    message.textContent =
                        "Login error: " + result.error.message;

                    return;
                }


                message.textContent = "Login successful!";

                    setTimeout(async function () {

                        const {
                       data: profile,
                     error: profileError
                  } = await supabaseClient
                      .from("profiles")
                     .select("role")
                    .eq("id", result.data.user.id)
                       .single();

                  if (profileError || !profile) {
                       message.textContent =
                        "Unable to determine your account role.";
                      return;
            }

                  if (profile.role === "admin") {

                      window.location.href = "admin.html";

                } else {

                       window.location.href = "dashboard.html";
    
          }

             }, 1000); 


            } catch (error) {

                console.error(error);

                message.textContent =
                    "Login error: " + error.message;

            }

        });

    }

});