-- get a list of all assets for sale along with their current owner
SELECT * FROM assets 
    JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id 
    JOIN transactions ON assets.token_id=(SELECT transactions.token_id FROM transactions WHERE transactions.token_id=assets.token_id ORDER BY transaction_id DESC LIMIT 1)
    AND assets.token_id=transactions.token_id
