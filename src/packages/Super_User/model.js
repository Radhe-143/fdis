import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import {SuperUser} from '../../models';


const UserS = () => {
  return dbConfig.define(
    'aspnet_Users',
    {
      
        ApplicationId: 
          { type: DataTypes.STRING,
             allowNull: false },
    
      UserId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      UserName: { type: DataTypes.STRING, allowNull: false },
      LoweredUserName:{ type: DataTypes.STRING, allowNull: false },
      MobileAlias:{ type: DataTypes.STRING, allowNull: false },
      IsAnonymous:{ type: DataTypes.STRING, allowNull: false },
      LastActivityDate:{ type: DataTypes.DATE(3) , allowNull: false} 
    },
    {
      timestamps: false,
      tableName: 'aspnet_Users'
    },
  )
}

const SuperUserSeq= UserS();




const Members = dbConfig.define(
    'aspnet_Membership',

{     
       UserId: {
       type: DataTypes.INTEGER,
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
      
      Email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
      LoweredEmail: {
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
      FailedPasswordAttemptWindowStart: {
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

  const SuperUsers = Members
  SuperUsers.beforeCreate((user) => {
    user.Password = method.hashPassword(user.Password)
    return true
  })
  








setTimeout(() => {
  SuperUserSeq.belongsTo(SuperUser,{
    through:Members,
    as:'aspnet_Membership',
    foreignKey:'UserId',
    timestamps:false
  })

  SuperUser.belongsTo(SuperUserSeq,{
    through:Members,
    as:'aspnet_Users',
    foreignKey:'UserId',
    timestamps:false
  })



},0)


export default SuperUserSeq
