CREATE SCHEMA IF NOT EXISTS `nft_data`;
USE `nft_data`;

DROP TABLE IF EXISTS `assetlistings`;
DROP TABLE IF EXISTS `AssetCategories`;
DROP TABLE IF EXISTS `AssetCategoryDescriptions`;
DROP TABLE IF EXISTS `SmartContractAddresses`;
DROP TABLE IF EXISTS `Assets`;
DROP TABLE IF EXISTS `LicenseTypes`;
DROP TABLE IF EXISTS `FileTypes`;
DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR (50),
  `last_name` VARCHAR (50),
  `email` VARCHAR(50) UNIQUE,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE `FileTypes` (
  `filetype_id` INT NOT NULL AUTO_INCREMENT,
  `filetype_name` VARCHAR (50) NOT NULL,
  PRIMARY KEY (`filetype_id`)
);

CREATE TABLE `LicenseTypes` (
  `license_type_id` INT NOT NULL AUTO_INCREMENT,
  `license_name` VARCHAR (50) NOT NULL,
  PRIMARY KEY (`license_type_id`)
);

CREATE TABLE `Assets` (
  `token_id` INT NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR (50) NOT NULL,
  `item_description` VARCHAR(255),
  `image_url` VARCHAR(255) NOT NULL,
  `image_thumbnail_url` VARCHAR(255) NOT NULL,
  `image_resolution` VARCHAR (50) NOT NULL,
  `image_filetype_id` INT NOT NULL,
  `license_type_id` INT NOT NULL,
  `original_owner` INT NOT NULL,
  PRIMARY KEY (`token_id`)
);

CREATE TABLE `AssetCategoryDescriptions` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR (50) NOT NULL,
  PRIMARY KEY (`category_id`)
);

CREATE TABLE `AssetCategories` (
  `category_id` INT NOT NULL,
  `token_id` INT NOT NULL,
  KEY `PK+` (`category_id`, `token_id`),
  FOREIGN KEY (`category_id`) REFERENCES `AssetCategoryDescriptions` (`category_id`),
  FOREIGN KEY (`token_id`) REFERENCES `Assets` (`token_id`)
);

CREATE TABLE `assetlistings` (
  `token_id` INT NOT NULL,
  `seller_id` INT NOT NULL,
  `selling_price` DOUBLE NOT NULL,
  `time_listed` DATETIME NOT NULL,
  PRIMARY KEY (`token_id`),
  FOREIGN KEY (`token_id`) REFERENCES `Assets` (`token_id`),
  FOREIGN KEY (`seller_id`) REFERENCES `Users` (`user_id`)
);

CREATE TABLE `SmartContractAddresses`(
  `contract_name` VARCHAR(50) NOT NULL,
  `contract_address` VARCHAR(42) NOT NULL,
  PRIMARY KEY (`contract_name`)
);

INSERT INTO Users (user_id, password, first_name, last_name, email) VALUES ('1', 'password', 'John', 'Smith', 'john.smith@example.com');
INSERT INTO Users (user_id, password, first_name, last_name, email) VALUES ('2', 'password', 'Jane', 'Smith', 'jane.smith@example.com');
INSERT INTO Users (user_id, password, first_name, last_name, email) VALUES ('3', 'password', 'Maria', 'Eduarda Loura Magalhães', 'maria.magalhaes@example.com');
INSERT INTO Users (user_id, password, first_name, email) VALUES ('4', 'password', 'ThisIsEngineering', 'thisisengineering@example.com');
INSERT INTO Users (user_id, password, first_name, last_name, email) VALUES ('5', 'password', 'Ryutaro', 'Tsukata', 'Ryutaro.Tsukata@example.com');
INSERT INTO Users (user_id, password, first_name, last_name, email) VALUES ('6', 'password', 'Twiggy', 'Jia', 'Twiggy.Jia@example.com');
INSERT INTO Users (user_id, password, first_name, last_name, email) VALUES ('7', 'password', 'Alexander', 'Ant', 'Alexander.Ant@example.com');
INSERT INTO Users (user_id, password, first_name, last_name, email) VALUES ('8', 'password', 'Anni', 'Roenkae', 'AnniRoenkae@example.com');
INSERT INTO Users (user_id, password, first_name, email) VALUES ('9', 'password', 'Dids',  'Dids@example.com');
INSERT INTO Users (user_id, password, first_name, last_name, email) VALUES ('10', 'password', 'Damir', 'Mijailovic', 'Damir.Mijailovic@example.com');
INSERT INTO Users (user_id, password, first_name, last_name, email) VALUES ('11', 'password', 'Marlene', 'Leppänen', 'Marlene.Leppänen@example.com');
INSERT INTO Users (user_id, password, first_name, last_name, email) VALUES ('12', 'password', 'Ishara', 'Kasthuriarachchi', 'Ishara.Kasthuriarachchi@example.com');
INSERT INTO Users (user_id, password, first_name, email) VALUES ('13', 'password', 'Anthony',  'Anthony@example.com');
INSERT INTO Users (user_id, password, first_name, last_name, email) VALUES ('14', 'password', 'Julia', 'Sakelli', 'Julia.Sakelli@example.com');
INSERT INTO Users (user_id, password, first_name, email) VALUES ('15', 'password', 'Pixabay', 'Pixabay@example.com');
INSERT INTO Users (user_id, password, first_name, email) VALUES ('16', 'password', 'Ken', 'RealRoyalKen@example.com');
INSERT INTO Users (user_id, password, first_name, email) VALUES ('17', 'password', 'Cash', 'Ca$hMoney@example.com');
INSERT INTO Users (user_id, password, first_name, email) VALUES ('18', 'password', 'Hannah', 'HanHanBay@example.com');
INSERT INTO Users (user_id, password, first_name, email) VALUES ('19', 'password', 'Jody', 'JJJ@example.com');
INSERT INTO Users (user_id, password, first_name, email) VALUES ('20', 'password', 'Henri', 'HienzRi@example.com');


