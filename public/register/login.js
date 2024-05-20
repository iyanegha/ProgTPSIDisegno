const Nome = document.getElementById("Nome");
const pass = document.getElementById("Password");

const LoginButton = document.getElementById("Login");


const Login = (ArrayUtenze) => {
  return new Promise((resolve, reject) => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ArrayUtenze),
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


LoginButton.onclick = () => {
  let saveArray = {
    username: Nome.value,
    password: pass.value,
  };

    Login(saveArray)
    .then((response) => {
      console.log("Response from server:", response);
      if (response.result === "true") {
          window.location.href = "/homepage/homepage.html";
        }
    })
    .catch((error) => {
      console.error("Error:", error);
      console.log("error");
    });
};
