var JSDOM = require('jsdom').JSDOM



exports.parse = async function (fullpath) {
    let document = (await JSDOM.fromFile(fullpath, {

    })).window.document

    let content = Array.from(document.querySelectorAll('tr')).slice(1).map(x => {
        return Array.from(x.querySelectorAll('td'))
    }).filter(x => x.length > 20).map(x => {
        /**@type {Array<Element>} */
        let r = x
        let id = r[0].textContent.trim()
        let name = r[1].textContent.trim()
        let level = r[2].textContent.trim()
        let credit = r[3].textContent.trim()
        let hour = r[4].textContent.trim()
        let need = {
            '○': '必 部訂共同必修',
            '△': '必 校訂共同必修',
            '☆': '選 共同選修',
            '●': '必 部訂專業必修',
            '▲': '必 校訂專業必修',
            '★': '選 專業選修',
        }[r[5].textContent.trim()]
        let classname = r[6].textContent.trim()
        let teacher = r[7].textContent.trim()
        let times = []
        let days = r.slice(8, 8 + 7)
        days.map((y, i) => {
            y.textContent.trim().split(' ').map(z => {
                if (z.length > 0)
                    times.push({
                        day: i,
                        time: z
                    })
            })
        })
        let classroom = r[15].textContent.trim()
        let peoples = r[16].textContent.trim()
        let peoples_quit = r[17].textContent.trim()
        let assist = r[18].textContent.trim()
        let other = r[21].textContent.trim()
        return {
            id, name, level, credit, hour, need, classname, teacher, times,
            classroom, peoples, peoples_quit, assist, other
        }
    })

    return {
        unit: fullpath.match(/.+_(.+?)\.txt$/)[1],
        content
    }

}