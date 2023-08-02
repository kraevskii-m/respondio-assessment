import {DataTypes, Model} from "sequelize";
import {sequelize} from "../db";

export class User extends Model {
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare passwordHash: string;
    declare salt: string;
}


User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 100],
                msg: "First Name length is not correct"
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 100],
                msg: "Last Name length is not correct"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: 'compositeIndex',
        allowNull: false,
        validate: {
            len: {
                args: [5, 100],
                msg: "Email length is not correct"
            }
        }
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            validate: {
                len: {
                    args: [1, 30],
                    msg: "Password length is not correct"
                }
            }
        }
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            validate: {
                len: {
                    args: [1, 30],
                    msg: "Salt length is not correct"
                }
            }
        }
    }
}, {sequelize, timestamps: true});

