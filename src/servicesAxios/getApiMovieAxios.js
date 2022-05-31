const axios = require('axios');

const axiosOptions = {
    headers: {
        "lang": "en",
        "versioncode": 11,
        "clienttype": "ios_jike_default",
        "Host": "ga-mobile-api.loklok.tv",
        "Sec-Fetch-Site": "cross-site"
    }
}
const getDataMovieByPage = async (page) => {
    return await axios.get(`https://ga-mobile-api.loklok.tv/cms/app/homePage/getHome?page=${page}`, axiosOptions)
}

const getDetailMovieAxios = async (id, category) => {
    return await axios.get(`https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get?id=${id}&category=${category}`, axiosOptions)
}

const getMovieMediaAxios = async (category, movieId, episodeId, resolution) => {
    return await axios.get(`https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=${category}&contentId=${movieId}&episodeId=${episodeId}&definition=${resolution}`, axiosOptions)
}

const getTrailerMovieAxios = async (name) => {
    let key1 = "AIzaSyDiVjP7so70_qYh41uERoryOVVXF0dX-RE"
    let key2 = "AIzaSyDx4pn8cbSgtPmx94RU0zQMFkvulLIaDcE"

    try {
        let idTrailerKey1 = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key1}&type=video&q=${name} trailer`)
        return idTrailerKey1
    } catch (error) {
        console.log("Error in getTrailerMovieAxios: " + error);
        let idTrailerKey2 = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key2}&type=video&q=${name} trailer vietsub`)
        return idTrailerKey2
    }
}

const apiSearchWithKeyWordAxios = async (searchKeyWord) => {
    let options = {
        searchKeyWord: searchKeyWord,
        size: 20,
        sort: "",
        searchType: ""

    }

    return await axios.post(`https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchWithKeyWord`, options, axiosOptions)
}


module.exports = {
    getDataMovieByPage: getDataMovieByPage,
    getDetailMovieAxios: getDetailMovieAxios,
    getMovieMediaAxios: getMovieMediaAxios,
    getTrailerMovieAxios: getTrailerMovieAxios,
    apiSearchWithKeyWordAxios: apiSearchWithKeyWordAxios
}

