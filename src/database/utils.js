const camelCase = require('camelcase')

function toJsonStandard(data) {
    const _data = {}

    for (const [key, val] of Object.entries(data)) {
        _data[`${camelCase(key)}`] = val
    }

    return _data
}

module.exports = {
    toJsonStandard
}