import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'

const ImageSeqFactory = () => {
  return dbConfig.define(
    'Images',
    {
      ImageId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      ImageDataLocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ImageMimeType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'Images'
    },
  )
}

const ImgSeq = ImageSeqFactory()

export default ImgSeq
