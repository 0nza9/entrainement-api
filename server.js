const express =require('express');
const app = express();
const port = 3000;

app.use(express.json());


app.listen(port, () => {
  console.log(` le server de la taverne est ouvert sur http://localhost:${port}`);
});



app.get('/api/pnj/:id', (req, res) => {
  const idSaisi = req.params.id;

  res.json({ message: `Vous avez demandé le PNJ avec l'ID : ${idSaisi}` });
});

app.post('/api/pnj', (req, res) => {
  const nouveauPNJ = req.body.nom;
  const classedunouveauPNJ = req.body.classe;

  res.status(201).json({ message: `le PNJ  : ${nouveauPNJ}, Classe : ${classedunouveauPNJ} a rejoint la taverne` 
  });
});