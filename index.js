const mysql = require("mysql2");
const conf = require("./conf.js");
const connection = mysql.createConnection(conf);
const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});


const executeQuery = (sql) => {
   return new Promise((resolve, reject) => {      
         connection.query(sql, function (err, result) {
            if (err) {
               console.error(err);
               reject();    
            }
            resolve(result);        
      });
   })
}


const checkLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    const template =" SELECT password FROM utente WHERE nomeutente = '%USERNAME' AND password = '%PASSWORD'";
    const sql = template.replace("%USERNAME", username).replace("%PASSWORD", password);
    executeQuery(sql)
      .then((result) => {
        if (result.length > 0) {
          resolve(true);
          console.log("LOGIN EFFETTUATO");
        } else {
          resolve(false);
           console.log("CREDENZIALI SBAGLIATE");
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + " - " + password);
  checkLogin(username, password)
    .then((result) => {
      if (result === true) {
        res.json({ result: "true" });
      } else {
        res.status(401).json({ result: "false" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ result: "Internal Server Error" });
    });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + " - " + password);
  checkSignIn(username, password).then((result)=>{
    res.json({ username: result });
  });
});

const checkSignIn = (username, password) => {
  if(username.length<1 || password.length<1){
    return false;
  }else{
  return new Promise((resolve, reject) => {
    const template =" SELECT nomeutente FROM utente WHERE nomeutente = '%USERNAME'";
    const sql = template.replace("%USERNAME", username);
    executeQuery(sql)
      .then((result) => {
        if (result.length > 0) {
          resolve(true);
          console.log("UTENTE GIÀ REGISTRATO");
        } else {
           console.log("INSERIMENTO UTENTE NUOVO");
          insertUtente(username, password);
          creaProfilo(username);
          resolve(username);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
  }
};
const insertUtente = (username, password) => {
    const template =" INSERT INTO utente (nomeutente, password) VALUES ('%USERNAME','%PASSWORD')";
    const sql = template.replace("%USERNAME", username).replace("%PASSWORD", password);
    executeQuery(sql)
};
