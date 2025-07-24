'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    
    static associate(models) {
      Token.belongsTo(models.User, { foreignKey: 'user_id' });
      
    }
  }
  Token.init({
    token: DataTypes.STRING,
    expires: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};