INSERT INTO FileTypes ( filetype_id, filetype_name) VALUES ('1', 'JPEG');
INSERT INTO FileTypes ( filetype_id, filetype_name) VALUES ('2', 'PNG');


INSERT INTO LicenseTypes ( license_type_id, license_name) VALUES ('1', 'Standard');
INSERT INTO LicenseTypes ( license_type_id, license_name) VALUES ('2', 'Non-Commercial');




INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('123129', 'Moon Jellyfish', 'Moon Jellyfish Floating In Water',
      'https://images.pexels.com/photos/5472598/pexels-photo-5472598.jpeg',
      'https://images.pexels.com/photos/5472598/pexels-photo-5472598.jpeg?cs=srgb&dl=pexels-ryutaro-tsukata-5472598.jpg&fm=jpg&w=640&h=960',
      '3407 x 5111','1','1', '5');
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('123130', 'Neon Woman', 'Artistic woman with painted face in UV light',
      'https://images.pexels.com/photos/4856662/pexels-photo-4856662.jpeg',
      'https://images.pexels.com/photos/4856662/pexels-photo-4856662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      '2304 x 3456', '1', '1', '3');
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('123131', 'Purple Jellyfish', 'A Pair of Purple Jellyfishes Floating Underwater',
      'https://images.pexels.com/photos/8601366/pexels-photo-8601366.jpeg',
      'https://images.pexels.com/photos/8601366/pexels-photo-8601366.jpeg?cs=srgb&dl=pexels-twiggy-jia-8601366.jpg&fm=jpg&w=640&h=960',
      '3840 x 5760', '1', '1', '6');
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('123132', 'Paint Swirl', 'Colorful mix of neon paints swirling on black surface',
      'https://images.pexels.com/photos/4585185/pexels-photo-4585185.jpeg',
      'https://images.pexels.com/photos/4585185/pexels-photo-4585185.jpeg?cs=srgb&dl=pexels-alexander-ant-4585185.jpg&fm=jpg&w=640&h=960',
      '4480 x 6720', '1', '1', '7');
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('123133', 'Pink & Black', 'Pink and Black Illustration',
      'https://images.pexels.com/photos/3109816/pexels-photo-3109816.png',
      'https://images.pexels.com/photos/3109816/pexels-photo-3109816.png?cs=srgb&dl=pexels-anni-roenkae-3109816.jpg&fm=jpg&w=640&h=480',
      '4000 x 3000', '1', '1', '8');
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('123134', 'Abstract Pink', 'Pink and Multicolored Abstract Painting',
      'https://images.pexels.com/photos/2911544/pexels-photo-2911544.jpeg',
      'https://images.pexels.com/photos/2911544/pexels-photo-2911544.jpeg?cs=srgb&dl=pexels-dids-2911544.jpg&fm=jpg&w=640&h=853',
      '3456 x 4608','1', '1', '9');
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('123135', 'Bright Abstract', 'Bright painted abstract background with flow effect and spots',
      'https://images.pexels.com/photos/3651579/pexels-photo-3651579.jpeg',
      'https://images.pexels.com/photos/3651579/pexels-photo-3651579.jpeg?cs=srgb&dl=pexels-damir-mijailovic-3651579.jpg&fm=jpg&w=640&h=960',
      '2848 x 4272','1', '1', '10');
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('123136', 'Faceless', 'Faceless person standing with glowing neon threads on shoulders',
      'https://images.pexels.com/photos/5621016/pexels-photo-5621016.jpeg',
      'https://images.pexels.com/photos/5621016/pexels-photo-5621016.jpeg?cs=srgb&dl=pexels-marlene-lepp%C3%A4nen-5621016.jpg&fm=jpg&w=640&h=853',
      '3024 x 4032','1', '1', '11');
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('124343', 'Cyber Girl', 'Code Projected Over Woman',
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?cs=srgb&dl=pexels-thisisengineering-3861969.jpg&fm=jpg&w=640&h=427',
      '7330 x 4889','1', '1', '4');

INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('2373453', 'Random Ape', 'Monochrome Photography of a Chimpanzee',
      'https://images.pexels.com/photos/605223/pexels-photo-605223.jpeg',
      'https://images.pexels.com/photos/605223/pexels-photo-605223.jpeg?cs=srgb&dl=pexels-ishara-kasthuriarachchi-605223.jpg&fm=jpg&w=640&h=852',
      '2000 x 2664','1', '1', '12');
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('2623426', 'Yellow Rose', 'Yellow Rose',
      'https://images.pexels.com/photos/133472/pexels-photo-133472.jpeg',
      'https://images.pexels.com/photos/133472/pexels-photo-133472.jpeg?cs=srgb&dl=pexels-anthony-%F0%9F%93%B7%F0%9F%93%B9%F0%9F%99%82-133472.jpg&fm=jpg&w=640&h=960',
      '3456 x 5184','1', '1', '13');
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('3032346', 'Succulent', 'Green Orchid Plant',
      'https://images.pexels.com/photos/1011302/pexels-photo-1011302.jpeg',
      'https://images.pexels.com/photos/1011302/pexels-photo-1011302.jpeg?cs=srgb&dl=pexels-julia-sakelli-1011302.jpg&fm=jpg&w=640&h=966',
      '2448 x 3696','1', '1', '14');
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) 
VALUES ('23734536', 'White Rose', 'White Rose',
      'https://images.pexels.com/photos/160916/flower-rose-colorful-petals-160916.jpeg',
      'https://images.pexels.com/photos/160916/flower-rose-colorful-petals-160916.jpeg?cs=srgb&dl=pexels-pixabay-160916.jpg&fm=jpg&w=640&h=432',
      '8704 x 5872','1', '1', '15');

