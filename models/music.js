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
    imgData: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Music',
  });
  return Music;
};