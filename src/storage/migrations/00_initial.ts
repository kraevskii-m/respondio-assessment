import {QueryInterface, DataTypes} from 'sequelize';

const up = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable('users', {
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
            unique: true,
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
                len: {
                    args: [1, 129],
                    msg: "Password length is not correct"
                }
            }
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Salt length is not correct"
                }
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
}

const down = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.dropTable('users');
}

module.exports = {up, down};
