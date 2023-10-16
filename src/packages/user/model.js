import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import UserClientSeq from '../userClient/model'


const UserSeqFactory = () => {
  return dbConfig.define(
    'Users',
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      UserName: { type: DataTypes.STRING, allowNull: false },
      FirstName: { type: DataTypes.STRING, allowNull: true },
      LastName: { type: DataTypes.STRING, allowNull: true },
      ProfileImage: { type: DataTypes.UUID, allowNull: true },
    },
    {
      timestamps: false,
      tableName: 'Users'
    },
  )
}

const UserSeq = UserSeqFactory()

setTimeout(()=>{
  UserSeq.hasMany(UserClientSeq, {
    as: 'UserClient', // Update the alias to 'UserClient'
    foreignKey: 'User_Id',
  });
  
})



export default UserSeq
