import { DataTypes } from 'sequelize';
import { dbConfig } from '../../init/db';
import { ErrorTypeSeq } from '../../models';

const ErrorCategorySeqFactory = () => {
  return dbConfig.define(
    'ErrorCategory',
    {
      Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    },
    
    {
      timestamps: false,
      tableName: 'ErrorCategories',
      defaultScope: {
        order: [['Name', 'ASC']]
      }
    }
  );
};

const ErrorCategorySeq = ErrorCategorySeqFactory();

setTimeout(() => {
  ErrorCategorySeq.hasMany(ErrorTypeSeq, {
    as: 'ErrorTypes',
    foreignKey: 'ErrorCategoryId'
  });
}, 0);

export default ErrorCategorySeq;
