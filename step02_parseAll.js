var fs = require('fs')
var path = require('path')
var rawFiles = fs.readdirSync('./raw')
var parse = require('./parse')


console.log(rawFiles)

async function run() {
    let parsed = []
    for (var x of rawFiles) {
        console.log('parsing', x)
        let fullpath = path.resolve('./raw', x)
        let content = await parse.parse(fullpath)
        parsed.push(content)
    }

    fs.writeFileSync(
        path.resolve('./parsed.json'),
        JSON.stringify(parsed)
    )
}

run()

