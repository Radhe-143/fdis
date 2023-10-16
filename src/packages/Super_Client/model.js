import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import { SuperUserSeq,CountrySeq, AuditSeq, BranchSeq, UserSeq } from '../../models'

const UserClientSeqFactory = () => {
  return dbConfig.define(
    'aspnet_Membership',
    { 
      UserId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PasswordFormat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      PasswordSalt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MobilePIN: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PasswordQuestion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PasswordAnswer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      IsApproved: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      IsLockedOut: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CreateDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LastLoginDate: {
        type: DataTypes.DATE(3),
        allowNull: true,
      },
      LastPasswordChangedDate: {
        type: DataTypes.DATE(3),
        allowNull: true,
      },
      LastLockoutDate: {
        type: DataTypes.DATE(3),
        allowNull: true,
      },
      FailedPasswordAttemptCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      FailedPasswordAttemptCount: {
        type: DataTypes.DATE(3),
        allowNull: true,
      },
      FailedPasswordAnswerAttemptCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FailedPasswordAnswerAttemptWindowStart:
      {
        type: DataTypes.DATE(3),
        allowNull: false,
      },
      Comment:
      { type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      timestamps: false,
      tableName: 'aspnet_Membership'
    },
  )
}

const SuperClient = UserClientSeqFactory()

setTimeout(() => {
  SuperClient.belongsTo(SuperUserSeq, {
    as: 'aspnet_Users',
    foreignKey: 'UserId'
  })
  // SuperClient.belongsTo(BranchSeq, {
  //   as: 'Branch',
  //   foreignKey: 'Branch_Id'
  // })

  // SuperClient.hasMany(AuditSeq, {
  //   as: 'Audits',
  //   foreignKey: 'NameClient_Id'
  // })

  // SuperClient.belongsTo(UserSeq, {
  //   as: 'User',
  //   foreignKey: 'Id',
  //   timestamps: false
  // })
}, 0)

export default SuperClient
