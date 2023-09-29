export const createError = (status, message) => {
    //creation de uvelle instance d'erreur vide
    const error = new Error()
    //definition du code d'eat de l'erreur en fonction du parametre "status"
    error.status = status
    // defibition du message d'erreur du parametre
    error.message = message
    // Renvoi l'instance d'erreur pêrsonnalisé
    return error
}