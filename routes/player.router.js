import express from "express";
import { verifyToken } from "../middlewares/auth.js";

// SIGNUP POUR ENREGISTREMENT DE LA BASE DE DONNEES

import {signup, allPlayers, onePlayer, deletePlayer, updatePlayer, sign} from "../controllers/player.controller.js"

    const router = express.Router()

    router.post("/signup", signup);

    router.post("/sign", sign)

    router.get("/all", allPlayers);

    router.get("/findById/:id", onePlayer);

    router.delete("/delete/:id", verifyToken, deletePlayer);

    router.put("/update/:id", verifyToken, updatePlayer)

    
  

    export default router;