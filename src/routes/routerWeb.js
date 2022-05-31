const dataControllerMovie = require('../controller/getDataMovieController')
const moreFeatures = require('../controller/handleMoreFeatureController')


let route = (app) => {

    // app.get('/', dataControllerMovie.getListMovieController)


    app.get('/getListMovie', dataControllerMovie.getListMovieController)

    app.get('/getBanner', dataControllerMovie.getBannerController)

    app.get('/getDetailMovie', dataControllerMovie.getDetailMovieController)

    app.get('/getMovieMedia', dataControllerMovie.getMovieMediaController)

    app.get('/apiSearchWithKeyWord', dataControllerMovie.apiSearchWithKeyWordController)

    // More features

    app.post('/addMovieFavorite', moreFeatures.handleAddFavoriteMovieController)

    app.post('/listMovieFavorite', moreFeatures.listMovieFavoriteByUidController)


}


module.exports = route;