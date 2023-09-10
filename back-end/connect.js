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
  console.log("la query est : " + query);
  client.connect(function (err) {
    if (err) {
      console.log("Error connecting to PostgreSQL:", err);
      // res.status(500).send("Error connecting to database");
    } else {
      console.log("Connected to database!");
      console.log(query);
      client.query(query, values, function (err, result) {
        if (err) {
          console.log("Error executing query:", err);
          // res.status(500).send("Error executing query");
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
  const query = `SELECT id, password FROM manage_user WHERE email = $1`;
  const values = [email];
  const client = new Client(pgConfig);

  client.connect(function (err) {
    if (err) {
      console.error("Error connecting to PostgreSQL:", err);
      return res.status(500).send("Error connecting to database");
    }

    console.log("Connected to database!");

    client.query(query, values, function (err, result) {
      if (err) {
        console.error("Error executing query:", err);
        client.end();
        return res.status(500).send("Error executing query");
      }

      if (result.rows.length === 0) {
        console.log("Pas de compte ou mauvais email");
        client.end();
        return res.status(400).send("Pas de compte ou mauvais email");
      }

      const Password = result.rows[0].password;

      if (password !== Password) {
        console.log("Mauvais mot de passe");
        client.end();
        return res.status(400).send("Mauvais mot de passe");
      }

      const userId = result.rows[0].id;

      console.log("Connecté sur le site");
      client.end();
      return res.status(200).send(userId.toString());
    });
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

app.get("/create_table_aliment", function (req, res) {
  const action = req.query.action;
  const client = new Client(pgConfig);
  if (action === "delete") {
    query = `DROP TABLE IF EXISTS aliments;
        `;
  } else if (action === "create") {
    query = `CREATE TABLE IF NOT EXISTS aliments (
      id SERIAL PRIMARY KEY,
      nom_produit VARCHAR(50000) DEFAULT(NULL),
      off_id VARCHAR(50000) DEFAULT(NULL),
      marque VARCHAR(50000) DEFAULT(NULL),
      origine VARCHAR(5000) DEFAULT(NULL),
      information VARCHAR(5000) DEFAULT(NULL),
      categories VARCHAR(50000) DEFAULT(NULL),
      quantite_produit VARCHAR(50000) DEFAULT(NULL),
      conservation VARCHAR(50000) DEFAULT(NULL),
      composition VARCHAR(50000) DEFAULT(NULL),
      ingredients VARCHAR(50000) DEFAULT(NULL),
      kcal VARCHAR(50000) DEFAULT(NULL),
      matieres_grasse VARCHAR(50000) DEFAULT(NULL),
      matieres_grasse_saturees VARCHAR(50000) DEFAULT(NULL),
      proteines VARCHAR(50000) DEFAULT(NULL),
      sel VARCHAR(50000) DEFAULT(NULL),
      sodium VARCHAR(50000) DEFAULT(NULL),
      sucre VARCHAR(50000) DEFAULT(NULL),
      nutriscore VARCHAR(50000) DEFAULT(NULL),
      img_produit VARCHAR(50000) DEFAULT(NULL)
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
  list_link_categories = [
    "desserts",
    "charcuteries",
    "snacks",
    "boudins",
    "produits-laitiers",
    "cereales-et-pommes-de-terre",
    "produits-a-tartiner",
  ];
  list_link_categories.forEach((link_categorie) => {
    for (nombre_page = 1; nombre_page < 10; nombre_page++) {
      axios
        .get(
          "https://fr.openfoodfacts.org/categorie/" + link_categorie + ".json"
          // "https://fr.openfoodfacts.org/categorie/saucisses-seches-de-jambon.json"
        )
        .then((response) => {
          const data = response.data;

          const list_objects = [];
          for (const element of data.products) {
            try {
              const unique_object = {
                nom_produit: element.product_name_fr,
                off_id: element._id,
                marque: element.brands,
                origine: element.origin_fr,
                information: element.other_information_fr,
                categories: element.categories,
                quantite_produit: element.quantity,
                conservation: element.conservation_conditions_fr,
                composition: element.likeliest_recipe,
                ingredients: element.ingredients_text,
                kcal: element.nutriments["energy-kcal_100g"],
                matieres_grasse: element.nutriments.fat_100g,
                matieres_grasse_saturees:
                  element.nutriments["saturated-fat_100g"],
                proteines: element.nutriments.proteins_100g | "",
                sel: element.nutriments.salt_100g,
                sodium: element.nutriments.sodium_100g,
                sucre: element.nutriments.sugars_100g,
                nutriscore: element.nutrition_grade_fr,
                img_produit: element.image_front_url,
              };

              // list_objects.push(unique_object);
              const query = `INSERT INTO "aliments" (nom_produit, off_id, marque, origine, information, categories, quantite_produit, conservation, composition, ingredients, kcal, matieres_grasse, matieres_grasse_saturees, proteines, sel, sodium, sucre, nutriscore, img_produit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        RETURNING *`;
              const values = [
                unique_object.nom_produit,
                unique_object.off_id,
                unique_object.marque,
                unique_object.origine,
                unique_object.information,
                unique_object.categories,
                unique_object.quantite_produit,
                unique_object.conservation,
                unique_object.composition,
                unique_object.ingredients,
                unique_object.kcal,
                unique_object.matieres_grasse,
                unique_object.matieres_grasse_saturees,
                unique_object.proteines,
                unique_object.sel,
                unique_object.sodium,
                unique_object.sucre,
                unique_object.nutriscore,
                unique_object.img_produit,
              ];

              connexion_database_and_execute_query(query, req, res, values);
            } catch (err) {
              console.log(err);
            }
          }
        })
        .catch((err) => next("l'erreur", err));
    }
  });
  res.json("ok");
});

app.get("/get_all_aliments", function (req, res) {
  const query = `select * from aliments;`;
  const values = "";
  connexion_database_and_execute_query(query, req, res, values);
});
app.get("/get_aliment_by_name", (req, res) => {
  const searchTerm = req.query.nom_produit;

  const query = `
    SELECT * FROM aliments
    WHERE aliments.nom_produit LIKE CONCAT('%', $1::text, '%')`;
  const values = [searchTerm];

  connexion_database_and_execute_query(query, req, res, values);
});
app.get("/get_aliment_by_id", (req, res) => {
  const searchId = req.query.off_id;
  const query = `SELECT * FROM aliments WHERE aliments.off_id = $1`;
  const values = [searchId];
  connexion_database_and_execute_query(query, req, res, values);
});
//Favoris
app.get("/favorite_table", function (req, res) {
  const action = req.query.action;
  console.log("action est " + action);
  if (action === "delete") {
    console.log("coucou 1");
    query = `DROP TABLE IF EXISTS favorite;
    `;
  } else if (action === "create") {
    console.log("coucou 2");
    query = `
  CREATE TABLE IF NOT EXISTS favorite (
    id SERIAL PRIMARY KEY,
    id_user INT,
    id_aliment INT,
    FOREIGN KEY (id_user) REFERENCES manage_user(id),
    FOREIGN KEY (id_aliment) REFERENCES aliments(id)
    );`;
  }
  const values = "";
  connexion_database_and_execute_query(query, req, res, values);
});

//endpoint get all favorite by user
app.get("/get_all_favorite_by_user/:id_user", function (req, res) {
  const id_user = req.params.id_user;

  const query = `SELECT * FROM favorite INNER JOIN aliments ON favorite.id_aliment = aliments.id WHERE favorite.id_user=$1;`;
  const values = [id_user];
  connexion_database_and_execute_query(query, req, res, values);
});
//add favorite to user
app.post("/add_favorite_to_user", function (req, res) {
  const { id_user, id_aliment } = req.body;
  const query = `INSERT INTO favorite (id_user, id_aliment) VALUES ($1, $2)`;
  const values = [id_user, id_aliment];
  connexion_database_and_execute_query(query, req, res, values);
});
//delete favorite from user
app.delete(
  "/delete_favorite_from_user/:id_user/:id_aliment",
  function (req, res) {
    const id_user = req.params.id_user;
    const id_aliment = req.params.id_aliment;
    const query = `
  DELETE FROM favorite WHERE id_user = $1 AND id_aliment = $2
`;
    console.log("on passe dans le delete");
    const values = [id_user, id_aliment];
    connexion_database_and_execute_query(query, req, res, values);
  }
);
//Modifier le mot de passe
app.post("/change_password/:email", function (req, res) {
  const { email } = req.params;
  const { nouveau_mot_de_passe } = req.body;

  const updateQuery = `
    UPDATE manage_user
    SET password = $1
    WHERE email = $2;
  `;

  connexion_database_and_execute_query(
    updateQuery,
    [nouveau_mot_de_passe, email],
    res,
    req
  );
});
