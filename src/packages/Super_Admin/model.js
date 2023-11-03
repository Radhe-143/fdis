// import { DataTypes } from 'sequelize'
// ipomrt { dbConfig } from '../../init/db'
// import method from './method'
// import { SuperUserSeq,CountrySeq, AuditSeq, BranchSeq, UserSeq } from '../../models'

// const UserClientSeqFactory = () => {
//   return dbConfig.define(
//     'aspnet_Membership',
//     { 
//       ApplicationId:{
        
//         type: DataTypes.STRING,
//         allowNull: false,

//     },
//        UserId: {
//         primaryKey: true,
//         allowNull: false,
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4
//       },
//       Password: {
//         type: DataTypes.STRING,
//         allowNull: false,

//       },
//       PasswordFormat: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
      
//       PasswordSalt: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       MobilePIN: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
      
//       Email: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
      
//       LoweredEmail: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },

//       PasswordQuestion: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       PasswordAnswer: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       IsApproved: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       IsLockedOut: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       CreateDate: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       LastLoginDate: {
//         type: DataTypes.DATE(3),
//         allowNull: true,
//       },
//       LastPasswordChangedDate: {
//         type: DataTypes.DATE(3),
//         allowNull: true,
//       },
//       LastLockoutDate: {
//         type: DataTypes.DATE(3),
//         allowNull: true,
//       },
//       FailedPasswordAttemptCount: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       FailedPasswordAttemptWindowStart: {
//         type: DataTypes.DATE(3),
//         allowNull: true,
//       },
//       FailedPasswordAnswerAttemptCount: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       FailedPasswordAnswerAttemptWindowStart:
//       {
//         type: DataTypes.DATE(3),
//         allowNull: false,
//       },
//       Comment:
//       { type: DataTypes.STRING,
//         allowNull: true,
//       }
//     },
//     {
//       timestamps: false,
//       tableName: 'aspnet_Membership'
//     },
//   )
// }

// const SuperUser = UserClientSeqFactory()
// SuperUser.beforeCreate((user) => {
//   user.Password = method.hashPassword(user.Password)
//   return true
// })

// SuperUser.beforeUpdate((user) => {
//   user.Password = method.hashPassword(user.Password)
//   console.log("ddddddddddddddddddddddddddddddd", user.Password)
//   return true
// })


// const UsersM = dbConfig.define(
//   'aspnet_Users',

// {     
//      UserId: {
//     //  type: DataTypes.INTEGER,
    
//      primaryKey: true,
//      type: DataTypes.UUID,
//     },
   
//   },
//   {
//     timestamps: false,
//     tableName: 'aspnet_Membership'
//   },
// )


// setTimeout(() => {
//   SuperUser.belongsTo(SuperUserSeq, {

//     through:UsersM,
//     as: 'aspnet_Users',
//     foreignKey: 'UserId'
//   })

//   UsersM.belongsTo(SuperUser, {
//     as: 'aspnet_Membership',
//     foreignKey: 'UserId'
//   })

// }, 0)

// export default SuperUser



import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import method from './method'
import { SuperUserSeq,CountrySeq, AuditSeq, BranchSeq, UserSeq } from '../../models'

const newAdministrator = () => {
  return dbConfig.define(
      'Administrator',
      {
          UserId: {
              primaryKey: true,
              type: DataTypes.UUID,
              defaultValue: DataTypes.UUIDV4
          },
          UserName: {
              type: DataTypes.STRING,
              allowNull: false
          },
          FirstName: {
              type: DataTypes.STRING,
              allowNull: true
          },
          LastName: {
              type: DataTypes.STRING,
              allowNull: true
          },
          Email: {
              type: DataTypes.STRING,
              allowNull: true
          },
          LoweredEmail: {
              type: DataTypes.STRING,
              allowNull: true
          },
          
          IsAnonymous: {
              type: DataTypes.BOOLEAN,
              allowNull: true
          },

          IsApproved: {
              type: DataTypes.BOOLEAN,
              allowNull: true
          },

          IsLockedOut: {
              type: DataTypes.BOOLEAN,
              allowNull: true
          },
     
          Password: {
              type: DataTypes.STRING,
              allowNull: true
          },
          PasswordSalt: {
              type: DataTypes.STRING,
              allowNull: true
          },
          CreateDate: {
              type: DataTypes.DATE,
              allowNull: true
          },
          ApplicationId: {
              type: DataTypes.STRING,
              allowNull: true
          },
          RoleId: {
              type: DataTypes.STRING,
              allowNull: true
          },
          ProfileImage: {
              type: DataTypes.STRING,
              allowNull: true
          },

          Verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        Description:{
          type:DataTypes.STRING,
          allowNull:true
        }
      },
      {
          timestamps: false,
          tableName: 'Administrator', // Make sure this matches your actual table name
      },
  )
}

const SuperAdminSeq=newAdministrator()
export default SuperAdminSeq




