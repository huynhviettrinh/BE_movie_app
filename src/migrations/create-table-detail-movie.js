'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('MovieDetails', {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            movieId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            trailerId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            releaseYear: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            episodeCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            nation: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            score: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            introduction: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('MovieDetails');
    }
};