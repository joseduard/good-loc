const jwt = require('jsonwebtoken');
const db = require('../config/db.config.js');
const User = db.users;
const Game = db.games;
const Renting_Or_Buying_Games = db.rentingOrBuyingGames;


exports.getAvailableGames = async (req, res) => {
    // Utiliser la fonction pour obtenir l'utilisateur connecté
    const currentUser = req['user'];

    // S'assurer qu'un utilisateur est connecté
    if (!currentUser) {
        return res.status(403).send({ message: "Aucun utilisateur connecté." });
    }

    // Trouver les jeux disponibles dans la même ville que l'utilisateur connecté
    Renting_Or_Buying_Games.findAll({
        include: [{
            model: User,
            where: { city: currentUser.city },
            attributes: ['id', 'city']  // nous n'avons besoin que de l'id et de la ville de l'utilisateur
        }, {
            model: Game
        }]
    })
    .then(games => {
        res.status(200).send(games);
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
