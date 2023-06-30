<%-- 
    Document   : register
    Created on : May 27, 2023, 11:06:29 PM
    Author     : Kingc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: "#ea1c00",
                            "dvt-black-1": "#2a303c",
                            "dvt-black-2": "#1b1a21"
                        }
                    }
                }
            };
        </script>
        <link rel="stylesheet" href="./css/global.css" />
        <style type="text/tailwindcss">
            input:focus ~ label,input:valid ~ label {
                top:-20px;
            }

            ::-webkit-scrollbar {
                width: 8px;
            }

            ::-webkit-scrollbar-track {
                background-color: #1b1a21;
            }

            ::-webkit-scrollbar-thumb {
                background-color: #2a303c;
                border-radius: 6px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background-color: #ea1c00;
            }

            body {
                background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
                background-color: #2a303c;
                font-family: 'Roboto', sans-serif;
            }
        </style>
        <title>TOL Login</title>
        <link rel="icon" href="./assets/logovuongtachen.png" type="icon" />
    </head>

    <body>
        <div class="inset-0 absolute bg-cover -z-50"></div>
        <div class="flex justify-center items-center h-screen">
            <div
                class="relative flex justify-center items-center w-[450px] h-[550px] bg-dvt-black-2 rounded-xl"
                >
                <div class="form-value">
                    <form action="/store/register" method="POST" class="flex justify-center flex-col items-center">
                        <h2 class="text-5xl text-white text-center">Register</h2>
                        <div
                            class="relative flex-row justify-center items-center mx-0 my-4 w-80 border-b-2 border-white"
                            >
                            <ion-icon name="mail-outline" class="w-6 h-6 absolute right-2 text-white -top-[10px]"></ion-icon>
                            <input
                                class="w-full h-5 bg-transparent border-none outline-none text-base text-white"
                                type="text"
                                name="username"
                                required
                                autocomplete="off"
                                />
                            <label
                                class="absolute text-white top-[10%] left-0 mb-[-10px] pointer-events-none transition-all"
                                for=""
                                >Username</label
                            >
                        </div>
                        <div
                            class="relative flex-row justify-center items-center mx-0 my-4 w-80 border-b-[2px] border-white"
                            >

                            <ion-icon name="lock-closed-outline" class="w-6 h-6 absolute right-2 text-white top-[-10px]"></ion-icon>
                            <input
                                class="w-full h-5 bg-transparent border-none outline-none text-base text-white"
                                type="password"
                                name="password"
                                required
                                />
                            <label
                                class="absolute text-white top-[10%] left-0 mb-[-10px] pointer-events-none transition-all"
                                for=""
                                >Password</label
                            >
                        </div>

                        <div
                            class="relative flex-row justify-center items-center mx-0 mt-4 w-80 border-b-[2px] border-white"
                            >
                            <ion-icon name="lock-closed-outline" class="w-6 h-6 absolute right-2 text-white top-[-10px]"></ion-icon>
                            <input
                                class="w-full h-5 bg-transparent border-none outline-none text-base text-white"
                                type="password"
                                name="confirmPassword"
                                required
                                />
                            <label
                                class="absolute text-white top-[10%] left-0 mb-[-10px] pointer-events-none transition-all"
                                for=""
                                >Confirm Password</label
                            >
                        </div>



                        <% String errorMessage = (String) request.getAttribute("errorMessage"); %>

                        <% if (errorMessage != null && !errorMessage.isEmpty()) {%>
                        <div class="text-red-500 py-2 px-4 rounded-lg border-red-500 border bg-red-200 mt-3 w-80">
                            <%= errorMessage%>
                        </div>
                        <% }%>



                        <button
                            class="w-[100%] mt-3 h-10 rounded-md bg-primary text-white border-none outline-none cursor-pointer text-xl font-semibold login-button hover:opacity-70"
                            >
                            Register
                        </button>
                        <div
                            class="text-xl text-white text-center mt-2 flex flex-row justify-center items-center register"
                            >
                            <p>
                                Already have an account?<a
                                    class="no-underline text-white font-semibold ml-2 hover:underline hover:text-primary"
                                    href="/store/login"
                                    >Login</a
                                >
                            </p>
                        </div>
                    </form>
                    <div class="text-white text-xl font-semibold flex items-center my-2 gap-3">
                        <div class="h-[2px] flex-1 bg-white"></div>
                        Or
                        <div class="h-[2px] flex-1 bg-white"></div>
                    </div>
                    <div class="mx-auto py-2 px-4 rounded-md bg-white flex items-center justify-center gap-2 cursor-pointer" onclick="handleLoginButtonClick()">
                        <img src="./assets/google.png" alt="google" class="w-7 h-7" />
                        <div class="font-semibold">Đăng nhập bằng Google</div>
                    </div>
                </div>
            </div>
        </div>
        <script
            type="module"
            src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
            nomodule
            src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        ></script>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
        <script src="https://apis.google.com/js/api.js"></script>

        <script>
                        function decodeJwt(jwt) {
                            const tokenParts = jwt.split('.');

                            if (tokenParts.length !== 3) {
                                throw new Error('Invalid JWT format');
                            }

                            const payload = tokenParts[1];
                            const decodedPayload = decodeURIComponent(atob(payload).split('').map((c) => {
                                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                            }).join(''));

                            return JSON.parse(decodedPayload);
                        }



                        function handleCredentialResponse(response) {
                            const decodedPayload = decodeJwt(response.credential);



                            var form = document.createElement('form');
                            form.method = 'POST';
                            form.action = 'http://localhost:8080/store/login';
                            form.style.display = 'none';

                            // Create input fields for user information
                            var googleLoginInput = document.createElement('input');
                            googleLoginInput.type = 'hidden';
                            googleLoginInput.name = 'googleLogin';
                            googleLoginInput.value = 'googleLogin';

                            var userNameInput = document.createElement('input');
                            userNameInput.type = 'hidden';
                            userNameInput.name = 'username';
                            userNameInput.value = decodedPayload.email;

                            var userAvatarInput = document.createElement('input');
                            userAvatarInput.type = 'hidden';
                            userAvatarInput.name = 'avatarUrl';
                            userAvatarInput.value = decodedPayload.picture;

                            // Add the input fields to the form
                            form.appendChild(googleLoginInput);
                            form.appendChild(userNameInput);
                            form.appendChild(userAvatarInput);

                            // Add the form to the document
                            document.body.appendChild(form);

                            // Submit the form
                            form.submit();
                        }

                        function handleLoginButtonClick() {
                            google.accounts.id.initialize({
                                client_id: '834117377959-0aabfn4t7gui4au7aopki3c10h9rsa53.apps.googleusercontent.com',
                                callback: handleCredentialResponse
                            });

                            google.accounts.id.prompt();
                        }
        </script>
    </body>
</html>