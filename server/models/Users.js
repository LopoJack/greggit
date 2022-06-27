const sequelize = require("sequelize");
const Posts = require("./Posts");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    /*
    Users.associate = (models) => {
    
        //1 to M with Posts
        Users.hasMany(models.Posts, {
            foreignKey: 'author_id',
            onDelete: "cascade",
        });
    

        //1 to M with Comments
        Users.hasMany(models.Comments, {
            foreignKey: 'author_id',
            onDelete: "cascade",
        });
    };
    */
   
    return Users;
};