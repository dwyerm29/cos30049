USE `s100595852_db`;

DROP TABLE IF EXISTS `AssetsListedForSale`;
DROP TABLE IF EXISTS `AssetCategories`;
DROP TABLE IF EXISTS `AssetCategoryDescriptions`;
DROP TABLE IF EXISTS `Transactions`;
DROP TABLE IF EXISTS `Assets`;
DROP TABLE IF EXISTS `LicenseTypes`;
DROP TABLE IF EXISTS `FileTypes`;
DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR (50),
  `last_name` VARCHAR (50),
  `email` VARCHAR(50),
  `wallet_id` INT,
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
  `current_owner` INT NOT NULL,
  `sale_price` DOUBLE,
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

CREATE TABLE `Transactions` (
  `transaction_id` INT NOT NULL AUTO_INCREMENT,
  `token_id` INT NOT NULL,
  `seller_id` INT NOT NULL,
  `buyer_id` INT NOT NULL,
  `sale_price` DOUBLE,
  `sale_time` DATETIME,
  PRIMARY KEY (`transaction_id`),
  FOREIGN KEY (`seller_id`) REFERENCES `Users` (`user_id`),
  FOREIGN KEY (`buyer_id`) REFERENCES `Users` (`user_id`),
  FOREIGN KEY (`token_id`) REFERENCES `Assets` (`token_id`),
  FOREIGN KEY (`buyer_id`) REFERENCES `Users` (`user_id`)
);



CREATE TABLE `AssetsListedForSale` (
  `token_id` INT NOT NULL,
  `selling_price` DOUBLE NOT NULL,
  `time_listed` DATETIME NOT NULL,
  PRIMARY KEY (`token_id`),
  FOREIGN KEY (`token_id`) REFERENCES `Assets` (`token_id`)
);

INSERT INTO Users (user_id, password, first_name, last_name, email, wallet_id) VALUES ('1', 'password', 'John', 'Smith', 'john.smith@example.com', '13425123');
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

INSERT INTO FileTypes ( filetype_id, filetype_name) VALUES ('1', 'JPEG');
INSERT INTO FileTypes ( filetype_id, filetype_name) VALUES ('2', 'PNG');


INSERT INTO LicenseTypes ( license_type_id, license_name) VALUES ('1', 'Standard');
INSERT INTO LicenseTypes ( license_type_id, license_name) VALUES ('2', 'Standard');






INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('123129', 'Moon Jellyfish', 'Moon Jellyfish Floating In Water',
      'https://images.pexels.com/photos/5472598/pexels-photo-5472598.jpeg',
      'https://images.pexels.com/photos/5472598/pexels-photo-5472598.jpeg?cs=srgb&dl=pexels-ryutaro-tsukata-5472598.jpg&fm=jpg&w=640&h=960',
      '3407 x 5111','1','1', '5', '2', '0.31'
     );
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('123130', 'Neon Woman', 'Artistic woman with painted face in UV light',
      'https://images.pexels.com/photos/4856662/pexels-photo-4856662.jpeg',
      'https://images.pexels.com/photos/4856662/pexels-photo-4856662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      '2304 x 3456', '1', '1', '3', '1', '0.4'
     );
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('123131', 'Purple Jellyfish', 'A Pair of Purple Jellyfishes Floating Underwater',
      'https://images.pexels.com/photos/8601366/pexels-photo-8601366.jpeg',
      'https://images.pexels.com/photos/8601366/pexels-photo-8601366.jpeg?cs=srgb&dl=pexels-twiggy-jia-8601366.jpg&fm=jpg&w=640&h=960',
      '3840 x 5760', '1', '1', '6', '2', '0.64'
     );
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('123132', 'Paint Swirl', 'Colorful mix of neon paints swirling on black surface',
      'https://images.pexels.com/photos/4585185/pexels-photo-4585185.jpeg',
      'https://images.pexels.com/photos/4585185/pexels-photo-4585185.jpeg?cs=srgb&dl=pexels-alexander-ant-4585185.jpg&fm=jpg&w=640&h=960',
      '4480 x 6720', '1', '1', '7', '2', '0.22'
     );
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('123133', 'Pink & Black', 'Pink and Black Illustration',
      'https://images.pexels.com/photos/3109816/pexels-photo-3109816.png',
      'https://images.pexels.com/photos/3109816/pexels-photo-3109816.png?cs=srgb&dl=pexels-anni-roenkae-3109816.jpg&fm=jpg&w=640&h=480',
      '4000 x 3000', '1', '1', '8', '2', '0.67'
     );
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('123134', 'Abstract Pink', 'Pink and Multicolored Abstract Painting',
      'https://images.pexels.com/photos/2911544/pexels-photo-2911544.jpeg',
      'https://images.pexels.com/photos/2911544/pexels-photo-2911544.jpeg?cs=srgb&dl=pexels-dids-2911544.jpg&fm=jpg&w=640&h=853',
      '3456 x 4608','1', '1', '9', '2', '0.94'
     );
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('123135', 'Bright Abstract', 'Bright painted abstract background with flow effect and spots',
      'https://images.pexels.com/photos/3651579/pexels-photo-3651579.jpeg',
      'https://images.pexels.com/photos/3651579/pexels-photo-3651579.jpeg?cs=srgb&dl=pexels-damir-mijailovic-3651579.jpg&fm=jpg&w=640&h=960',
      '2848 x 4272','1', '1', '10', '2', '0.15'
     );
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('123136', 'Faceless', 'Faceless person standing with glowing neon threads on shoulders',
      'https://images.pexels.com/photos/5621016/pexels-photo-5621016.jpeg',
      'https://images.pexels.com/photos/5621016/pexels-photo-5621016.jpeg?cs=srgb&dl=pexels-marlene-lepp%C3%A4nen-5621016.jpg&fm=jpg&w=640&h=853',
      '3024 x 4032','1', '1', '11', '2', '0.55'
     );
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner) 
VALUES ('124343', 'Cyber Girl', 'Code Projected Over Woman',
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?cs=srgb&dl=pexels-thisisengineering-3861969.jpg&fm=jpg&w=640&h=427',
      '7330 x 4889','1', '1', '4', '4'
     );

INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('2373453', 'Random Ape', 'Monochrome Photography of a Chimpanzee',
      'https://images.pexels.com/photos/605223/pexels-photo-605223.jpeg',
      'https://images.pexels.com/photos/605223/pexels-photo-605223.jpeg?cs=srgb&dl=pexels-ishara-kasthuriarachchi-605223.jpg&fm=jpg&w=640&h=852',
      '2000 x 2664','1', '1', '12', '4', '0.43'
     );
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('2623426', 'Yellow Rose', 'Yellow Rose',
      'https://images.pexels.com/photos/133472/pexels-photo-133472.jpeg',
      'https://images.pexels.com/photos/133472/pexels-photo-133472.jpeg?cs=srgb&dl=pexels-anthony-%F0%9F%93%B7%F0%9F%93%B9%F0%9F%99%82-133472.jpg&fm=jpg&w=640&h=960',
      '3456 x 5184','1', '1', '13', '1', '0.34'
     );
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('3032346', 'Succulent', 'Green Orchid Plant',
      'https://images.pexels.com/photos/1011302/pexels-photo-1011302.jpeg',
      'https://images.pexels.com/photos/1011302/pexels-photo-1011302.jpeg?cs=srgb&dl=pexels-julia-sakelli-1011302.jpg&fm=jpg&w=640&h=966',
      '2448 x 3696','1', '1', '14', '1', '0.25'
     );
