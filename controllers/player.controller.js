import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../config/index.js'
//MODEL
import Model from "../models/Player.js";

export const signup = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        await Model.create({
            ...req.body,
            password: hashedPassword
        });

        res.status(200).json("The player has been created")
    } catch (error) {
        next(error)
    }
};

export const sign = async (req, res) => {
    try {
        //recherche le joueur dans la bdd par son mail
        const player = await Model.findOne({ email: req.body.email })

        if (!player) {
            return res.status(404).json({ message: 'Email incorrect' });
        }
        //Compare le mot de passe fourni par la requete avec le bon password de la bdd
        const comparePassword = await bcrypt.compare(
            req.body.password,
            player.password
        )
        if (!comparePassword) return res.status(400).json
            ("Wrong Password") // si le password est pas le meme il renvoie une erreur 400

        //crée un jeton JWT pour le jouer avec son id expire apres 24h
        console.log(player._id);
        const token = jwt.sign({ id: player.id }, env.token, { expiresIn: "24h" })
        
        //supprime le mot de passe du player par mesures de securite
        const { password, ...others } = player._doc

       
        //envoie le jeton (token) JWT sous forme de cookie HTTPOnly   
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(others)// Renvoie les données du player en réponse (à l'exception du password)


    } catch (error) {
        next(error)

    }
}

export const allPlayers = async (req, res, next) => {
    try {

        const players = await Model.find()
        res.status(200).json(players)

    } catch (error) {
        next(error)
    }
}

export const onePlayer = async (req, res, next) => {
    try {
        const { id } = req.params
        const players = await Model.findById(id)

        res.status(200).json(players)

    } catch (error) {
        next(error)
    }
}

export const deletePlayer = async (req, res, next) => {
    try {
        console.log(typeof req.params.id);
        const player = await Model.findById(req.params.id)
        if (!player) return res.status(404).json('player not found')

        await Model.findByIdAndRemove(req.params.id)
        res.status(200).json('the player has been deleted')
    } catch (error) {
        next(error)
    }
}

export const updatePlayer = async (req, res, next) => {
    try {
        const playerId = req.params.id;
        const newPlayerData = req.body; // Les nouvelles données du joueur à mettre à jour
        console.log("A");
        // Chercher le joueur par son ID
        const player = await Model.findById(playerId);
        if (!player) return res.status(404).json('Joueur non trouvé');
        console.log("B");
        // Mettre à jour le joueur avec les nouvelles données
        await Model.findByIdAndUpdate(playerId, newPlayerData);

        res.status(200).json('Le joueur a été mis à jour avec succès');
        res.status(200).json(token)
       
    } catch (error) {
        next(error);
    }
};

