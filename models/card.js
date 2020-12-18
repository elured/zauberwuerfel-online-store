const path = require('path')
const fs = require('fs')
const { resolve } = require('path')
const { rejects } = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {
    static async add(cube) {
        const card = await Card.fetch()

        const index = card.cubes.findIndex(i => i.id === cube.id)
        const candidate = card.cubes[index]

        if (candidate) {
            candidate.count++
            card.cubes[index] = candidate
        } else {
            cube.count = 1
            card.cubes.push(cube)
        }

        card.price += +cube.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
    static async remove(id) {
        const card = await Card.fetch()

        const index = card.cubes.findIndex(i => i.id === id)
        const cube = card.cubes[index]

        if (cube.count === 1) {
            card.cubes = card.cubes.filter(i => i.id !== id)
        } else {
            card.cubes[index].count--
        }
        card.price -= cube.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })
    }

}

module.exports = Card