import { DataTypes } from 'sequelize';
import { dbConfig } from '../../init/db';
import { ErrorTypeSeq } from '../../models';

const ErrorKindSeqFactory = () => {
  return dbConfig.define(
    'ErrorKind',
    {
      Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: 'ErrorKinds',
      defaultScope: {
        order: [['Name', 'ASC']]
      }
    }
  );
};

const ErrorKindSeq = ErrorKindSeqFactory();

setTimeout(() => {
  ErrorKindSeq.hasOne(ErrorTypeSeq, {
    as: 'ErrorType',
    foreignKey: 'ErrorKindId'
  });
}, 0);

export default ErrorKindSeq;
