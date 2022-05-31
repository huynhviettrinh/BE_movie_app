const crudDB = require('../services/managerMovieService')


let mangerMovie = (req, res, next) => {
    res.render('admin');

}

let addMovieController = async (req, res, next) => {
    try {
        let respond = await crudDB.addMovieService(req.body)
        console.log(respond);
        res.send(`${respond.message} <a href="/admin">Back</a>`)
    } catch (error) {
        console.log("Error in addMovieController", error);
    }
}

let getMovieDetailController = async (req, res, next) => {
    try {
        if (req.query.id && req.query.category) {
            let respond = await crudDB.getMovieDetailService(req.query.id, req.query.category)
            return res.status(200).json(respond)
        } else {
            return res.status(400).json({
                status: 1,
                message: "Query failed"
            })
        }
    } catch (error) {
        console.log("Error in getMovieDetailController", error);
    }
}

let managerMovieController = async (req, res, next) => {
    try {
        let listMovie = await crudDB.managerMovieService(false)
        let listMovieSerial = await crudDB.managerMovieService(true)
        res.render('managerMovie', { listMovie, listMovieSerial })


    } catch (error) {
        console.log("Error in managerMovieController", error);
    }
}

let viewAddMoreInforMovieController = async (req, res, next) => {
    var categoryId = req.query.categoryId
    var movieId = req.query.movieId
    var name = req.query.name
    try {
        if (!req.query.categoryId && !req.query.movieId && !req.query.name && !req.query.ch) {
            return res.status(400).json({
                status: 1,
                message: "Query failed"
            })
        } else {
            if (req.query.ch == 'sub') {
                res.render("addSubUrl", { categoryId, movieId, name })
            } else if (req.query.ch == 'media') {
                res.render("addMediaUrlMovie", { categoryId, movieId, name })
            }
        }
    } catch (error) {
        console.log("Error in viewAddMoreInforMovieController", error);
    }

}


let viewAddMediaSubMovieController = async (req, res, next) => {
    var categoryId = req.query.categoryId
    var movieId = req.query.movieId
    var name = req.query.name

    try {
        if (!req.query.categoryId && !req.query.movieId && !req.query.name && !req.query.ch) {
            return res.status(400).json({
                status: 1,
                message: "Query failed"
            })
        } else {
            if (req.query.ch == 'sub') {
                let respond = await crudDB.getEpisodeId(movieId, categoryId)

                res.render("addSubUrlMovie", { categoryId, movieId, name, episodeId: respond.episodeId })
            } else if (req.query.ch == 'media') {
                res.render("addMediaUrlMovie", { categoryId, movieId, name })
            }
        }

    } catch (error) {
        console.log("Error in viewAddMediaSubMovieController", error);
    }
}

let addMediaSubMovieController = async (req, res, next) => {
    try {
        let respond = await crudDB.addMediaSubMovieService(req.body)

        if (req.body.type == 'media') {
            res.send(`${respond.message} <a href=/managerMovie/addSubMovie?movieId=${req.body.movieId}&categoryId=${req.body.categoryId}&name=${req.body.name}&ch=media">Back</a>`)
        } else if (req.body.type == 'sub') {
            res.send(`${respond.message} <a href="/managerMovie/addSubMovie?movieId=${req.body.movieId}&categoryId=${req.body.categoryId}&name=${req.body.name}&ch=sub">Back</a>`)

        }

    } catch (error) {
        console.log("Error in addMoreInforMovieController", error);
    }


}

let viewEditMediaSubMovieController = async (req, res) => {
    var categoryId = req.query.categoryId
    var movieId = req.query.movieId
    var name = req.query.name
    try {
        if (!req.query.categoryId && !req.query.movieId && !req.query.name && !req.query.ch) {
            return res.status(400).json({
                status: 1,
                message: "Query failed"
            })
        } else {
            let respond = await crudDB.getEpisodeId(movieId, categoryId)
            res.render("editMediaUrlMovie", { categoryId, movieId, name, episodeId: respond.episodeId, mediaUrl: respond.mediaUrl })

        }
    } catch (error) {
        console.log("Error in viewEditMediaSubMovieController", error);
    }

}

let editMovieMediaUrlController = async (req, res) => {
    try {
        let respond = await crudDB.editMovieMediaUrlService(req.body)
        res.redirect("/managerMovie")
    } catch (error) {
        console.log("Error in editMovieMediaUrlController", error);
    }
}

module.exports = {
    mangerMovie,
    addMovieController,
    getMovieDetailController,
    managerMovieController,
    addMediaSubMovieController,
    viewAddMoreInforMovieController,
    viewAddMediaSubMovieController,
    viewEditMediaSubMovieController,
    editMovieMediaUrlController
}