-- ! DOES NOT WORK
-- get a list of all assets for sale along with their current owner
SELECT
    *
FROM
    assets
    JOIN assetslistedforsale ON assets.token_id = assetslistedforsale.token_id
    JOIN transactions ON assets.token_id = (
        SELECT
            transactions.token_id
        FROM
            transactions
        WHERE
            transactions.token_id = assets.token_id
        ORDER BY
            transaction_id DESC
        LIMIT
            1
    )
    AND assets.token_id = transactions.token_id;

-- return a list of all assets along with information like selling price, file type and license type
SELECT
    assets.token_id,
    item_name,
    item_description,
    image_url,
    image_thumbnail_url,
    image_resolution,
    selling_price,
    time_listed,
    filetype_name,
    license_name
FROM
    assets
    LEFT JOIN assetslistedforsale ON assets.token_id = assetslistedforsale.token_id
    JOIN filetypes ON assets.image_filetype_id = filetypes.filetype_id
    JOIN licensetypes ON assets.license_type_id = licensetypes.license_type_id;

-- get a list of all assets listed for sale along with other info
SELECT
    assets.token_id,
    item_name,
    item_description,
    image_url,
    image_thumbnail_url,
    image_resolution,
    selling_price,
    time_listed,
    filetype_name,
    license_name
FROM
    assets
    JOIN assetslistedforsale ON assets.token_id = assetslistedforsale.token_id
    JOIN filetypes ON assets.image_filetype_id = filetypes.filetype_id
    JOIN licensetypes ON assets.license_type_id = licensetypes.license_type_id;

-- get a list of all assets owned by a user along with other info
SELECT
    assets.token_id,
    item_name,
    item_description,
    image_url,
    image_thumbnail_url,
    image_resolution,
    filetype_name,
    license_name, 
    sale_price,
    transaction_datetime
FROM
    assets
    JOIN filetypes ON assets.image_filetype_id = filetypes.filetype_id
    JOIN licensetypes ON assets.license_type_id = licensetypes.license_type_id
WHERE assets.current_owner='1';


-- get a list of a user's assets listed for sale along with other info
SELECT
    assets.token_id,
    item_name,
    item_description,
    image_url,
    image_thumbnail_url,
    image_resolution,
    selling_price,
    time_listed,
    filetype_name,
    license_name
FROM
    assets
    JOIN assetslistedforsale ON assets.token_id = assetslistedforsale.token_id
    JOIN filetypes ON assets.image_filetype_id = filetypes.filetype_id
    JOIN licensetypes ON assets.license_type_id = licensetypes.license_type_id
WHERE assets.current_owner='1';


-- get information for a single asset, along with details like selling price if it exists
SELECT
    assets.token_id,
    item_description,
    image_url,
    image_thumbnail_url,
    image_resolution,
    selling_price,
    time_listed,
    filetype_name,
    license_name,
    orig_owner.first_name AS original_owner_first_name,
    orig_owner.last_name AS original_owner_last_name,
    orig_owner.user_id AS original_owner_user_id
FROM
    assets
    LEFT JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id
    JOIN filetypes ON assets.image_filetype_id=filetypes.filetype_id
    JOIN licensetypes ON assets.license_type_id=licensetypes.license_type_id
    JOIN users orig_owner ON assets.original_owner=orig_owner.user_id
WHERE
    assets.token_id='2623426';  

SELECT 
    assets.token_id, 
    item_description, 
    image_url, 
    image_thumbnail_url, 
    image_resolution, 
    selling_price, 
    time_listed, 
    filetype_name, 
    license_name 
FROM 
    assets 
    LEFT JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id 
    JOIN filetypes ON assets.image_filetype_id=filetypes.filetype_id 
    JOIN licensetypes ON assets.license_type_id=licensetypes.license_type_id 
WHERE 
    assets.token_id=123133 

-- return a list of users without their passwords
SELECT
    user_id,
    first_name,
    last_name,
    email,
    wallet_id
FROM
    users;

-- return a list of transactions that a particular user has been involved in
SELECT
    transaction_id,
    transactions.token_id,
    seller_id,
    buyer_id,
    assets.sale_price,
    sale_time,
    item_name,
    item_description,
    image_url,
    image_thumbnail_url,
    image_resolution,
    filetype_name,
    license_name
FROM
    transactions
    JOIN assets ON transactions.token_id = assets.token_id
    JOIN filetypes ON assets.image_filetype_id = filetypes.filetype_id
    JOIN licensetypes ON assets.license_type_id = licensetypes.license_type_id
WHERE
    seller_id = '1'
    OR buyer_id = '1';

-- get a list of all asset categories along with their descriptions
SELECT
    *
FROM
    AssetCategoryDescriptions;

--get a list of assets that match one of any category IDs
SELECT DISTINCT
    assets.token_id,
    item_name,
    item_description,
    image_url,
    image_thumbnail_url,
    image_resolution,
    selling_price,
    time_listed,
    filetype_name,
    license_name
FROM
    assets
    JOIN assetslistedforsale ON assets.token_id = assetslistedforsale.token_id
    JOIN filetypes ON assets.image_filetype_id = filetypes.filetype_id
    JOIN licensetypes ON assets.license_type_id = licensetypes.license_type_id
    JOIN assetcategories ON assets.token_id = assetcategories.token_id
WHERE
    assetcategories.category_id = '1'
    OR assetcategories.category_id = '2';

--get a list of featured assets that are listed for sale
SELECT
    assets.token_id,
    item_name,
    item_description,
    image_url,
    image_thumbnail_url,
    image_resolution,
    selling_price,
    time_listed,
    filetype_name,
    license_name
FROM
    assets
    JOIN assetslistedforsale ON assets.token_id = assetslistedforsale.token_id
    JOIN filetypes ON assets.image_filetype_id = filetypes.filetype_id
    JOIN licensetypes ON assets.license_type_id = licensetypes.license_type_id
    JOIN assetcategories ON assets.token_id = assetcategories.token_id
    JOIN AssetCategoryDescriptions ON assetcategories.category_id=AssetCategoryDescriptions.category_id
WHERE
    AssetCategoryDescriptions.category_name = 'Featured';

--check whether a user's login is correct. Returns a user if correct, or nothing if not correct
SELECT
    user_id,
    first_name,
    last_name,
    email,
    wallet_id
FROM
    users
WHERE
    email = 'john.smith@example.com'
    AND password = 'password';

-- returns a list of all filetype options
SELECT * FROM filetypes;

-- returns a list of all license type options
SELECT * from licensetypes;

-- insert a new asset into the table with current time stamp
INSERT INTO Assets (item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price, transaction_datetime) 
VALUES ('Moon Jellyfish', 'Moon Jellyfish Floating In Water',
      'https://images.pexels.com/photos/5472598/pexels-photo-5472598.jpeg',
      'https://images.pexels.com/photos/5472598/pexels-photo-5472598.jpeg?cs=srgb&dl=pexels-ryutaro-tsukata-5472598.jpg&fm=jpg&w=640&h=960',
      '3407 x 5111','1','1', '5', '5', '0', NOW()
     );