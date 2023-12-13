const mysql = require('mysql2');
const DB_NAME = 'all_iids'

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'example',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL server');

  // Create the database if it doesn't exist
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;
  connection.query(createDatabaseQuery, (createDatabaseError, createDatabaseResults) => {
    if (createDatabaseError) {
      console.error('Error creating database:', createDatabaseError);
      connection.end();
      return;
    }

    console.log(`Database "${DB_NAME}" created or already exists`);

    // Switch to the created database
    connection.changeUser({ database: DB_NAME }, (changeUserError) => {
      if (changeUserError) {
        console.error('Error switching to database:', changeUserError);
        connection.end();
        return;
      }

      console.log(`Switched to database "${DB_NAME}"`);

      // Define the SQL query to create a table if not exists
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS IID (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          species VARCHAR(255),
          sex VARCHAR(10),
          occupation VARCHAR(255),
          origin VARCHAR(255),
          pfp VARCHAR(255),
          birth_year VARCHAR(10),
          status VARCHAR(255),
          description TEXT,
          createdAt TEXT
        )
      `;

      // Execute the query to create the table
      connection.query(createTableQuery, (createTableError, createTableResults) => {
        if (createTableError) {
          console.error('Error creating table:', createTableError);
          connection.end();
          return;
        }

        console.log('Table "users" created or already exists');

        // Define the SQL query to insert data into the table

        const insertDataQuery = `INSERT INTO IID (name, species, sex, occupation, origin, pfp, birth_year, status, description, createdAt) VALUES
        ('Tico', 'Cat', 'Male', 'Being Cute', 'Mars', 'cat.png', '2000', 'Is eepy.', '', '2023-11-23T14:15:24.450Z'),
        ('John Smith', 'Homo Sapien?', 'Male', 'Builder', 'Mars', 'john_doe.jpg', '2099', 'Alive', '', '2023-12-03T21:12:15.483Z'),
        ('Dog', 'Canis familiaris', 'Male', 'Being a good boy!', 'Earth', 'dogo.jpg', '2010', 'Sleeping', '', '2023-12-04T00:32:42.639Z'),
        ('Mustang', 'Car', 'its a car', 'idk its car', 'Earth', 'https://i.pinimg.com/originals/94/39/0b/94390b50e16145523416e45d1924e296.jpg', 'Unknown', 'Unknown', '', '2023-12-04T10:53:57.998Z'),
        ('Jane Doe', 'Homo Sapien', 'Female', 'Unknown', 'Earth', 'jane_doe.jpg', '2099', 'Unknown', '', '2023-12-04T12:38:03.691Z')
        `

        // Execute the query to insert data
        connection.query(insertDataQuery, (insertDataError, insertDataResults) => {
          if (insertDataError) {
            console.error('Error inserting data:', insertDataError);
          } else {
            console.log('Data inserted or already exists');
          }

          // Close the connection
          connection.end();
        });
      });
    });
  });
});
