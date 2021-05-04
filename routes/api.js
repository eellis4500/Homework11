var express = require('express')
var router = express.Router()
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')

router.get('/notes', (req, res) => {
    const readData = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), "utf-8"))
    res.json(readData)
})

router.post('/notes', (req, res) => {
    const readData = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), "utf-8"))
    const {title, text} = req.body
    const newNote = {title, text, id:uuidv4()}
    readData.push(newNote)
    console.log(readData)
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(readData))
    res.json(readData)
})
router.delete('/notes/:id', (req, res ) => {
    const readData = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), "utf-8"))
    const placeHolder = readData.filter(({id}) => {
        return req.params.id !== id
    })
    console.log(placeHolder)
    console.log(req.params.id)
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(placeHolder))
    res.json(placeHolder)
})

module.exports = router