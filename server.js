require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const { pool } = require("./db");


app.get("/api/pnj", async(req, res) => {
  const result = await pool.query("SELECT * FROM pnj");

  res.status(200).json(result.rows);
}); 


app.use(express.json());

app.listen(port, () => {
  console.log(
    ` le server de la taverne est ouvert sur http://localhost:${port}`,
  );
});

app.get("/api/pnj/:id", (req, res) => {
  const idSaisi = req.params.id;

  res.json({ message: `Vous avez demandé le PNJ avec l'ID : ${idSaisi}` });
});

app.get("/api/pnj/:id", async(req, res) => {
  try {
    const idSaisi = req.params.id;
    const result = await pool.query("SELECT * FROM pnj WHERE id = $1", [idSaisi]);  
      "select * from pnj where id = $1", [idSaisi]
    if (result.rows.length === 0) {
      res.status(404).json({ message: "PNJ non trouvé" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du PNJ :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

app.post("/api/pnj", (req, res) => {
  const nouveauPNJ = req.body.nom;
  const classedunouveauPNJ = req.body.classe;

  res
    .status(201)
    .json({
      message: `le PNJ  : ${nouveauPNJ}, Classe : ${classedunouveauPNJ} a rejoint la taverne`,
    });
});

app.delete("/api/pnj/:id", (req, res) => {
  const idSaisi = req.params.id;
  res.json({ message: `Le PNJ avec l'ID : ${idSaisi} a quitté la taverne` });
});



