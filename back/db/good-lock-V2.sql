DROP DATABASE IF EXISTS good_lock;
CREATE DATABASE good_lock;
USE good_lock;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  lastname VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  city VARCHAR(255),
  role VARCHAR(255),
  img VARCHAR(255),
  description VARCHAR(255)
);

DROP TABLE IF EXISTS GameMasters;
CREATE TABLE GameMasters (
  INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  imgs_url VARCHAR(255),
  presentation TEXT,
  note DECIMAL(3,2),
  category_game_specialities VARCHAR(255),
  game_propositions VARCHAR(255),
  videos VARCHAR(255),
  prestations VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

DROP TABLE IF EXISTS GM_Skills;
CREATE TABLE GM_Skills (
  gm_INT PRIMARY KEY AUTO_INCREMENT,
  reactivity BOOLEAN,
  communication BOOLEAN,
  creativity BOOLEAN,
  rigor BOOLEAN,
  dynamic BOOLEAN,
  smiling BOOLEAN,
  Rules_Knowledge BOOLEAN,
  Games_knowledge BOOLEAN,
  Player_mediation BOOLEAN,
  Empathy BOOLEAN,
  Respectful BOOLEAN,
  Story_World_Building BOOLEAN,
  Debriefing_Quality BOOLEAN,
  Preparation BOOLEAN,
  Adaptation BOOLEAN,
  LGBTQA_Friendly BOOLEAN,
  FOREIGN KEY (gm_id) REFERENCES GameMasters(id)
);

DROP TABLE IF EXISTS GM_Skill_Validations;
CREATE TABLE GM_Skill_Validations (
  INT PRIMARY KEY AUTO_INCREMENT,
  gm_id INT,
  user_id INT,
  skill_id INT,
  validation_status BOOLEAN,
  timestamp DATETIME,
  FOREIGN KEY (gm_id) REFERENCES GameMasters(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

DROP TABLE IF EXISTS Publishers;
CREATE TABLE Publishers (
  INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

DROP TABLE IF EXISTS Categories;
CREATE TABLE Categories (
  INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

DROP TABLE IF EXISTS Mechanics_Type;
CREATE TABLE Mechanics_Type (
  INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

DROP TABLE IF EXISTS Games;
CREATE TABLE Games (
  INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(255),
  name VARCHAR(255),
  publisher_id INT,
  description TEXT,
  category_id INT,
  mechanics_type_id INT,
  price DECIMAL(8,2),
  year_published INT,
  min_players INT,
  max_players INT,
  playtime INT,
  age_min INT,
  average_learning_complexity DECIMAL(3,2),
  average_strategy_complexity DECIMAL(3,2),
  average_note DECIMAL(3,2),
  average_price_buy DECIMAL(8,2),
  average_price_location DECIMAL(8,2),
  FOREIGN KEY (publisher_id) REFERENCES Publishers(id),
  FOREIGN KEY (category_id) REFERENCES Categories(id),
  FOREIGN KEY (mechanics_type_id) REFERENCES Mechanics_Type(id)
);

DROP TABLE IF EXISTS Renting_Or_Buying_Games;
CREATE TABLE Renting_Or_Buying_Games (
  INT PRIMARY KEY AUTO_INCREMENT,
  game_id INT,
  owner_id INT,
  price_day_renting DECIMAL(8,2),
  discount_moreday_renting DECIMAL(3,2),
  discount_week_renting DECIMAL(3,2),
  price_buying DECIMAL(8,2),
  caution_price DECIMAL(8,2),
  FOREIGN KEY (game_id) REFERENCES Games(id),
  FOREIGN KEY (owner_id) REFERENCES Users(id)
);

DROP TABLE IF EXISTS Rents;
CREATE TABLE Rents (
  INT PRIMARY KEY AUTO_INCREMENT,
  user_id_owner INT,
  user_game_id INT,
  user_id_renter INT,
  beginning_date DATE,
  return_date DATE,
  price DECIMAL(8,2),
  late_penalties DECIMAL(8,2),
  status VARCHAR(255),
  FOREIGN KEY (user_id_owner) REFERENCES Users(id),
  FOREIGN KEY (user_game_id) REFERENCES Renting_Or_Buying_Games(id),
  FOREIGN KEY (user_id_renter) REFERENCES Users(id)
);






DROP TABLE IF EXISTS Availability;
CREATE TABLE Availability (
  INT PRIMARY KEY AUTO_INCREMENT,
  renting_or_buying_game_id INT,
  start_date DATE,
  end_date DATE,
  FOREIGN KEY (renting_or_buying_game_id) REFERENCES Renting_Or_Buying_Games(id)
);

DROP TABLE IF EXISTS Rent_Game_Master;
CREATE TABLE Rent_Game_Master (
  INT PRIMARY KEY AUTO_INCREMENT,
  user_id_renter INT,
  GameMaster_id_renter INT,
  date DATE,
  price DECIMAL(8,2),
  status VARCHAR(255),
  FOREIGN KEY (user_id_renter) REFERENCES Users(id),
  FOREIGN KEY (GameMaster_id_renter) REFERENCES GameMasters(id)
);

DROP TABLE IF EXISTS Evaluation;
CREATE TABLE Evaluation (
  INT PRIMARY KEY AUTO_INCREMENT,
  user_id_evaluator INT,
  game_master_id INT,
  renter_id INT,
  note_gm DECIMAL(3,2),
  note_rent DECIMAL(3,2),
  comments VARCHAR(255),
  FOREIGN KEY (user_id_evaluator) REFERENCES Users(id),
  FOREIGN KEY (game_master_id) REFERENCES GameMasters(id),
  FOREIGN KEY (renter_id) REFERENCES Rents(id)
);

DROP TABLE IF EXISTS Message;
CREATE TABLE Message (
  INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT,
  receiver_id INT,
  message_content TEXT,
  sent_date DATE,
  FOREIGN KEY (sender_id) REFERENCES Users(id),
  FOREIGN KEY (receiver_id) REFERENCES Users(id)
);

DROP TABLE IF EXISTS User_Games;
CREATE TABLE User_Games (
  user_id INT,
  game_id INT,
  PRIMARY KEY (user_id, game_id),
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (game_id) REFERENCES Games(id)
);
