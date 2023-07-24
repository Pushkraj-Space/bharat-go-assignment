# bharat-go-assignment
## Start this project locally
To run this project, you must have installed nodejs and postgresql.

Version of Node.js:
```
node --version
v18.14.0
```
Version of PostgreSQL:
```
psql --version
psql (PostgreSQL) 15.3
```
## Setup Server
Open your terminal (cmd, powershell, git bash)
Clone this repository by :
```
git clone https://github.com/Pushkraj-Space/bharat-go-assignment.git
```
Enter to the repository folder :
```
cd bharat-go-assignment
```
Install all required dependencies using `npm` or you can also use` yarn`:
```
npm install or yarn install
```
## Setup Database
1. **Create a database** with a name of your choice in postgres.
```
postgres=# CREATE DATABASE db_name;
```
2. **Import SQL file**, you will find backup.sql file in our cloned folder "bharat-go-assignment" .\
   in terminal
```
postgres=# psql -U username -d db_name -f "%path%\backup.sql";
```
* Replace username with your PostgreSQL database username.
* Replace db_name with the name of the database you want to import the SQL file into.
Replace %path% with the actual path to your cloned folder.
