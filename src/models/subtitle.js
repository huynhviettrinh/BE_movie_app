'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subtitle extends Model {
        static associate(models) {
        }
    }
    Subtitle.init({
        episodeId: DataTypes.INTEGER,
        movieId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        seriesNo: DataTypes.INTEGER,
        language: DataTypes.STRING,
        languageAbbr: DataTypes.STRING,
        subtitlingUrl: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Subtitle',
    });
    return Subtitle;
};
