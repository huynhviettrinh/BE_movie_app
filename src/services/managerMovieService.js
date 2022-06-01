const db = require('../models/index')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let arrExclude = ['createdAt', 'updatedAt', 'id'];

let addMovieService = async (data) => {
    try {
        let movie = await db.MovieDetail.findOne({
            where: {
                movieId: data.movieId,
            }
        })

        if (movie) {
            return {
                status: 1,
                message: "Movie Id already"
            }

        } else {
            await db.Movie.create({
                movieId: data.movieId,
                categoryId: data.categoryId,
                name: data.name,
                mainImage: data.mainImage,
                bannerImage: data.bannerImage,
            })
            await db.MovieDetail.create({
                movieId: data.movieId,
                trailerId: data.trailerId,
                releaseYear: data.releaseYear,
                category: data.category.toString(),
                episodeCount: data.episodeCount,
                nation: data.nation,
                score: data.score,
                introduction: data.introduction,
            })

            return {
                status: 0,
                message: "add successfully"
            }
        }



    } catch (error) {
        console.log("Error in addMovieService", error);
    }
}

let getMovieDetailService = async (movieId, categoryId) => {
    try {
        let movie = await db.Movie.findOne({
            where: {
                movieId: movieId,
                categoryId: categoryId
            },
            attributes: {
                exclude: arrExclude,
            },
            raw: true,
        })
        let movieDetail = await db.MovieDetail.findOne({
            where: {
                movieId: movieId,
            },
            attributes: {
                exclude: arrExclude,
            },
            raw: true,
        })

        if (movie && movieDetail) {
            let data = await customData(movie, movieDetail, false)
            data.episodeDetails = await getSubEpisodeDetails(movie.movieId, movie.categoryId)
            return {
                status: 0,
                data: data
            }
        } else {
            return {
                status: 2,
                message: "This film has not have added yet"
            }
        }
    } catch (error) {
        console.log("Error in getMovieDetailService", error);
    }

}

let getSubEpisodeDetails = async (movieId, categoryId) => {
    try {

        let seriesNo = await db.Subtitle.findOne({
            where: {
                movieId: movieId,
                categoryId: categoryId,
            },
            order: [
                ['seriesNo', 'DESC'],
            ],
            attributes: ["seriesNo"],
            raw: true
        })


        let subtitles = await db.Subtitle.findAll({
            where: {
                movieId: movieId,
                categoryId: categoryId
            },
            attributes: {
                exclude: arrExclude,
            },
            raw: true
        })


        return filterSubtitles(subtitles, seriesNo.seriesNo)



    } catch (error) {
        console.log("Error in getSubEpisodeDetails", error);

    }
}


let filterSubtitles = (data, seriesNo) => {
    let arr = []

    if (seriesNo > 0) {
        for (let i = 0; i < seriesNo; i++) {
            let list = data.filter((value, index) => {
                return value.seriesNo == (i + 1)
            })
            arr[i] = {
                episodeId: list[0].episodeId,
                seriesNo: list[0].seriesNo,
                subtitles: loopSubtitles(list)
            }
        }

    } else {
        arr[0] = {
            episodeId: data[0].episodeId,
            seriesNo: data[0].seriesNo,
            subtitles: loopSubtitles(data)
        }
    }
    return arr


}


let loopSubtitles = (data) => {
    let arr = []
    data.forEach((item, index) => {
        arr[index] = {
            language: item.language,
            languageAbbr: item.languageAbbr,
            subtitlingUrl: item.subtitlingUrl
        }
    })

    return arr
}

let managerMovieService = async (isMovieSerial) => {

    if (isMovieSerial) {
        return queryListMovies(1)
    } else {
        let dataAfter = await queryListMovies(0)
        let dataAfterCheckHaveMedia = await checkHaveMedia(dataAfter)
        return dataAfterCheckHaveMedia
    }
}

let checkHaveMedia = async (data) => {
    let arr = []
    var index = 0
    try {
        for await (let media of data) {
            let object = {}
            let check = await db.MediaMovie.findOne({
                where: {
                    movieId: media.movieId,
                    categoryId: media.categoryId,
                },
                raw: true
            })
            object = media
            if (check) {
                object.isHaveMedia = true
            } else {
                object.isHaveMedia = false
            }
            arr[index] = object
            index++
        }
        return arr
    } catch (error) {
        console.log(error);
    }
}

let queryListMovies = async (categoryId) => {
    let movieDetail;
    let movie = await db.Movie.findAll({
        where: {
            categoryId: categoryId
        },
        attributes: {
            exclude: arrExclude,
        },
        raw: true,
    })

    if (categoryId == 1) {
        movieDetail = await db.MovieDetail.findAll({
            where: {
                episodeCount: {
                    [Op.gt]: 0,
                }
            },
            attributes: {
                exclude: arrExclude,
            },
            raw: true,
        })
    } else {
        movieDetail = await db.MovieDetail.findAll({
            where: {
                episodeCount: 0
            },
            attributes: {
                exclude: arrExclude,
            },
            raw: true,
        })
    }

    if (movie && movieDetail) {
        let data = await customData(movie, movieDetail, true)
        return data
    } else {
        return {
            status: 2,
            message: "Error managerMovieService"
        }
    }
}

