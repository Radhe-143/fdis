import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'

const ElementTypeSeqFactory = () => {
  return dbConfig.define(
    'ElementType',
    {
      ElementTypeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      ElementTypeValue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      tableName: 'ElementType',
      // defaultScope: {
      //   order: [['ElementType', 'ASC']]
      // }

    },
  )
}

const ElementTypeSeq = ElementTypeSeqFactory()

export default ElementTypeSeq
