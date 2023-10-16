import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import { AuditSeq, UserClientSeq} from '../../models'

const BranchSeqFactory = () => {
  return dbConfig.define(
    'Branches',
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      BranchName: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      tableName: 'Branches'
    },
  )
}

const BranchSeq = BranchSeqFactory()
setTimeout(() => {
  BranchSeq.hasMany(AuditSeq, {
    as: 'Audits',
    foreignKey: 'Branch_Id'
  }),

  BranchSeq.hasMany(UserClientSeq,{
    as:'Users_Client',
    foreignKey:'Branch_Id'
  })
},0
)
export default BranchSeq
