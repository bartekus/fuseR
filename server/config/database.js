module.exports = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 28015,
    db: process.env.DB_NAME || 'FuseR',
    tables: {
    'messages': 'id',
    'cache': 'cid',
    'users': 'id'
  }
};
