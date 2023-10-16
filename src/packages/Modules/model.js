import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import { SuperUserSeq } from '../../models'
import {UserClientSeq,UserSeq} from '../../models'

const ModulesSqe = () => {
  return dbConfig.define(
    'Modules',
    { 
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      
      Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      AreaName: {
        type: DataTypes.STRING,
        allowNull: true,
      }   
    },
    {
      timestamps: false,
      tableName: 'Modules'
    },
  )
}

const Modules = ModulesSqe()

setTimeout(() => {

  Modules.hasMany(UserClientSeq, {
    as: 'Users_Client',
    foreignKey: 'Module_Id'
  })

  ,0})



export default Modules
