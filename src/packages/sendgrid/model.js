import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'

const sendmailseqfac = () => {
  return dbConfig.define(
    'sendEmail',
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      Text: { type: DataTypes.STRING, 
        allowNull: true 
      },
      subject:{
        type: DataTypes.STRING, 
        allowNull: true 
      },
      html:{
        type: DataTypes.STRING, 
        allowNull: true 
      }
    },
    {
      timestamps: false,
      tableName: 'sendEmails',
    },
  )
}

const sendmailseq = sendmailseqfac()


export default sendmailseq