let customData = (movie, movieDetail, isList) => {

    if (isList) {
        let arrListMovie = []
        movie.forEach((movie, index) => {
            arrListMovie[index] = customData(movie, movieDetail[index], false)
        })
        return arrListMovie

    } else {

        return {
            trailerId: movieDetail.trailerId,
            movieId: movie.movieId,
            categoryId: movie.categoryId,
            releaseYear: movieDetail.releaseYear,
            name: movie.name,
            category: movieDetail.category.split(','),
            episodeCount: movieDetail.episodeCount,
            nation: movieDetail.nation,
            score: movieDetail.score,
            bannerImage: movie.bannerImage,
            mainImage: movie.mainImage,
            introduction: movieDetail.introduction,
        }
    }
}

let addMediaSubMovieService = async (data) => {
    try {
        if (data.type == 'media') {
            let check = await db.MediaMovie.findOne({
                where: {
                    movieId: data.movieId,
                    episodeId: data.episodeId,
                    categoryId: data.categoryId
                }
            })
            if (check) {
                return {
                    status: 1,
                    message: "Media has been added"
                }
            } else {
                await db.MediaMovie.create({
                    movieId: data.movieId,
                    episodeId: data.episodeId,
                    categoryId: data.categoryId,
                    seriesNo: data.seriesNo,
                    mediaUrl: data.mediaUrl
                })
                return {
                    status: 0,
                    message: "add successfully"
                }
            }
        } else if (data.type == 'sub') {
            let arr = data.language.split(',')

            let check = await db.Subtitle.findOne({
                where: {
                    movieId: data.movieId,
                    episodeId: data.episodeId,
                    categoryId: data.categoryId,
                    seriesNo: data.seriesNo,
                    language: arr[0],
                    languageAbbr: arr[1],
                }
            })
            if (check) {
                return {
                    status: 1,
                    message: "This subtitle is available, please check again"
                }
            } else {
                await db.Subtitle.create({
                    movieId: data.movieId,
                    episodeId: data.episodeId,
                    categoryId: data.categoryId,
                    seriesNo: data.seriesNo,
                    language: arr[0],
                    languageAbbr: arr[1],
                    subtitlingUrl: data.subtitlingUrl,
                })
                return {
                    status: 0,
                    message: "add successfully"
                }
            }
        }
    } catch (error) {
        console.log("Error in addMoreInforMovieService", error);
    }
}

let getEpisodeId = async (movieId, categoryId) => {
    try {
        let res = await db.MediaMovie.findOne({
            where: {
                movieId: movieId,
                categoryId: categoryId
            },
            attributes: ["episodeId", "mediaUrl"],
            raw: true
        })
        return res;

    } catch (error) {
        console.log("Error in getEpisodeId", error);

    }
}

let editMovieMediaUrlService = async (data) => {
    try {
        let movieMediaUrl = await db.MediaMovie.findOne({
            where: {
                movieId: data.movieId,
                categoryId: data.categoryId,
                episodeId: data.episodeId,
                seriesNo: data.seriesNo,
            }
        })

        if (movieMediaUrl) {
            movieMediaUrl.movieId = data.movieId
            movieMediaUrl.categoryId = data.categoryId
            movieMediaUrl.episodeId = data.episodeId
            movieMediaUrl.seriesNo = data.seriesNo
            movieMediaUrl.mediaUrl = data.mediaUrl
            await movieMediaUrl.save();
            return {
                status: 0,
                message: "Update successfully"
            }
        } else {
            return {
                status: 0,
                message: "This mediaUrl not exist"
            }
        }
    } catch (error) {
        console.log("Error in editMovieMediaUrlService", error);

    }
}


let getListEpisodeService = async (data) => {
    try {
        if (!data.movieId && !data.categoryId) {
            return {
                status: 1,
                message: "Error query failed"
            }
        }

        let listEpisodeDetail = await db.MediaMovie.findAll({
            where: {
                movieId: data.movieId,
                categoryId: data.categoryId,
            },
            attributes: {
                exclude: arrExclude,
            },
            raw: true
        })

        return {
            status: 0,
            data: listEpisodeDetail
        }



    } catch (error) {
        console.log("Error in getListEpisodeService", error);

    }
}

let findSeriesHighest = async (data) => {
    try {
        if (!data.movieId && !data.categoryId) {
            return {
                status: 1,
                message: "Error query failed"
            }
        }

        let seriesNo = await db.MediaMovie.findOne({
            where: {
                movieId: data.movieId,
                categoryId: data.categoryId,
            },
            order: [
                ['seriesNo', 'DESC'],
            ],
            attributes: ["seriesNo"],
            raw: true
        })
        if (seriesNo) {
            return seriesNo.seriesNo + 1
        } else {
            return 1

        }
    } catch (error) {
        console.log("Error in getListEpisodeService", error);

    }
}

module.exports = {
    addMovieService,
    getMovieDetailService,
    managerMovieService,
    addMediaSubMovieService,
    editMovieMediaUrlService,
    getEpisodeId,
    getListEpisodeService,
    findSeriesHighest
}




