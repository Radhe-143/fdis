import { DataTypes } from 'sequelize';
import { dbConfig } from '../../init/db';
import { ErrorKindSeq, ErrorCategorySeq , FormErrorElement } from '../../models';

const ErrorTypeSeqFactory = () => {
  return dbConfig.define(
    'ErrorType',
    {
      ErrorTypeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      ErrorTypeValue: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ErrorCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      ErrorKindId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      SortOrder: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      timestamps: false,
      tableName: 'ErrorType',
      defaultScope: {
        order: [['ErrorTypeValue', 'ASC']]
      }
    }
  );
};

const ErrorTypeSeq = ErrorTypeSeqFactory();

setTimeout(() => {
  ErrorTypeSeq.belongsTo(ErrorKindSeq, {
    as: 'ErrorKind',
    foreignKey: 'ErrorKindId'
  });
  ErrorTypeSeq.belongsTo(ErrorCategorySeq, {
    as: 'ErrorCategory',
    foreignKey: 'ErrorCategoryId'
  });

  FormErrorElement.hasMany(FormErrorElement,{
    as:'FormErrorElement',
    foreignKey:'ErrorTypeId'
  })
  
}, 0);

export default ErrorTypeSeq;
