const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const { resolve } = require('path')
const { rejects } = require('assert')

class Cube {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid.v4()

    }

    toJson() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    async save() {
        const cubes = await Cube.getAll()
        cubes.push(this.toJson())
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'cubes.json'),
                JSON.stringify(cubes),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
            console.log('Cubes', cubes)
        })
    }

    static async update(cube) {
        const cubes = await Cube.getAll()
        const index = cubes.findIndex(i => i.id === cube.id)
        cubes[index] = cube
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'cubes.json'),
                JSON.stringify(cubes),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
            console.log('Cubes', cubes)
        })
    }

    static async getById(id) {
        const cubes = await Cube.getAll()
        return cubes.find(i => i.id === id)

    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'cubes.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }
}

module.exports = Cube