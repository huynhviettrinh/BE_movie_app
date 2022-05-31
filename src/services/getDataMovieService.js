const getApiMovie = require('../servicesAxios/getApiMovieAxios')
const { filterApi,
    getResolutionMovies,
    handleFilterSub,
    sliceStringIdBanner,
    getListOfferMovie,
    getRelatedSeries,
    getVideoIdTrailer } = require('../utils/support')

let getApiHomeDataService = async (page) => {
    let apiResponse = []
    let apiData = {}
    let i = 0
    try {
        do {
            apiData = await getApiMovie.getDataMovieByPage(page);
            console.log("getApiHomeDataService" + i);
            i++;

        } while (apiData.data.data == null);


        if (apiData.data.data && apiData.data.data.recommendItems != null) {
            let apiAfterFilter = filterApi(apiData.data.data.recommendItems)

            apiAfterFilter.forEach((element, index) => {
                let object1 = {}
                object1.homeSectionName = element.homeSectionName
                let arrListMovie = []

                element.recommendContentVOList.forEach((item, index) => {
                    let object2 = {}
                    object2.categoryId = item.category
                    object2.movieId = item.id
                    object2.name = item.title
                    object2.mainImage = item.imageUrl
                    arrListMovie[index] = object2
                    object1.listMovie = arrListMovie
                })
                apiResponse[index] = object1
            });
        }


        return apiResponse;
    } catch (error) {
        console.log("Error in getApiHomeDataService: " + error);
    }
}
let getDataBannerService = async () => {
    let apiResponse = []
    let listBanner = {}
    let index = 0;
    try {
        do {
            listBanner = await getApiMovie.getDataMovieByPage(0);

        } while (listBanner.data.data == null);

        if (listBanner.data.data && listBanner.data.data.recommendItems[1]) {
            listBanner.data.data.recommendItems[1].recommendContentVOList.forEach((element) => {
                let object = {}

                if (element.title != "") {
                    object.categoryId = sliceStringIdBanner(element.jumpAddress).category
                    object.movieId = sliceStringIdBanner(element.jumpAddress).id
                    object.name = element.title
                    object.mainImage = element.imageUrl
                    apiResponse[index] = object
                    index++;
                }
            });
        }

        return apiResponse;
    } catch (error) {
        console.log("Error in getDataBannerService: " + error);
    }
}
let getDetailMovieService = async (id, category) => {
    let apiCustomRes = {}
    let listSpisodeMovie = []

    try {
        let res = await getApiMovie.getDetailMovieAxios(id, category);
        let detailMovie = res.data.data
        apiCustomRes.trailerId = await getTrailerMovieService(detailMovie.name, detailMovie.episodeCount === null ? 0 : detailMovie.episodeCount)
        apiCustomRes.movieId = parseInt(id)
        apiCustomRes.categoryId = detailMovie.category
        apiCustomRes.releaseYear = detailMovie.year
        apiCustomRes.name = detailMovie.name || "No name"
        apiCustomRes.category = detailMovie.tagNameList
        apiCustomRes.episodeCount = detailMovie.episodeCount === null ? 0 : detailMovie.episodeCount
        apiCustomRes.nation = detailMovie.areaNameList[0]
        apiCustomRes.score = detailMovie.score
        apiCustomRes.bannerImage = detailMovie.coverHorizontalUrl
        apiCustomRes.mainImage = detailMovie.coverVerticalUrl
        apiCustomRes.introduction = detailMovie.introduction

        detailMovie.episodeVo.forEach((episode, index) => {
            let object = {}
            object.episodeId = episode.id
            object.seriesNo = episode.seriesNo
            object.resolution = getResolutionMovies(episode.definitionList)
            object.subtitles = handleFilterSub(episode.subtitlingList)
            listSpisodeMovie[index] = object
        })
        apiCustomRes.episodeDetails = listSpisodeMovie
        apiCustomRes.recommendMovies = getListOfferMovie(detailMovie.likeList)
        apiCustomRes.relatedSeries = getRelatedSeries(detailMovie.refList)

        console.log("movie id " + apiCustomRes.movieId);
        console.log("category id " + apiCustomRes.categoryId);

        return apiCustomRes;
    } catch (error) {
        console.log("Error in getDetailMovieService: " + error);
    }
}
let getMovieMediaService = async (category, movieId, episodeId, resolution) => {
    let apiResponse = {}
    let apiLoklok = {}
    let i = 0;

    try {
        do {
            apiLoklok = await getApiMovie.getMovieMediaAxios(category, movieId, episodeId, resolution)
            apiResponse.episodeId = apiLoklok.data.data.episodeId
            console.log("LOADING" + i);
            i++;
        } while (apiLoklok.data.data.mediaUrl.slice(0, apiLoklok.data.data.mediaUrl.indexOf("tv") + 2) !== "https://ali-cdn-play.loklok.tv")
        apiResponse.mediaUrl = apiLoklok.data.data.mediaUrl
        apiResponse.totalDuration = apiLoklok.data.data.totalDuration

        console.log(apiResponse.mediaUrl);

        return apiResponse
    } catch (error) {
        console.log("Error in getMovieMediaService: " + error);
    }
}
let getTrailerMovieService = async (name, episodeCount) => {

    try {
        let dataApi = await getApiMovie.getTrailerMovieAxios(name)
        return getVideoIdTrailer(dataApi.data.items, episodeCount)
    } catch (error) {
        console.log("Error in getTrailerMovieService: " + error);
    }
}
let apiSearchWithKeyWordService = async (searchKeyWord) => {
    let dataResponse = []

    try {
        let dataApi = await getApiMovie.apiSearchWithKeyWordAxios(searchKeyWord)

        dataApi.data.data.searchResults.forEach((movie, index) => {
            let object = {}
            object.categoryId = movie.domainType
            object.movieId = parseInt(movie.id)
            object.name = movie.name
            object.mainImage = movie.coverVerticalUrl
            dataResponse[index] = object
        });


        return dataResponse

    } catch (error) {
        console.log("Error in apiSearchWithKeyWordService: " + error);
    }
}

module.exports = {
    getApiHomeDataService: getApiHomeDataService,
    getDataBannerService: getDataBannerService,
    getDetailMovieService: getDetailMovieService,
    getMovieMediaService: getMovieMediaService,
    getTrailerMovieService: getTrailerMovieService,
    apiSearchWithKeyWordService: apiSearchWithKeyWordService
}
