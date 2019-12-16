var queryform = require('./queryform')
var request = require('request')
var iconv = require('iconv-lite')
var fs = require('fs')


let options = {}

async function prepare() {
    options = await queryform.getOptions()
}

async function queryAll() {

    console.log(options)


    for (var i of options.unit.slice(1)) {

        var form = queryform.getForm(options.year[0].value, i.value)
        console.log('requesting', form.year, i.content)

        await new Promise(done => {

            request.post({
                url: 'https://aps.ntut.edu.tw/course/tw/QueryCourse.jsp',
                form,
                encoding: null
            }, function (err, res, body) {

                let content = body
                fs.writeFileSync('./raw/' + 'y' + form.year + '_' + i.content + '.txt', content)
                done()
            })
        })

    }




}


module.exports = {
    prepare,
    queryAll
}