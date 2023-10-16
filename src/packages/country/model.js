import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'

const CountrySeqFactory = () => {
  return dbConfig.define(
    'Country',
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      CountryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CountryCode: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      tableName: 'Country'
    },
  )
}

const CountrySeq = CountrySeqFactory()


export default CountrySeq
