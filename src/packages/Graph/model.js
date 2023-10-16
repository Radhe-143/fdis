import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import { SuperUserSeq } from '../../models'
import {UserClientSeq,UserSeq} from '../../models'

const ModulesSqe = () => {
  return dbConfig.define(
    'Buildings',
    {
      Id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      AreaName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    },
    {
      timestamps: false,
      tableName: 'Buildings'
    },
  )
}

const Modules = ModulesSqe()



export default Modules
