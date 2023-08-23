// IMPORT
var express = require("express"); // Web Framework
var app = express();
const { Client } = require("pg");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const pgConfig = {
  user: "postgres",
  host: "127.0.0.1",
  database: "nu3tion",
  password: "root",
  port: 5432,
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Autorise tous les domaines, ceci est un exemple, en production spécifiez les domaines autorisés
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Méthodes HTTP autorisées
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // En-têtes autorisés
  next();
});
// Serveur express
var server = app.listen(8001, "127.0.0.1", function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host);
  console.log(port);
  console.log("app listening at http://%s:%s", host, port);
});
// Endpoints
function connexion_database_and_execute_query(query, req, res, values) {
  const client = new Client(pgConfig);

  client.connect(function (err) {
    if (err) {
      console.log("Error connecting to PostgreSQL:", err);
      res.status(500).send("Error connecting to database");
    } else {
      console.log("Connected to database!");
      console.log(query);
      client.query(query, values, function (err, result) {
        if (err) {
          console.log("Error executing query:", err);
          res.status(500).send("Error executing query");
        } else {
          console.log(res.status);
          res.json(result.rows);
        }
        client.end(); // Close the connection
      });
    }
  });
}
app.get("/user", function (req, res) {
  const client = new Client(pgConfig);

  client.connect(function (err) {
    if (err) {
      console.log("Error connecting to PostgreSQL:", err);
      res.status(500).send("Error connecting to database");
    } else {
      console.log("Connected to database!");

      const query = `
      CREATE TABLE IF NOT EXISTS "manage_user" (
      id SERIAL PRIMARY KEY,
      user_name VARCHAR(50) NOT NULL, 
      last_name VARCHAR(50),
      first_name VARCHAR(50),
      age INT,
      email VARCHAR(50) NOT NULL,
      password VARCHAR(50) NOT NULL
      );
      `; // Adjust the table name and schema as needed
      client.query(query, function (err, result) {
        if (err) {
          console.log("Error executing query:", err);
          res.status(500).send("Error executing query");
        } else {
          res.json(result.rows);
        }
        client.end(); // Close the connection
      });
    }
  });
});
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post("/add_user", function (req, res) {
  const { user_name, last_name, first_name, age, email, password } = req.body;
  const query = `INSERT INTO "manage_user" (user_name, last_name, first_name, age, email, password) VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`;
  const values = [user_name, last_name, first_name, age, email, password];
  connexion_database_and_execute_query(query, req, res, values);
});
app.post("/login", function (req, res) {
  const { email, password } = req.body;
  const query = `SELECT * FROM "manage_user" WHERE email = $1`;
  const values = [email];
  const client = new Client(pgConfig);

  client.connect(function (err) {
    if (err) {
      console.log("Error connecting to PostgreSQL:", err);
      res.status(500).send("Error connecting to database");
    } else {
      console.log("Connected to database!");
      console.log(query);
      client.query(query, values, function (err, result) {
        if (err) {
          console.log("Error executing query:", err);
          res.status(500).send("Error executing query");
        } else {
          console.log(result.rows[0].password);
          if (result == null) {
            res.status(400);
            console.log("Pas de compte ou mauvais email");
          } else if (password != result.rows[0].password) {
            console.log("Mauvais mot de passe");
            res.status(400);
          } else {
            console.log("connecté sur le site");
            res.status(200);

            console.log(res.status);
            res.json(result.rows);
          }
        }
        client.end(); // Close the connection
      });
    }
  });
});

app.delete("/delete_user/:user_id", function (req, res) {
  const user_id = req.params.user_id;
  const query = `DELETE FROM "manage_user" WHERE id = $1 RETURNING *`;
  const values = [user_id];
  connexion_database_and_execute_query(query, req, res, values);
});

app.get("/get_all_users", function (req, res) {
  const query = `select * from manage_user;`; // Adjust the table name and schema as needed
  const values = "";
  connexion_database_and_execute_query(query, req, res, values);
});

app.get("/modification_table_aliment", function (req, res) {
  const action = req.query.action;
  const client = new Client(pgConfig);
  if (action === "delete") {
    query = `DROP TABLE IF EXISTS aliment;
        `;
  } else if (action === "create") {
    query = `CREATE TABLE IF NOT EXISTS aliment (
          id SERIAL PRIMARY KEY,
          nom VARCHAR(255),
          image_url VARCHAR(255),
          nutriscore VARCHAR(10),
          composition TEXT,
          energie INT,
          matiere_grasse_aliments INT,
          acide_gras_satures_aliments INT,
          glucides_aliments INT,
          sucre_aliments INT,
          proteines_aliments INT,
          sel_aliments INT
        );`;
  } else {
    res.status(400).send("Invalid action");
    return;
  }
  const values = "";
  connexion_database_and_execute_query(query, req, res, values);
});

//requête api OFF
const axios = require("axios");

app.get("/test", (req, res, next) => {
  console.log("Appel '/test'");

  axios
    .get("https://fr.openfoodfacts.org/categorie/pizzas.json")
    .then((response) => {
      const data = response.data;
      res.json(data);
    })
    .catch((err) => next(err));
});
