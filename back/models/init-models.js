var DataTypes = require("sequelize").DataTypes;
var _Availability = require("./Availability");
var _Categories = require("./Categories");
var _Evaluation = require("./Evaluation");
var _GM_Skill_Validations = require("./GM_Skill_Validations");
var _GM_Skills = require("./GM_Skills");
var _GameMasters = require("./GameMasters");
var _Games = require("./Games");
var _Mechanics_Type = require("./Mechanics_Type");
var _Message = require("./Message");
var _Publishers = require("./Publishers");
var _Rent_Game_Master = require("./Rent_Game_Master");
var _Renting_Or_Buying_Games = require("./Renting_Or_Buying_Games");
var _Rents = require("./Rents");
var _User_Games = require("./User_Games");
var _Users = require("./Users");

function initModels(sequelize) {
  var Availability = _Availability(sequelize, DataTypes);
  var Categories = _Categories(sequelize, DataTypes);
  var Evaluation = _Evaluation(sequelize, DataTypes);
  var GM_Skill_Validations = _GM_Skill_Validations(sequelize, DataTypes);
  var GM_Skills = _GM_Skills(sequelize, DataTypes);
  var GameMasters = _GameMasters(sequelize, DataTypes);
  var Games = _Games(sequelize, DataTypes);
  var Mechanics_Type = _Mechanics_Type(sequelize, DataTypes);
  var Message = _Message(sequelize, DataTypes);
  var Publishers = _Publishers(sequelize, DataTypes);
  var Rent_Game_Master = _Rent_Game_Master(sequelize, DataTypes);
  var Renting_Or_Buying_Games = _Renting_Or_Buying_Games(sequelize, DataTypes);
  var Rents = _Rents(sequelize, DataTypes);
  var User_Games = _User_Games(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Games.belongsToMany(Users, { as: 'user_id_Users', through: User_Games, foreignKey: "game_id", otherKey: "user_id" });
  Users.belongsToMany(Games, { as: 'game_id_Games', through: User_Games, foreignKey: "user_id", otherKey: "game_id" });
  Games.belongsTo(Categories, { as: "category", foreignKey: "category_id"});
  Categories.hasMany(Games, { as: "Games", foreignKey: "category_id"});
  Evaluation.belongsTo(GameMasters, { as: "game_master", foreignKey: "game_master_id"});
  GameMasters.hasMany(Evaluation, { as: "Evaluations", foreignKey: "game_master_id"});
  GM_Skill_Validations.belongsTo(GameMasters, { as: "gm", foreignKey: "gm_id"});
  GameMasters.hasMany(GM_Skill_Validations, { as: "GM_Skill_Validations", foreignKey: "gm_id"});
  GM_Skills.belongsTo(GameMasters, { as: "gm", foreignKey: "gm_id"});
  GameMasters.hasOne(GM_Skills, { as: "GM_Skill", foreignKey: "gm_id"});
  Rent_Game_Master.belongsTo(GameMasters, { as: "GameMaster_id_renter_GameMaster", foreignKey: "GameMaster_id_renter"});
  GameMasters.hasMany(Rent_Game_Master, { as: "Rent_Game_Masters", foreignKey: "GameMaster_id_renter"});
  Renting_Or_Buying_Games.belongsTo(Games, { as: "game", foreignKey: "game_id"});
  Games.hasMany(Renting_Or_Buying_Games, { as: "Renting_Or_Buying_Games", foreignKey: "game_id"});
  User_Games.belongsTo(Games, { as: "game", foreignKey: "game_id"});
  Games.hasMany(User_Games, { as: "User_Games", foreignKey: "game_id"});
  Games.belongsTo(Mechanics_Type, { as: "mechanics_type", foreignKey: "mechanics_type_id"});
  Mechanics_Type.hasMany(Games, { as: "Games", foreignKey: "mechanics_type_id"});
  Games.belongsTo(Publishers, { as: "publisher", foreignKey: "publisher_id"});
  Publishers.hasMany(Games, { as: "Games", foreignKey: "publisher_id"});
  Availability.belongsTo(Renting_Or_Buying_Games, { as: "renting_or_buying_game", foreignKey: "renting_or_buying_game_id"});
  Renting_Or_Buying_Games.hasMany(Availability, { as: "Availabilities", foreignKey: "renting_or_buying_game_id"});
  Rents.belongsTo(Renting_Or_Buying_Games, { as: "user_game", foreignKey: "user_game_id"});
  Renting_Or_Buying_Games.hasMany(Rents, { as: "Rents", foreignKey: "user_game_id"});
  Evaluation.belongsTo(Rents, { as: "renter", foreignKey: "renter_id"});
  Rents.hasMany(Evaluation, { as: "Evaluations", foreignKey: "renter_id"});
  Evaluation.belongsTo(Users, { as: "user_id_evaluator_User", foreignKey: "user_id_evaluator"});
  Users.hasMany(Evaluation, { as: "Evaluations", foreignKey: "user_id_evaluator"});
  GM_Skill_Validations.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(GM_Skill_Validations, { as: "GM_Skill_Validations", foreignKey: "user_id"});
  GameMasters.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(GameMasters, { as: "GameMasters", foreignKey: "user_id"});
  Message.belongsTo(Users, { as: "sender", foreignKey: "sender_id"});
  Users.hasMany(Message, { as: "Messages", foreignKey: "sender_id"});
  Message.belongsTo(Users, { as: "receiver", foreignKey: "receiver_id"});
  Users.hasMany(Message, { as: "receiver_Messages", foreignKey: "receiver_id"});
  Rent_Game_Master.belongsTo(Users, { as: "user_id_renter_User", foreignKey: "user_id_renter"});
  Users.hasMany(Rent_Game_Master, { as: "Rent_Game_Masters", foreignKey: "user_id_renter"});
  Renting_Or_Buying_Games.belongsTo(Users, { as: "owner", foreignKey: "owner_id"});
  Users.hasMany(Renting_Or_Buying_Games, { as: "Renting_Or_Buying_Games", foreignKey: "owner_id"});
  Rents.belongsTo(Users, { as: "user_id_owner_User", foreignKey: "user_id_owner"});
  Users.hasMany(Rents, { as: "Rents", foreignKey: "user_id_owner"});
  Rents.belongsTo(Users, { as: "user_id_renter_User", foreignKey: "user_id_renter"});
  Users.hasMany(Rents, { as: "user_id_renter_Rents", foreignKey: "user_id_renter"});
  User_Games.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(User_Games, { as: "User_Games", foreignKey: "user_id"});

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
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
