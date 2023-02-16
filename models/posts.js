'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users)
      this.belongsToMany(models.categories, {
        through: 'post_categories',
        as: 'categories',
        foreignKey: 'postId'
      });
    }
  }
  posts.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};