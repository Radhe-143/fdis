import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import { CountrySeq, AuditSeq, BranchSeq, UserSeq , BuildingSeq,Modules, newperformerseq,CategorySeq} from '../../models'

const UserClientSeqFactory = () => {
  return dbConfig.define(
    'Users_Client',
    {
      Id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      CompanyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ContactPerson: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Mobile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Fax: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      StreetName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ZipCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      City: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Password:{
        type:DataTypes.STRING,
        allowNull:false
      },
      State: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CountryId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Branch_Id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      User_Id:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      ClientId:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      Module_Id:{
        type: DataTypes.STRING,
        allowNull: true,
      },

      URLClientPortal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ReportType: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING, // Adjust the data type if needed
        allowNull: true,
      },
      Active: {
        type: DataTypes.BOOLEAN, 
        allowNull: true,
      }
    },
    {
      timestamps: false,
      tableName: 'Users_Client'
    },
  )
}

const UserClientSeq = UserClientSeqFactory()

setTimeout(() => {
  UserClientSeq.belongsTo(CountrySeq, {
    as: 'Country',
    foreignKey: 'CountryId'
  })
  UserClientSeq.belongsTo(BranchSeq, {
    as: 'Branch',
    foreignKey: 'Branch_Id'
  })
  UserClientSeq.belongsTo(Modules, {
    as: 'Modules',
    foreignKey: 'Module_Id'
  })
  UserClientSeq.hasMany(AuditSeq, {
    as: 'Audits',
    foreignKey: 'NameClient_Id'
  })

  UserClientSeq.belongsTo(BuildingSeq,{
    as:'Buildings',
    foreignKey:'ClientId'
  })

  UserClientSeq.belongsTo(UserSeq, {
    as: 'User',
    foreignKey: 'User_Id',
    timestamps: false
  })

}, 0)

export default UserClientSeq