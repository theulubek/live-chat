import { DataTypes } from "sequelize";

export default ({ sequelize }) => {
    sequelize.define("User", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
            }
        },
        userimg: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
        },
        socket_id: {
            type: DataTypes.STRING
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: 'users'
    })
}
