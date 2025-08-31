import { DataTypes } from "sequelize";
import {sequelize} from "./index.js"


export const Post = sequelize.define("Post", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE
        }
    }, 
    {
        timestamps: false,
    }
);
  