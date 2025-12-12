const {Users} = require("../models/index.js");


exports.getUsers = async (req, res) => {
    const users = await Users.findAll()
    res.json(users)

 };

 

 exports.getUser = async (req, res) => {
    try {
    const user = await Users.findOne({where: {id: req.params.id}})

    if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(user)
    
    }catch(error){
        res.status(500).json({ error: error.message });
    }

 };

 exports.createUser = async (req, res) => {
    const { firstname, lastname } = req.body;
    const user = await Users.create({ 
  firstname, 
  lastname })
  res.status(201).json(user)
};

 exports.modifyUser = async (req, res) => {
    const user = await Users.findOne({where: {id: req.params.id}})

    await user.update(req.body)

     res.json(user);
    

 };

 exports.deleteUser = async (req, res) => {
    const user = await Users.findOne({where: {id: req.params.id}})

    await user.destroy();
            res.status(200).json({ message: "utilisateur supprimé" });
 };