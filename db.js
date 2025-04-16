const { Sequelize } = require('sequelize')

// database connection string provided by Render or other environment
const databaseUrl = process.env.DATABASE_URL;

// Check if DATABASE_URL is provided
if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is not set.');
  process.exit(1); // Exit if no database URL is found
}

const sequelize = new Sequelize(
  databaseUrl, // Use the connection URL
  {
    // host, database, user, password will be extracted from the URL
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Required for Render databases
        rejectUnauthorized: false, // Required for Render databases
      },
    },
    logging: false, // Optional: disable logging SQL queries
    define: {
      createdAt: 'added',
      updatedAt: 'updated',
    }
  },
)

sequelize.authenticate()
  .then(() => console.log('Database connection established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync()
  .then(() => console.log('Models synchronized successfully.'))
  .catch(err => console.error('Unable to synchronize models:', err));


module.exports = sequelize
