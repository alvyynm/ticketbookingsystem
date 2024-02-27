// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class EventAttendees extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   EventAttendees.init(
//     {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.INTEGER,
//       },
//       event_id: DataTypes.INTEGER,
//       user_id: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "EventAttendees",
//       underscored: true,
//     }
//   );
//   return EventAttendees;
// };
