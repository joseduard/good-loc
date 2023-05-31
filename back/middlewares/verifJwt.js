// Fonction pour obtenir l'utilisateur connecté
async function getConnectedUser(req, res, next) {
    try {
        // récupérer le token à partir de l'en-tête 'x-access-token'
        const token = req.headers['x-access-token'];

        if (!token) return null;

        // vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // trouver l'utilisateur par l'id contenu dans le token
        const user = await User.findOne({ where: { id: decoded.id } });

        req['user'] = user
        next()
    } catch (err) {
        console.log(err);
        return null;
    }
}