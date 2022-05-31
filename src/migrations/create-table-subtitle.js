'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Subtitles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            episodeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            movieId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            seriesNo: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            language: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            languageAbbr: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            subtitlingUrl: {
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
        await queryInterface.dropTable('Subtitles');
    }
};