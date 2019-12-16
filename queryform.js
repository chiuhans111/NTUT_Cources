const jsdom = require('jsdom').JSDOM


async function getOptions() {

    let document = (await jsdom.fromURL('https://aps.ntut.edu.tw/course/tw/QueryCurrPage.jsp')).window.document

    return {

        unit: Array.from(document.querySelectorAll('[name=unit]>option')).map(x => {
            return {
                value: x.value,
                content: x.textContent
            }
        }),
        year: Array.from(document.querySelectorAll('[name=year]>option')).map(x => {
            return {
                value: x.value,
                content: x.textContent
            }
        }).sort((a, b) => (+b.value) - (+a.value))
    }
}


function getForm(year, unit) {
    let form = {
        stime: 0,
        year: year,
        matric: "'0','1','4','5','6','7','8','9','A','C','D','E','F'",
        sem: 1,
        unit: unit,
        cname: '',
        ccode: '',
        tname: '',
        PN: 'ON'
    }


    for (var i = 0; i < 7; i++) form['D' + i] = 'ON'
    for (var i = 0; i < 14; i++) form['P' + i] = 'ON'

    return form
}

module.exports = {
    getForm,
    getOptions
}
