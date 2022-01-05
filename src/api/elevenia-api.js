const axios = require('axios')
const qs = require('qs')
const { XMLParser } = require('fast-xml-parser')

const ELEVENIA_API_HOST = 'http://api.elevenia.co.id'
const ELEVENIA_API_KEY = '721407f393e84a28593374cc2b347a98'

const httpClient = axios.create({
    baseURL: ELEVENIA_API_HOST,
    headers: { openapikey: ELEVENIA_API_KEY }
})

function parseXML(xml) {
    const parser = new XMLParser()
    const rest = parser.parse(xml)

    return rest
}

async function productListing(page) {
    const paramObj = {
        page: page
    }
    const res = await httpClient.get('/rest/prodservices/product/listing', qs.stringify(paramObj))

    const _rest = parseXML(res.data)
    const products = _rest.Products.product

    return products
}

module.exports = {
    productListing
}