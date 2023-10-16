import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import{FormSeq} from '../../models'; 

const FloorSeqFactory = () => {
  return dbConfig.define(
    'Floors',
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      FloorName: {
        type: DataTypes.STRING,
        allowNull: false,
        order:[['FloorName', 'ASC']]
      },
      FloorNameAbv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
         
      }
    },
    {
      timestamps: false,
      tableName: 'Floors',
     
    },
  )
}

const FloorSeq = FloorSeqFactory()

setTimeout(()=>{
FloorSeq.hasMany(FormSeq,{
  as: 'Form',
  foreignKey:'FloorId'
})
},0)
export default FloorSeq
