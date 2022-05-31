'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MediaMovie extends Model {
        static associate(models) {
        }
    }
    MediaMovie.init({
        episodeId: DataTypes.INTEGER,
        movieId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        seriesNo: DataTypes.INTEGER,
        mediaUrl: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MediaMovie',
    });
    return MediaMovie;
};
