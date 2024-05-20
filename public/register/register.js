const Nome = document.getElementById("Nome");
const pass = document.getElementById("Password");

const RegisterButton = document.getElementById("Register");

const register = (arrayUtenze) => {
  return new Promise((resolve, reject) => {
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arrayUtenze),
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

RegisterButton.onclick = () => {
  let arrayutenze = {
    username: Nome.value,
    password: pass.value,
  };

  register(arrayutenze)
    .then((response) => {
      console.log("Response from server:", response);
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });


};
