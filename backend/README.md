# Packing list backend


## Adding or updating users from the command line
This command will either add a user with email `kevin@packing-list.com` with password `admin2` and roles of admin and user, or - if the user already exists - update both password and
roles for the existing user:

`npm run user-admin -- upsert -p admin2 -r admin,user me@kevin-read.com`