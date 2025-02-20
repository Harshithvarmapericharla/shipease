
import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import Driver from './driver'; // Ensure the path is correct
import RideRequest from './riderequest'; // Ensure the path is correct
import { Op } from 'sequelize';

interface DriverEarningsAttributes {
  id: number;
  driver_id: number;
  request_id: number; // Add this field
  date: Date; // Default to current date
  earnings: number;
  daily_earnings: number;
  monthly_earnings: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DriverEarningsInput extends Optional<DriverEarningsAttributes, 'id' | 'date'> {}
export interface DriverEarningsOutput extends Required<DriverEarningsAttributes> {}

class DriverEarnings extends Model<DriverEarningsAttributes, DriverEarningsInput>
  implements DriverEarningsAttributes {
  public id!: number;
  public driver_id!: number;
  public request_id!: number; // Add this field
  public date!: Date;
  public earnings!: number;
  public daily_earnings!: number;
  public monthly_earnings!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DriverEarnings.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Driver,
      key: 'driver_id',
    },
  },
  request_id: { // Add this field
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RideRequest,
      key: 'request_id',
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    get() {
      const rawValue = this.getDataValue('date');
      return rawValue instanceof Date ? rawValue : new Date(rawValue);
    },
  },
  earnings: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  daily_earnings: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  monthly_earnings: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: sequelizeConnection,
  modelName: 'DriverEarnings',
  tableName: 'driver_earnings',
  timestamps: true,
  indexes: [
    {
        unique: false,
        name: 'earningDriverId_index',
        fields: ['driver_id']
    },
    {
      unique:true,
      name: 'earningDriverId_index',
      fields: ['id']
    }
],
  hooks: {
    beforeSave: async (driverEarnings: DriverEarnings) => {
      // Compute daily earnings
      const year = driverEarnings.date.getFullYear();
      const month = driverEarnings.date.getMonth();
      const day = driverEarnings.date.getDate();

      const startOfDay = new Date(year, month, day, 0, 0, 0);
      const endOfDay = new Date(year, month, day, 23, 59, 59);

      // Get total earnings for the driver on the same day
      const dailyEarnings = await DriverEarnings.sum('earnings', {
        where: {
          driver_id: driverEarnings.driver_id,
          date: {
            [Op.between]: [startOfDay, endOfDay],
          },
        },
      });

      driverEarnings.daily_earnings = (dailyEarnings || 0) + driverEarnings.earnings;

      // Compute monthly earnings
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

      const monthlyEarnings = await DriverEarnings.sum('earnings', {
        where: {
          driver_id: driverEarnings.driver_id,
          date: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      });

      driverEarnings.monthly_earnings = (monthlyEarnings || 0) + driverEarnings.earnings;
    },
  },
});

export default DriverEarnings;
