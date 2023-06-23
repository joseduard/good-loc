import { DataTypes as dt } from "sequelize";
import _Availability from "./Availability.js";
import _Categories from "./Categories.js";
import _Evaluation from "./Evaluation.js";
import _GM_Skill_Validations from "./GM_Skill_Validations.js";
import _GM_Skills from "./GM_Skills.js";
import _GameMasters from "./GameMasters.js";
import _Games from "./Games.js";
import _Mechanics_Type from "./Mechanics_Type.js";
import _Message from "./Message.js";
import _Publishers from "./Publishers.js";
import _Rent_Game_Master from "./Rent_Game_Master.js";
import _Renting_Or_Buying_Games from "./Renting_Or_Buying_Games.js";
import _Rents from "./Rents.js";
import _User_Games from "./User_Games.js";
import _Users from "./Users.js";

function initModels(sequelize) {
  var Availability = _Availability(sequelize, dt);
  var Categories = _Categories(sequelize, dt);
  var Evaluation = _Evaluation(sequelize, dt);
  var GM_Skill_Validations = _GM_Skill_Validations(sequelize, dt);
  var GM_Skills = _GM_Skills(sequelize, dt);
  var GameMasters = _GameMasters(sequelize, dt);
  var Games = _Games(sequelize, dt);
  var Mechanics_Type = _Mechanics_Type(sequelize, dt);
  var Message = _Message(sequelize, dt);
  var Publishers = _Publishers(sequelize, dt);
  var Rent_Game_Master = _Rent_Game_Master(sequelize, dt);
  var Renting_Or_Buying_Games = _Renting_Or_Buying_Games(sequelize, dt);
  var Rents = _Rents(sequelize, dt);
  var User_Games = _User_Games(sequelize, dt);
  var Users = _Users(sequelize, dt);

  Games.belongsToMany(Users, {
    as: "user_id_Users",
    through: User_Games,
    foreignKey: "game_id",
    otherKey: "user_id",
  });
  Users.belongsToMany(Games, {
    as: "game_id_Games",
    through: User_Games,
    foreignKey: "user_id",
    otherKey: "game_id",
  });
  Categories.hasMany(Games, { as: "Games", foreignKey: "category_id" });
  Games.belongsTo(Categories, { as: "category", foreignKey: "category_id" });
  Evaluation.belongsTo(GameMasters, {
    as: "game_master",
    foreignKey: "game_master_id",
  });
  GameMasters.hasMany(Evaluation, {
    as: "Evaluations",
    foreignKey: "game_master_id",
  });
  GM_Skill_Validations.belongsTo(GameMasters, {
    as: "gm",
    foreignKey: "gm_id",
  });
  GameMasters.hasMany(GM_Skill_Validations, {
    as: "GM_Skill_Validations",
    foreignKey: "gm_id",
  });
  GM_Skills.belongsTo(GameMasters, { as: "gm", foreignKey: "gm_id" });
  GameMasters.hasOne(GM_Skills, { as: "GM_Skill", foreignKey: "gm_id" });
  Rent_Game_Master.belongsTo(GameMasters, {
    as: "GameMaster_id_renter_GameMaster",
    foreignKey: "GameMaster_id_renter",
  });
  GameMasters.hasMany(Rent_Game_Master, {
    as: "Rent_Game_Masters",
    foreignKey: "GameMaster_id_renter",
  });
  Renting_Or_Buying_Games.belongsTo(Games, {
    as: "game",
    foreignKey: "game_id",
  });
  Games.hasMany(Renting_Or_Buying_Games, {
    as: "Renting_Or_Buying_Games",
    foreignKey: "game_id",
  });
  User_Games.belongsTo(Games, { as: "game", foreignKey: "game_id" });
  Games.hasMany(User_Games, { as: "User_Games", foreignKey: "game_id" });
  Games.belongsTo(Mechanics_Type, {
    as: "mechanics_type",
    foreignKey: "mechanics_type_id",
  });
  Mechanics_Type.hasMany(Games, {
    as: "Games",
    foreignKey: "mechanics_type_id",
  });
  Games.belongsTo(Publishers, { as: "publisher", foreignKey: "publisher_id" });
  Publishers.hasMany(Games, { as: "Games", foreignKey: "publisher_id" });
  Availability.belongsTo(Renting_Or_Buying_Games, {
    as: "renting_or_buying_game",
    foreignKey: "renting_or_buying_game_id",
  });
  Renting_Or_Buying_Games.hasMany(Availability, {
    as: "Availabilities",
    foreignKey: "renting_or_buying_game_id",
  });
  Rents.belongsTo(Renting_Or_Buying_Games, {
    as: "user_game",
    foreignKey: "user_game_id",
  });
  Renting_Or_Buying_Games.hasMany(Rents, {
    as: "Rents",
    foreignKey: "user_game_id",
  });
  Evaluation.belongsTo(Rents, { as: "renter", foreignKey: "renter_id" });
  Rents.hasMany(Evaluation, { as: "Evaluations", foreignKey: "renter_id" });
  Evaluation.belongsTo(Users, {
    as: "user_id_evaluator_User",
    foreignKey: "user_id_evaluator",
  });
  Users.hasMany(Evaluation, {
    as: "Evaluations",
    foreignKey: "user_id_evaluator",
  });
  GM_Skill_Validations.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(GM_Skill_Validations, {
    as: "GM_Skill_Validations",
    foreignKey: "user_id",
  });
  GameMasters.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(GameMasters, { as: "GameMasters", foreignKey: "user_id" });

  Users.hasMany(Message, { as: "Messages", foreignKey: "sender_id" });

  Users.hasMany(Message, {
    as: "receiver_Messages",
    foreignKey: "receiver_id",
  });
  Rent_Game_Master.belongsTo(Users, {
    as: "user_id_renter_User",
    foreignKey: "user_id_renter",
  });
  Users.hasMany(Rent_Game_Master, {
    as: "Rent_Game_Masters",
    foreignKey: "user_id_renter",
  });
  Renting_Or_Buying_Games.belongsTo(Users, {
    as: "owner",
    foreignKey: "owner_id",
  });
  Users.hasMany(Renting_Or_Buying_Games, {
    as: "Renting_Or_Buying_Games",
    foreignKey: "owner_id",
  });
  Rents.belongsTo(Users, {
    as: "user_id_owner_User",
    foreignKey: "user_id_owner",
  });
  Users.hasMany(Rents, { as: "Rents", foreignKey: "user_id_owner" });
  Rents.belongsTo(Users, {
    as: "user_id_renter_User",
    foreignKey: "user_id_renter",
  });
  Users.hasMany(Rents, {
    as: "user_id_renter_Rents",
    foreignKey: "user_id_renter",
  });
  User_Games.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(User_Games, { as: "User_Games", foreignKey: "user_id" });

  return {
    Availability,
    Categories,
    Evaluation,
    GM_Skill_Validations,
    GM_Skills,
    GameMasters,
    Games,
    Mechanics_Type,
    Message,
    Publishers,
    Rent_Game_Master,
    Renting_Or_Buying_Games,
    Rents,
    User_Games,
    Users,
  };
}
export default initModels;
const _initModels = initModels;
export { _initModels as initModels };
const _default = initModels;
