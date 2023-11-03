// import { DataTypes } from 'sequelize'
// import { dbConfig } from '../../init/db'
// import ElementSeq   from '../kpiElement/model'
// import ErrorTypeSeq  from '../errorType/model'

// const FormErrorElementSeqFactory = () => {
//   return dbConfig.define(
//     'FormErrorElement',
//     {
//       ErrorElementId: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true
//       },
//       FormId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//       },
//       ErrorTypeId: {
//         type: DataTypes.UUID,
//         allowNull: true,
//       },
//       ElementId: {
//         type: DataTypes.UUID,
//         allowNull: true,
//       },
//       Logbook: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       TechnicalAspects: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       LogbookImage: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       TechnicalAspectsImage: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       Count: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       }
//     },
//     {
//       timestamps: false,
//       tableName: 'FormErrorElement'
//     },
//   )
// }

// const FormErrorElement = FormErrorElementSeqFactory()

// export default FormErrorElement


import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import ElementSeq   from '../kpiElement/model'
import ErrorTypeSeq  from '../errorType/model'
import FormSeq from '../area/model'
const FormErrorElementSeqFactory = () => {
  return dbConfig.define(
    'FormErrorElement',
    {
      ErrorElementId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      FormId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ErrorTypeId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ElementId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Logbook: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      TechnicalAspects: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LogbookImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      TechnicalAspectsImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      timestamps: false,
      tableName: 'FormErrorElement1'
    },
  )
}

const FormErrorElement = FormErrorElementSeqFactory()

setTimeout(()=>{

  FormErrorElement.belongsTo(ElementSeq,{
    as:'Element',
    foreignKey:'ElementId'
  })

  FormErrorElement.belongsTo(ErrorTypeSeq,{
    as:'ErrorType',
    foreignKey:'ErrorTypeId'
  })

  FormErrorElement.belongsTo(FormSeq,{
    as:'Forms',
    foreignKey:'FormId'
  })

},0)




export default FormErrorElement

