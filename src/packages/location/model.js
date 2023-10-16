import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import { UserClientSeq ,AuditSeq} from '../../models'

const BuildingSeqFactory = () => {
  return dbConfig.define(
    'Buildings',
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      Name: { type: DataTypes.STRING, allowNull: false },
      Size: { type: DataTypes.INTEGER, allowNull: false },
      ClientId: { type: DataTypes.STRING, allowNull: false },
      Region: { type: DataTypes.STRING, allowNull: true },
      City: { type: DataTypes.STRING, allowNull: true },
      Address: { type: DataTypes.STRING, allowNull: true },
      ContactPerson: { type: DataTypes.STRING, allowNull: true },
      Activate: { type: DataTypes.BOOLEAN, allowNull: true },
      Email: { type: DataTypes.STRING, allowNull: true , unique: true},
    },
    {
      timestamps: false,
      tableName: 'Buildings'
    },
  )
}

const BuildingSeq = BuildingSeqFactory()


setTimeout(() => {
  BuildingSeq.hasOne(UserClientSeq, {
    as: 'Users_Client',
    foreignKey: 'ClientId',
    timestamps: false
  });

  // BuildingSeq.belongsToMany(AuditSeq, {
  //   through: 'AuditLocation', // This is the name of the join table
  //   foreignKey: 'LocationClient_Id', // Foreign key in the join table referencing BuildingSeq
  // });

  BuildingSeq.hasOne(AuditSeq,{
    as:'Audits',
    foreignKey:'LocationClient_Id',
    timestamps:false
  })


}, 0)

export default BuildingSeq