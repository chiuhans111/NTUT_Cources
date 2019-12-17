
var query = require('./query')


async function run() {
    await query.prepare()
    await query.queryAll()
}

run()