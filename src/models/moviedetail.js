'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MovieDetail extends Model {

        static associate(models) {

        }
    }

    MovieDetail.init({
        movieId: DataTypes.INTEGER,
        trailerId: DataTypes.STRING,
        releaseYear: DataTypes.INTEGER,
        category: DataTypes.STRING,
        episodeCount: DataTypes.INTEGER,
        nation: DataTypes.STRING,
        score: DataTypes.INTEGER,
        introduction: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'MovieDetail',
    });
    return MovieDetail;
};