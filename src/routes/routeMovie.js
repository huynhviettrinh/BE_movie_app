const toolController = require('../controller/toolController')
const managerMovie = require('../controller/managerMovieController')


let routeMovie = (app) => {
    app.get('/', toolController.renderView)
    app.post('/handleTool', toolController.handleTool)
    app.get('/admin', managerMovie.mangerMovie)
    app.post('/saveMovie', managerMovie.addMovieController)
    app.get('/getMovieDetail', managerMovie.getMovieDetailController)
    app.get('/managerMovie', managerMovie.managerMovieController)
    app.get('/managerMovie/moreInfor', managerMovie.viewAddMoreInforMovieController)
    app.post('/managerMovie/moreInfor', managerMovie.addMediaSubMovieController)
    app.get('/managerMovie/addMediaMovie', managerMovie.viewAddMediaSubMovieController)
    app.get('/managerMovie/addSubMovie', managerMovie.viewAddMediaSubMovieController)
    app.get('/managerMovie/editMediaMovie', managerMovie.viewEditMediaSubMovieController)
    app.post('/managerMovie/editMovieMediaUrl', managerMovie.editMovieMediaUrlController)
    app.get('/managerMovie/managerEpisode', managerMovie.viewManagerEpisodeController)
    app.get('/managerMovie/managerEpisode', managerMovie.viewManagerEpisodeController)
    app.get('/managerMovie/managerEpisode/addSubEpisodeSeries', managerMovie.viewAddSubEpisodeController)
    app.get('/managerMovie/addEpisodeMediaUrl', managerMovie.viewaddEpisodeMediaUrlController)


}


module.exports = routeMovie;