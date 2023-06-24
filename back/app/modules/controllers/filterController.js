import db from "../../config/db.config.js";
import CategoriesImport from "../../database/models/Categories.js";
import MechanicsImport from "../../database/models/Mechanics_Type.js";
import UsersImport from "../../database/models/Users.js";
import Sequelize from "sequelize";

const Categories = CategoriesImport(db.sequelize);
const Mechanics = MechanicsImport(db.sequelize);
const Users = UsersImport(db.sequelize);

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll({ limit: 200 });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des catégories" });
  }
};

export const getAllMechanics = async (req, res) => {
    try {
        const mechanics = await Mechanics.findAll({ limit: 200 });
        res.status(200).json(mechanics);
    } catch (error) {
        console.error("Erreur lors de la récupération des mécaniques :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des mécaniques" });
    }
}


export const getAllCities = async (req, res) => {
  try {
    const cities = await Users.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('city')), 'city']],
      where: {
        city: {
          [Sequelize.Op.ne]: null
        }
      }
    });

    const cityList = cities.map(city => city.city);
    res.status(200).json(cityList);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des villes.' });
  }
};