'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MovieFavorite.init({
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    movieId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    mainImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MovieFavorites',
  });
  return MovieFavorite;
};