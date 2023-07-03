export const getAllMechanics = async (req, res) => {
  const { mechanicsType } = req['models'];
  try {
    const mechanics = await mechanicsType.findAll({ limit: 200 });
    res.status(200).json(mechanics);
  } catch (error) {
    console.error('Erreur lors de la récupération des mécaniques :', error);
    res
      .status(500)
      .json({ error: 'Erreur lors de la récupération des mécaniques' });
  }
};
