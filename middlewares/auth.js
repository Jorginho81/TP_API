import jwt from 'jsonwebtoken'
import { env } from '../config/index.js'
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
    //recupere le jeton (token) JWT à partir des cookies de la requete
    const token = req.cookies.access_token;
    
    // verifie si le jeton n'est présent
    // si le jeton (token) n'est pas présent il renvoie une erreur 401 (acces refusé)
    if(!token) return next(createError(401, "Access denied"))
    
    //Verifier la validité du jeton en utilisant jwt.verify
    jwt.verify(token, env.token, (err, player) => {
        // si une erreur se produit lors de la verification du jeton
        if(err) {
            //renvoie une erreur 403 (interdit) car le jeton (token) n'est pas valide
            return next(createError(403, "Token non valide !"))
        }
        //si la verification reussit cela ajoute les informations du player dans l'objet req
        req.player = player
        next();
    }   
    
    )



}
    