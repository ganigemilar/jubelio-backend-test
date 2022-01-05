const { server } = require('../server')
const { XMLParser } = require('fast-xml-parser')

const productCrud = require('../database/crud/product')

const ELEVENIA_API_HOST = 'http://api.elevenia.co.id'
const ELEVENIA_API_KEY = '721407f393e84a28593374cc2b347a98'

const axios = require('axios')
const httpClient = axios.create({
    baseURL: ELEVENIA_API_HOST,
    headers: { openapikey: ELEVENIA_API_KEY }
})
const qs = require('qs')


function parseXML(xml) {
    const parser = new XMLParser()
    const rest = parser.parse(xml)

    return rest
}

server.route({
    method: 'GET',
    path: '/product/fetch',
    handler: async (request, reply) => {
        const query = request.query
        const paramObj = {
            page: query.page ?? 1
        }
        
        const res = await httpClient.get('/rest/prodservices/product/listing', qs.stringify(paramObj))
        
        const _rest = parseXML(res.data)
        const products = _rest.Products.product

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
    }
})

server.route({
    method: 'POST',
    path: '/product',
    options: {
        auth: 'simple'
    },
    handler: async (request, reply) => {
        const payload = request.payload

        if (!payload) return { result: "payload cannot be null" }

        try {
            const res = await productCrud.create(payload)

            return res
        } catch (error) {
            console.error(error)
            return { result: "something wrong!" }
        }
    }
})

server.route({
    method: 'GET',
    path: '/product/by-id/{id}',
    options: {
        auth: 'simple'
    },
    handler: async (request, reply) => {
        const id = request.params.id

        if (!id) return { result: "id cannot be null" }

        try {
            const res = await productCrud.getById(id)

            return res
        } catch (error) {
            console.error(error)
            return { result: "something wrong!" }
        }
    }
})

server.route({
    method: 'PUT',
    path: '/product',
    options: {
        auth: 'simple'
    },
    handler: async (request, reply) => {
        const payload = request.payload

        if (!payload) return { result: "payload cannot be null" }

        try {
            const res = await productCrud.update(payload)

            return res
        } catch (error) {
            console.error(error)
            return { result: "something wrong!" }
        }
    }
})

server.route({
    method: 'DELETE',
    path: '/product/by-id/{id}',
    options: {
        auth: 'simple'
    },
    handler: async (request, reply) => {
        const id = request.params.id

        if (!id) return { result: "id cannot be null" }

        try {
            const res = await productCrud.deleteById(id)

            return res
        } catch (error) {
            console.error(error)
            return { result: "something wrong!" }
        }
    }
})

server.route({
    method: 'GET',
    path: '/product/list',
    options: {
        auth: 'simple'
    },
    handler: async (request, reply) => {
        const queries = request.query

        if (!queries.page) return { result: "page cannot be null" }
        
        if (!queries.limit) return { result: "limit cannot be null"}

        const page = queries.page
        const limit = queries.limit
        try {
            const res = await productCrud.getList((page - 1) * limit, limit)
            
            return res
        } catch (error) {
            console.error(error)
            return { result: "something wrong!" }
        }
    }
})