import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import { UserClientSeq, BuildingSeq } from '../../models'


const AuditSeqFactory = () => {
  return dbConfig.define(
    'Audits',
    {
      AuditCode: {
        type: DataTypes.INTEGER
      },
      Date: {
        type: DataTypes.DATE(3)
      },
      IsActive: {
        type: DataTypes.BOOLEAN
      },
      IsDone: {
        type: DataTypes.BOOLEAN
      },
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      Type: {
        type: DataTypes.STRING
      },
      NameClient_Id: {
        type: DataTypes.STRING
      },
      LocationClient_Id: {
        type: DataTypes.STRING
      },
      PresentClient: {
        type: DataTypes.TEXT,
      },
      Attn: {
        type: DataTypes.TEXT,
      },
      week: {
        type: DataTypes.INTEGER,
      },
      LastControlDate: {
        type: DataTypes.DATE
      },
      Activate: {
        type: DataTypes.BOOLEAN
      },
      LocationManagerSignImage: {
        type: DataTypes.STRING,
        foreignKey: true
      },
      AuditHash: {
        type: DataTypes.STRING.BINARY,
      }
    },
    {
      timestamps: false,
      tableName: 'Audits',
      defaultScope: {
        order: [['AuditCode', 'ASC']]
      }
    }
  )
};


const AuditSeq = AuditSeqFactory()

setTimeout(() => {
  AuditSeq.belongsTo(UserClientSeq, {
    as: 'UserClient',
    foreignKey: 'NameClient_Id'
  })
  AuditSeq.belongsTo(BuildingSeq, {
    as: 'Location',
    foreignKey: 'LocationClient_Id'
  })
}, 0)

export default AuditSeq
