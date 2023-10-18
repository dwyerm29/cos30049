I have added db_config to .gitignore because we all have different configurations.

You will need to create a file named db_config.py in this folder with the following contents (changed for your DB config):
db_config = {
"host": "localhost",
"user": "username",
"password": "password",
"database": "database name"
}

blockchain_config = {
"account_address": "0xXXXXXXXXXXXXXXXXXXXXXXXXX",
"account_private_Key": "0x44444444444444444444444444444",
}
