export const getUserProfil = (req, res) => {
  const { users } = req['models'];
  const userId = req.params.id;
  users
    .findOne({
      where: {
        id: userId,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(405).send({ message: 'User not found' });
      }
      res.status(200).send({
        id: user.id,
        lastname: user.lastname,
        firstname: user.firstname,
        city: user.city,
        role: user.role,
        pseudo: user.pseudo,
        email: user.email,
        img: user.img,
        description: user.description,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const updateUserInformation = (req, res) => {
  const { users } = req['models'];
  const userId = req.body.id;

  users
    .findOne({
      where: {
        id: userId,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(405).send({ message: 'User not found' });
      }

      user.lastname = req.body.lastname || user.lastname;
      user.firstname = req.body.firstname || user.firstname;
      user.city = req.body.city || user.city;
      user.email = req.body.email || user.email;
      user.pseudo = req.body.pseudo || user.pseudo;
      user.role = req.body.role || user.role;
      user.description = req.body.description || user.description;
      user.img = req.body.img || user.img;
      return user.save();
    })
    .then(() => {
      res.send({ message: 'User was updated successfully!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const getAllPseudo = async (req, res) => {
  const { users } = req['models'];
  try {
    const pseudo = await users.findAll({
      attributes: ['pseudo'],
    });
    const pseudoList = pseudo.map((pseudo) => pseudo.pseudo);
    res.status(200).json(pseudoList);
  } catch (error) {
    console.error('Erreur lors de la récupération des pseudos :', error);
    res
      .status(500)
      .json({ error: 'Erreur lors de la récupération des pseudos' });
  }
};

export const getAllCities = async (req, res) => {
  const { users } = req['models'];
  try {
    const cities = await users.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('city')), 'city']],
      where: {
        city: {
          [Sequelize.Op.ne]: null,
        },
      },
    });

    const cityList = cities.map((city) => city.city);
    res.status(200).json(cityList);
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue lors de la récupération des villes.',
    });
  }
};
