let filterApi = (data) => {
    return data.filter((item) => {
        return item.homeSectionType != "BANNER" && item.homeSectionType != "BLOCK_GROUP"
    })
}
let getResolutionMovies = (arr) => {
    return arr.map(data => {
        return {
            code: data.code,
            description: data.description
        }
    })
}
let handleFilterSub = (data) => {
    // let language = data.filter((sub) => {
    //     return sub.language === "English" || sub.language === "Tiếng Việt"

    // })
    return data.map((data) => {
        return {
            language: data.language,
            languageAbbr: data.languageAbbr,
            subtitlingUrl: data.subtitlingUrl
        }
    })
}
let sliceStringIdBanner = (string) => {
    let id = string.slice(string.indexOf("=") + 1, string.indexOf("&type"))
    let category = string.substr(string.length - 1);

    return { id: parseInt(id), category: parseInt(category) }
}
let getListOfferMovie = (listMovie) => {
    return listMovie.map((movie) => {
        return {
            categoryId: parseInt(movie.category),
            movieId: parseInt(movie.id),
            name: movie.name,
            mainImage: movie.coverVerticalUrl
        }
    })
}
let getRelatedSeries = (listMovie) => {

    return listMovie.map((movie) => {
        return {
            categoryId: parseInt(movie.category),
            movieId: parseInt(movie.id),
            name: movie.name,
            mainImage: movie.coverVerticalUrl

        }
    })
}
let getVideoIdTrailer = (data, episodeCount) => {
    let listVdieoId = []
    if (episodeCount == undefined) {
        episodeCount = 0
    }

    if (episodeCount > 0) {
        data.forEach((item, index) => {
            listVdieoId[index] = item.id.videoId
        })
        return listVdieoId[0]

    } else {
        data.forEach((item, index) => {
            listVdieoId[index] = item.id.videoId
        })
        let rd = Math.floor(Math.random() * listVdieoId.length);
        return listVdieoId[rd]

    }

}
module.exports = {
    filterApi: filterApi,
    getResolutionMovies: getResolutionMovies,
    handleFilterSub: handleFilterSub,
    sliceStringIdBanner: sliceStringIdBanner,
    getListOfferMovie: getListOfferMovie,
    getRelatedSeries: getRelatedSeries,
    getVideoIdTrailer: getVideoIdTrailer
}
