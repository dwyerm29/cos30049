-- get a list of all assets for sale along with their current owner (DOES NOT WORK)
SELECT * FROM assets 
    JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id 
    JOIN transactions ON assets.token_id=(SELECT transactions.token_id FROM transactions WHERE transactions.token_id=assets.token_id ORDER BY transaction_id DESC LIMIT 1)
    AND assets.token_id=transactions.token_id

-- return a list of all assets along with information like selling price, file type and license type
SELECT assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name 
FROM assets LEFT JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id 
JOIN filetypes ON assets.image_filetype_id=filetypes.filetype_id 
JOIN licensetypes ON assets.license_type_id=licensetypes.license_type_id

-- get a list of all assets listed for sale along with other info
SELECT assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name 
    FROM assets 
    JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id 
    JOIN filetypes ON assets.image_filetype_id=filetypes.filetype_id
    JOIN licensetypes ON assets.license_type_id=licensetypes.license_type_id


-- get information for a single asset, along with details like selling price if it exists
SELECT assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name 
    FROM assets 
    LEFT JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id 
    JOIN filetypes ON assets.image_filetype_id=filetypes.filetype_id
    JOIN licensetypes ON assets.license_type_id=licensetypes.license_type_id
    WHERE assets.token_id='2623426'

-- return a list of users without their passwords
SELECT user_id, first_name, last_name, email, wallet_id FROM users;

-- return a list of transactions that a particular user has been involved in
SELECT * FROM transactions WHERE seller_id = '1' OR buyer_id = '1'

-- get a list of all asset categories along with their descriptions
SELECT * FROM AssetCategoryDescriptions

--get a list of assets that match one of any category IDs
SELECT DISTINCT assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name 
    FROM assets 
    LEFT JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id 
    JOIN filetypes ON assets.image_filetype_id=filetypes.filetype_id
    JOIN licensetypes ON assets.license_type_id=licensetypes.license_type_id
    JOIN assetcategories ON assets.token_id=assetcategories.token_id
    WHERE assetcategories.category_id='1' OR assetcategories.category_id='2'


--check whether a user's login is correct. Returns a user if correct, or nothing if not correct
SELECT user_id, first_name, last_name, email, wallet_id FROM users WHERE email='john.smith@example.com' AND password='password'