INSERT INTO AssetCategoryDescriptions ( category_id, category_name) VALUES ('1', 'Photo');
INSERT INTO AssetCategoryDescriptions ( category_id, category_name) VALUES ('2', 'Art');
INSERT INTO AssetCategoryDescriptions ( category_id, category_name) VALUES ('3', 'Featured');

INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123129', '1');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123130', '1');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123131', '1');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123134', '1');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123135', '1');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123136', '1');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('124343', '1');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('2373453', '1');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('2623426', '1');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('3032346', '1');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('23734536', '1');

INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123132', '2');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123133', '2');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123134', '2');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123135', '2');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123136', '2');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('124343', '2');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('2373453', '2');

INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123132', '3');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123133', '3');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123134', '3');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123135', '3');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('123136', '3');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('124343', '3');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('2373453', '3');
INSERT INTO AssetCategories ( token_id, category_id) VALUES ('3032346', '3');



INSERT INTO assetlistings ( token_id, seller_id, selling_price, time_listed) VALUES ('123129', '2', '0.3', '2023-08-23 17:36:27.39');
INSERT INTO assetlistings ( token_id, seller_id, selling_price, time_listed) VALUES ('123130', '1', '0.55', '2023-08-25 04:22:34.60');
INSERT INTO assetlistings ( token_id, seller_id, selling_price, time_listed) VALUES ('123131', '2', '0.2', '2023-08-12 17:36:27.39');
INSERT INTO assetlistings ( token_id, seller_id, selling_price, time_listed) VALUES ('123132', '2', '0.7', '2023-08-17 04:22:34.60');
INSERT INTO assetlistings ( token_id, seller_id, selling_price, time_listed) VALUES ('123133', '2', '0.6', '2023-06-20 17:36:27.39');
INSERT INTO assetlistings ( token_id, seller_id, selling_price, time_listed) VALUES ('123134', '2', '0.3', '2023-08-10 04:22:34.60');
INSERT INTO assetlistings ( token_id, seller_id, selling_price, time_listed) VALUES ('123135', '2', '0.9', '2023-08-06 17:36:27.39');
INSERT INTO assetlistings ( token_id, seller_id, selling_price, time_listed) VALUES ('123136', '2', '0.5', '2023-08-28 04:22:34.60');
INSERT INTO assetlistings ( token_id, seller_id, selling_price, time_listed) VALUES ('124343', '4', '0.6', '2023-08-29 08:22:34.60');
INSERT INTO assetlistings ( token_id, seller_id, selling_price, time_listed) VALUES ('3032346', '1', '0.5', '2023-08-28 04:22:34.60');


