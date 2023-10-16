import { DataTypes } from 'sequelize'
import { dbConfig } from '../../init/db'
import { ElementTypeSeq, CategorySeq , FormSeq} from '../../models'

const AreaDescriptionSeqFactory = () => {
  return dbConfig.define(
    'AreaDescriptions',
    {
      Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ModuleId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Abbreviation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    },
    {
      timestamps: false,
      tableName: 'AreaDescriptions'
    },
  )
}

const AreaDescriptionElementTypeSeq = dbConfig.define('AreaDescription_ElementType', {
  AreaDescModuleId: {
    type: DataTypes.INTEGER,
  }
}, {
  timestamps: false,
  tableName: 'AreaDescription_ElementType'
});

const CategoryAreaDescriptionSeq = dbConfig.define('Category_AreaDescription', {
  AreaDescModuleId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'Category_AreaDescription'
});


const AreaDescriptionSeq = AreaDescriptionSeqFactory()


setTimeout(()=>{
  AreaDescriptionSeq.hasOne(FormSeq,{
    as:'Forms',
    foreignKey:'AreaDescId'
  })
},0)

setTimeout(() => {
  AreaDescriptionSeq.belongsToMany(ElementTypeSeq, {
    through: AreaDescriptionElementTypeSeq,
    as: 'ElementType',
    foreignKey: 'AreaDescId',
    timestamps: false

  });


  ElementTypeSeq.belongsToMany(AreaDescriptionSeq, {
    through: AreaDescriptionElementTypeSeq,
    as: 'AreaDescription',
    foreignKey: 'ElementTypeId',
    timestamps: false
  });
  

  AreaDescriptionSeq.belongsToMany(CategorySeq, {
    through: CategoryAreaDescriptionSeq,
    as: 'Category',
    foreignKey: 'AreaDescId',
    timestamps: false
  });

  CategorySeq.belongsToMany(AreaDescriptionSeq, {
    through: CategoryAreaDescriptionSeq,
    as: 'AreaDescription',
    foreignKey: 'CategoryId',
    timestamps: false
  });
}, 0)

export default AreaDescriptionSeq
