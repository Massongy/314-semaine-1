const {Users} = require("../models/index.js");


exports.getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    const user = await Users.create({ firstname, lastname });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.modifyUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    await user.destroy();
    res.status(200).json({ message: "utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
