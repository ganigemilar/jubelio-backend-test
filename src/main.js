const productController = require('./controller/product')

const { init } = require('./server')
const initdb = require('./database/init-db')

init()
initdb.createTables()