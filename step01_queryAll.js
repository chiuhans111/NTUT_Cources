var request = require('request')
var iconv = require('iconv-lite')
var fs = require('fs')
var query = require('./query')


async function run() {
    await query.prepare()
    await query.queryAll()
}

run()