const moreFeaturesService = require('../services/handleMoreFeatureService')


let handleAddFavoriteMovieController = async (req, res) => {
    try {
        let respond = await moreFeaturesService.handleAddFavoriteMovieService(req.body);
        return res.status(200).json(respond)
    } catch (error) {
        console.log("Error in handleAddFavoriteMovieController: " + error);
    }
}

let listMovieFavoriteByUidController = async (req, res) => {
    try {
        let respond = await moreFeaturesService.listMovieFavoriteByUidService(req.body);
        return res.status(200).json(respond)
    } catch (error) {
        console.log("Error in listMovieFavoriteByUidController: " + error);
    }
}

module.exports = {
    handleAddFavoriteMovieController,
    listMovieFavoriteByUidController

}