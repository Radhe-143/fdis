import { DataTypes } from 'sequelize';
import { dbConfig } from '../../init/db';
import { AreaDescriptionSeq, AuditSeq , CategorySeq, FloorSeq , FormErrorElement} from '../../models'; // Assuming you have the AuditSeq model in a separate module

const Form = () => {
  return dbConfig.define(
    'Forms',
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      CounterElement: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Date: {
        type: DataTypes.DATE,
      },
      PresentClient: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ApprovedLimits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      AreaCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Faults: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Comments: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      AuditId: {
        type: DataTypes.STRING,
      },
      CategoryId: {
        type: DataTypes.STRING,
        allowNull:true
      },
      FloorId: {
        type: DataTypes.STRING,
      },
      AuditBy_Id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Uploaded: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      AreaDescId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      AreaDescModuleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'Forms',
    }
  );
};

 const FormSeq=Form()

// Define associations within the same module
setTimeout(()=>{
  FormSeq.belongsTo(AuditSeq, {
    as: 'Auditdata',
    foreignKey: 'AuditId',
  });


  FormSeq.belongsTo(CategorySeq,{
    as:'Categories',
    foreignKey:'CategoryId'
  })


  FormSeq.belongsTo(FloorSeq,{
    as:'Floors',
    foreignKey:'FloorId'
  })


  FormSeq.belongsTo(AreaDescriptionSeq,{
    as:'AreaDescriptions',
    foreignKey:'AreaDescId'
  })

  FormSeq.hasOne(FormErrorElement,{
    as:'FormErrorElement1',
    foreignKey:'FormId'
  })
  
  


},0)


export default FormSeq;
