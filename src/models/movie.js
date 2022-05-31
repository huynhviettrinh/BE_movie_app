'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        static associate(models) {
        }
    }
    Movie.init({
        movieId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        mainImage: DataTypes.STRING,
        bannerImage: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Movie',
    });
    return Movie;
};