INSERT INTO Assets ( token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price) 
VALUES ('23734536', 'White Rose', 'White Rose',
      'https://images.pexels.com/photos/160916/flower-rose-colorful-petals-160916.jpeg',
      'https://images.pexels.com/photos/160916/flower-rose-colorful-petals-160916.jpeg?cs=srgb&dl=pexels-pixabay-160916.jpg&fm=jpg&w=640&h=432',
      '8704 x 5872','1', '1', '15', '4', '0.64'
     );


INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('1', '123129', '5', '5', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('2', '123130', '3', '3', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('3', '123131', '6', '6', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('4', '123132', '7', '7', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('5', '123133', '8', '8', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('6', '123134', '9', '9', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('7', '123135', '10', '10', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('8', '123136', '11', '11', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('9', '124343', '4', '4', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('10', '2373453', '12', '12', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('11', '2623426', '13', '13', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('12', '3032346', '14', '14', '0', '2023-08-01 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('13', '23734536', '15', '15', '0', '2023-08-01 00:00:00.00');

INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('14', '123129', '5', '2', '0.31', '2023-08-21 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('15', '123130', '3', '1', '0.4', '2023-08-21 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('16', '123131', '6', '2', '0.64', '2023-08-21 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('17', '123132', '7', '2', '0.22', '2023-08-21 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('18', '123133', '8', '2', '0.67', '2023-08-21 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('19', '123134', '9', '2', '0.94', '2023-08-21 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('20', '123135', '10', '2', '0.15', '2023-08-21 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('21', '123136', '11', '2', '0.55', '2023-08-21 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('23', '2373453', '12', '1', '0.5', '2023-08-21 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('24', '2623426', '13', '1', '0.34', '2023-08-21 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('25', '3032346', '14', '1', '0.25', '2023-08-21 00:00:00.00');
INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('26', '23734536', '15', '4', '0.64', '2023-08-21 00:00:00.00');

INSERT INTO `Transactions` (`transaction_id`, `token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('27', '2373453', '1', '4', '0.43',  '2023-08-23 09:43:20.00');


INSERT INTO AssetCategoryDescriptions ( category_id, category_name) VALUES ('1', 'photo');
INSERT INTO AssetCategoryDescriptions ( category_id, category_name) VALUES ('2', 'art');

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

INSERT INTO AssetsListedForSale ( token_id, selling_price, time_listed) VALUES ('123129', '0.3', '2023-08-23 17:36:27.39');
INSERT INTO AssetsListedForSale ( token_id, selling_price, time_listed) VALUES ('123130', '0.55', '2023-08-25 04:22:34.60');
INSERT INTO AssetsListedForSale ( token_id, selling_price, time_listed) VALUES ('123131', '0.2', '2023-08-12 17:36:27.39');
INSERT INTO AssetsListedForSale ( token_id, selling_price, time_listed) VALUES ('123132', '0.7', '2023-08-17 04:22:34.60');
INSERT INTO AssetsListedForSale ( token_id, selling_price, time_listed) VALUES ('123133', '0.6', '2023-06-20 17:36:27.39');
INSERT INTO AssetsListedForSale ( token_id, selling_price, time_listed) VALUES ('123134', '0.3', '2023-08-10 04:22:34.60');
INSERT INTO AssetsListedForSale ( token_id, selling_price, time_listed) VALUES ('123135', '0.9', '2023-08-06 17:36:27.39');
INSERT INTO AssetsListedForSale ( token_id, selling_price, time_listed) VALUES ('123136', '0.5', '2023-08-28 04:22:34.60');
INSERT INTO AssetsListedForSale ( token_id, selling_price, time_listed) VALUES ('124343', '0.6', '2023-08-29 08:22:34.60');
INSERT INTO AssetsListedForSale ( token_id, selling_price, time_listed) VALUES ('3032346', '0.5', '2023-08-28 04:22:34.60');
INSERT INTO AssetsListedForSale ( token_id, selling_price, time_listed) VALUES ('2373453', '0.6', '2023-08-29 08:22:34.60');


