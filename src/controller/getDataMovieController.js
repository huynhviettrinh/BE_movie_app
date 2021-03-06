const apiDataService = require('../services/getDataMovieService')


let getListMovieController = async (req, res) => {
    try {
        let respond = await apiDataService.getApiHomeDataService(req.query.page);
        return res.status(200).json({
            status: 0,
            data: respond
        })
    } catch (error) {
        console.log("Error in getListMovieController: " + error);
    }
}

let getBannerController = async (req, res) => {
    try {
        let bannerData = await apiDataService.getDataBannerService(0);
        return res.status(200).json({
            status: 0,
            data: bannerData
        })
    } catch (error) {
        console.log("Error in getBannerController: " + error);
    }
}

let getDetailMovieController = async (req, res) => {
    try {
        let respond = await apiDataService.getDetailMovieService(req.query.id, req.query.category);
        return res.status(200).json({
            status: 0,
            data: respond
        })
    } catch (error) {
        console.log("Error in getDetailMovieController: " + error);
    }
}

let getMovieMediaController = async (req, res) => {
    try {
        let respond = await apiDataService.getMovieMediaService(
            req.query.category,
            req.query.contentId,
            req.query.episodeId,
            req.query.definition
        );
        return res.status(200).json({
            status: 0,
            data: respond
        })
    } catch (error) {
        console.log("Error in getMovieMediaController: " + error);
    }
}



let apiSearchWithKeyWordController = async (req, res) => {
    try {
        let respond = await apiDataService.apiSearchWithKeyWordService(
            req.query.searchKeyWord,
        );
        return res.status(200).json({
            status: 0,
            data: respond
        })
    } catch (error) {
        console.log("Error in apiSearchWithKeyWordController: " + error);
    }
}


module.exports = {
    getListMovieController: getListMovieController,
    getBannerController: getBannerController,
    getDetailMovieController: getDetailMovieController,
    getMovieMediaController: getMovieMediaController,
    apiSearchWithKeyWordController: apiSearchWithKeyWordController
}