import parsed from "../../parsed.json"
import units from "./units"
let cat_order = {
    "機電": 1,
    "工程": 2,
    "管理": 3,
    "設計": 4,
    "人文": 5,
    "電資": 6,
    "通識": 7,
    "學程": 8,
    "體育": 9,
    "公務": 10,
    "其他": 20
}

let classlabels = [
    "光電", "資工", "機械", "機電", "車輛", "製科", "自動", "化工",
    "材資", "土木", "分子", "防災", "高分", "環境",
    "生化", "材料", "資源", "工管", "經管",
    "資財", "工設", "建築", "創新", "設計", "互動",
    "技職", "英文", "智財", "文發", "電機", "電子",
    "博雅", "通識"
]

let classMatcher = new RegExp('(' + classlabels.join('|') + ')')
classlabels.push("其他")
let cats = {}

let postfixes = {}

parsed.map(x => {
    let cat = units.catagory[x.unit] || "其他"
    if (cats[cat] == null)
        cats[cat] = {
            name: cat,
            order: cat_order[cat] || 99,
            units: []
        }
    let postfix = x.unit.substr(x.unit.length - 1, 1)


    var obj = {
        name: x.unit,
        postfix: null,
        check: false
    }

    x.cat = obj

    if (postfixes[postfix] == null)
        postfixes[postfix] = []

    postfixes[postfix].push(obj)

    cats[cat].units.push(obj)
})

postfixes = Object.keys(postfixes).map(x => {
    let obj = {
        name: x,
        check: true
    }
    postfixes[x].map(y => {
        y.postfix = obj
    })
    return obj
})

let cats_list = []

for (var i in cats) {
    cats_list.push(cats[i])
}

cats_list.sort((a, b) => a.order - b.order)


let classes_obj = {}
let classes = []

function filteredCourses() {
    for (let i in classes) classes[i].show = false
    let all = { courses: [] }



    parsed.filter(x => x.cat.check).map(x => {
        x.content.map(y => {

            y.times.map(z => {

                if (all[z.day] == null)
                    all[z.day] = {}

                if (all[z.day][z.time] == null)
                    all[z.day][z.time] = []

                let relatedClass = []
                y.classname.split('\n').map(w => {
                    let classname = w.trim()
                    if (classes_obj[classname] == null) {

                        let gradematch = classname.match(/[一二三四].?$/)
                        let classMatch = classMatcher.exec(classname)
                        let boyaMatch = null
                        if (classMatch != null && classMatch[0] == "博雅")
                            boyaMatch = classname.match(/博雅核心[—－](.+)\(/)

                        classes_obj[classname] = {
                            name: classname,
                            check: true,
                            show: true,
                            grade: gradematch != null ? { "一": 1, "二": 2, "三": 3, "四": 4 }[gradematch] : 5,
                            class: classMatch ? classMatch[0] : "其他",
                            boya: boyaMatch != null ? boyaMatch[1].trim() : ""
                        }
                        classes.push(classes_obj[classname])
                    }

                    classes_obj[classname].show = true
                    relatedClass.push(classes_obj[classname])
                })

                classes.sort((a, b) => {
                    if (a.class != b.class) return a.class.localeCompare(b.class)
                    if (a.boya != b.boya) return a.boya.localeCompare(b.boya)
                    if (a.grade != b.grade) return a.grade - b.grade

                    a = a.name
                    b = b.name
                    if (a.length > b.length) return 1
                    if (b.length > a.length) return -1
                    return [...a].reverse().join('').localeCompare([...b].reverse().join(''))
                })


                let obj = {
                    name: y.name,
                    content: y,
                    time: z,

                    class: relatedClass
                }
                if (!all[z.day][z.time].some(w => w.content.id == y.id))
                    all[z.day][z.time].push(obj)
                all.courses.push(obj)

            })
        })
    })

    for (var i in all) if (i != 'courses') all[i] = Object.keys(all[i]).map(x => {
        return {
            time: x,
            timec: { 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'N': 4.5 }[x] || x,
            courses: all[i][x]
        }
    }).sort((a, b) => {
        return a.timec - b.timec
    })

    return all
}




export default {
    cats_list,
    postfixes,
    filteredCourses,
    classes,
    classlabels
}