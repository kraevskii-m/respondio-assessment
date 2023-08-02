import {DataTypes, Model} from "sequelize";
import {sequelize} from "../db";

enum NoteType {
    Personal,
    Work,
    Family,
    Hobby,
}

export class Note extends Model {
    declare id: number;
    declare title: string;
    declare text: string;
    declare noteType: NoteType;
}


Note.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    text: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    noteType: {
        type: DataTypes.ENUM("Personal", "Work", "Family", "Hobby"),
        defaultValue: "Personal",
        allowNull: false,
    },
}, {sequelize, timestamps: true});

