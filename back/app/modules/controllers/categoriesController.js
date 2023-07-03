export const getAllCategories = async (req, res) => {
  const { categories } = req['models'];
  try {
    const categoriesRes = await categories.findAll({ limit: 200 });
    res.status(200).json(categoriesRes);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    res
      .status(500)
      .json({ error: 'Erreur lors de la récupération des catégories' });
  }
};
