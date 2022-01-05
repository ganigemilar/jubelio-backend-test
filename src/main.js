const productController = require('./controller/product')

const { init } = require('./server')
const initdb = require('./database/init-db')
const eleveniaApi = require('./api/elevenia-api')
const productCrud = require('./database/crud/product')

init()
initdb.createTables().then(async () => {
    const _fetchTasks = []
    const products = []
    for (let i = 1; i <= 1; i++) {
        _fetchTasks.push(eleveniaApi.productListing(i).then(res => {
            products.push(...res)
        }))
    }
    await Promise.all(_fetchTasks)

    const _tasks = []
    for (let prod of products) {
        _prod = {
            name: prod.prdNm,
            sku: prod.prdNo,
            image: 'no_product.png',
            price: prod.selPrc,
            description: ''
        }
        _tasks.push(productCrud.create(_prod))
    }
    const result = await Promise.all(_tasks).catch(console.error)

    return result
})