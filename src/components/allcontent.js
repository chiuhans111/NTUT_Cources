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


                if (classes_obj[y.classname] == null){

                    classes_obj[y.classname] = {
                        name: y.classname,
                        check: true,
                        show:true
                    }
                    classes.push(classes_obj[y.classname])
                    classes.sort()
                }
                    
                classes_obj[y.classname].show = true

                let obj = {
                    name: y.name,
                    content: y,
                    time: z,

                    class: classes_obj[y.classname]
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
    classes
}