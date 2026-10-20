app.put('/api/pnj/:id', async (req, res) => {
    try {
        const idSaisi = req.params.id;
        const nouveauPNJ = await pool.query('UPDATE pnj SET nom = $2, classe = $3 WHERE id = $1 RETURNING *', [idSaisi, req.body.nom, req.body.classe]);
        if (nouveauPNJ.rows.length === 0) {
            res.status(404).json({ message: 'PNJ non trouvé' });
        }

        res.status(200).json({
            message: `Le PNJ avec l'ID : ${idSaisi} a été mis à jour`,
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du PNJ :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

        