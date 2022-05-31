const db = require('../models/index')


let handleAddFavoriteMovieService = async (data) => {
    try {
        let movie = await db.MovieFavorites.findOne({
            where: {
                userId: data.userId,
                movieId: data.movieId,
                categoryId: data.categoryId,
                mainImage: data.mainImage,
            },
        })

        if (data.checkExistList) {

            if (movie != null) {
                return {
                    status: 0,
                    message: "Have existed in the list of movie favorites",
                }
            } else {
                return {
                    status: 1,
                    message: "Not exist in the list of movie favorites",
                }
            }



        } else {
            if (movie == null) {
                await db.MovieFavorites.create({
                    userId: data.userId,
                    movieId: data.movieId,
                    categoryId: data.categoryId,
                    mainImage: data.mainImage,
                    name: data.name,
                })
                return {
                    status: 0,
                    message: "Add successfully!",
                }
            } else {
                await movie.destroy()
                return {
                    status: 1,
                    message: "Removed successfully!",
                }
            }
        }


    } catch (error) {
        console.log("Error in handleAddFavoriteMovieService: " + error);
        return {
            status: 2,
            message: "Add failed!"
        }

    }
}

let listMovieFavoriteByUidService = async (data) => {
    try {
        let listMovieFavorite = await db.MovieFavorites.findAll({
            where: {
                userId: data.userId,
            },
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
                raw: true,
            },
            raw: true
        })

        return {
            status: 0,
            data: listMovieFavorite
        }

    } catch (error) {
        console.log("Error in listMovieFavoriteByUidService: " + error);
        return {
            status: 1,
            message: "Error in listMovieFavoriteByUidService"
        }
    }
}

module.exports = {
    handleAddFavoriteMovieService,
    listMovieFavoriteByUidService
}
