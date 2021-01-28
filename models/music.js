'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Music.belongsToMany(models.User, {
        through: models.Playlist,
        foreignKey: 'music_id'
      })
    }

    refMusics(){
      return `${this.artist}_${this.genre}_${this.released_year}`
    }

  };
  Music.init({
    title:{
      type: DataTypes.STRING,
      validate: { notEmpty: {
          msg: `Title should not be empty!`
        }
      }
    },
    artist: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: ` Artist should not be empty!`
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: ` Genre should not be empty!`
        }
      }
    },
    released_year: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: ` Released Year should not be empty!`
        }
      }
    },
    imgData: DataTypes.STRING,
    refMusic: DataTypes.STRING,
  }, {

    sequelize,
    modelName: 'Music',
  });
  return Music;
};