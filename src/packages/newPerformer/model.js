import { DataTypes, STRING } from 'sequelize';
import { dbConfig } from '../../init/db';
import UserClientSeq from '../userClient/model';
import AuditSeq from '../audit/model';

const NewPerformerseqfactory = () => {
    return dbConfig.define(
        'NewPerformer',
        {
            UserId: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            UserName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            FirstName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            LastName: {
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
            Mobile: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            Phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            IsAnonymous: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            IsApproved: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            IsLockedOut: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            Count: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Ordinal: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            ReportType: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            PasswordSalt: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            CreateDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            CompanyName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ClientId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ApplicationId: {
                type: DataTypes.STRING,
                allowNull: STRING,
            },
            AdminId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ProfileImage: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            PerformerTypes_Id: {
                // type: DataTypes.BOOLEAN,
                type: DataTypes.STRING,
                allowNull: true,
            },

        },
        {
            timestamps: false,
            tableName: 'NewPerformer', // Make sure this matches your actual table name
        },
    )
}




const PerformerClientSeq = dbConfig.define(
    'PerformerClientLink',
    {
        PerformerClientStatus: {
        type: DataTypes.BOOLEAN,
      },
  
    },
    {
      timestamps: false,
      tableName: 'PerformerClientLink',
    }
  );


  const newperformerseq=NewPerformerseqfactory()

setTimeout(() => {
  newperformerseq.belongsTo(UserClientSeq, {
    as: 'Users_Client',
    foreignKey: 'ClientId',

  });

  newperformerseq.hasMany(AuditSeq, {
    as: 'Audits',
    foreignKey: 'PresentClient',
  });
}, 0);



// Define the many-to-many association
setTimeout(() => {
  newperformerseq.belongsToMany(UserClientSeq, {
    through: PerformerClientSeq,
    as: 'NewPerformerdata',
    foreignKey: 'IdPerformer',
    timestamps: false,
  });

  UserClientSeq.belongsToMany(newperformerseq, {
    through: PerformerClientSeq,
    as: 'NewPerformers',
    foreignKey: 'IdPerformerClient',
    timestamps: false,
  });
}, 0);


export default newperformerseq;


