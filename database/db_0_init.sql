USE `s100595852_db`;

DROP TABLE IF EXISTS `AssetsListedForSale`;
DROP TABLE IF EXISTS `AssetCategories`;
DROP TABLE IF EXISTS `AssetCategoryDescriptions`;
DROP TABLE IF EXISTS `Assets`;
DROP TABLE IF EXISTS `LicenseTypes`;
DROP TABLE IF EXISTS `FileTypes`;
DROP TABLE IF EXISTS `UserAccounts`;

CREATE TABLE `UserAccounts` (
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
  `current_owner_id` INT NOT NULL,
  `item_name` VARCHAR (50) NOT NULL,
  `item_description` VARCHAR(255),
  `image_url` VARCHAR(100) NOT NULL,
  `image_resolution` VARCHAR (50) NOT NULL,
  `image_filetype_id` INT,
  `original_publisher_id` INT NOT NULL,
  `license_type_id` INT,
  `sale_time` DATETIME,
  `sale_price` INT,
  PRIMARY KEY (`token_id`),
  FOREIGN KEY (`current_owner_id`) REFERENCES `UserAccounts` (`user_id`),
  FOREIGN KEY (`original_publisher_id`) REFERENCES `UserAccounts` (`user_id`),
  FOREIGN KEY (`license_type_id`) REFERENCES `LicenseTypes` (`license_type_id`)
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

CREATE TABLE `AssetsListedForSale` (
  `token_id` INT NOT NULL,
  `selling_price` INT NOT NULL,
  `time_listed` DATETIME NOT NULL,
  PRIMARY KEY (`token_id`),
  FOREIGN KEY (`token_id`) REFERENCES `Assets` (`token_id`)
);



