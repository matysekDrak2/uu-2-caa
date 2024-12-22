const express = require('express');
const router = express.Router()
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const addFormats = require("ajv-formats")
addFormats(ajv)


const { v4: uuidv4 } = require('uuid');

const exercise_template = {
    type: 'object',
    properties: {
        name: { type: 'string', maxLength: 200 },
        weight: { type: 'integer'},
        wantedPoints: { type: 'integer' }
    },
    required: ['name', 'weight', 'wantedPoints'],
    additionalProperties: false
}
const validator = ajv.compile(exercise_template);

const create = require("../../../dao/methods/v1/exersise/create")
router.post('/create', (req, res) => {
    const data = req.body;
    const valid = validator(data)
    if ( !valid ) {
        res.status(400).json(validator.errors).send()
        return
    }
    data.id = uuidv4()

    const sucess = create(data)
    if (sucess !== 0) {
        res.status(400).send(sucess)
        return;
    }

    res.json(data).send()
})

const satisfaction = require("../../../dao/methods/v1/exersise/satisfaction")
router.get('/satisfaction', (req, res) => {
    const result = satisfaction()
    res.json(result).send()
})

const get_all = require("../../../dao/methods/v1/exersise/getAll")
router.get('/', (req, res) => {
    const data = get_all()
    res.json(data)
})

const get = require("../../../dao/methods/v1/exersise/get")
router.get('/:id', (req, res) => {
    if(req.params.id.length !== 36) {
        res.status(404).json("Invalid ID").send()
        return
    }
    const data = get(req.params.id)
    if (!data) {
        res.status(404).json("No data with specified ID found").send()
        return
    }
    res.send(data)
})


const properties = {...exercise_template.properties, id: { type: 'string', maxLength: 36, minLength: 36 }}
const exercise_template_update = {
    ...exercise_template,
    properties: properties,
    required: ['id']
}

const validator_update = ajv.compile(exercise_template_update)

const update = require('../../../dao/methods/v1/exersise/update')
router.put('/update', (req, res) => {
    const valid = validator_update(req.body)
    if ( !valid ) {
        res.status(400).json(validator_update.errors).send()
        return;
    }
    const updateDta = update(req.body.id, req.body)
    res.send(updateDta).send()
})


const delete_exercise = require('../../../dao/methods/v1/exersise/delete')
router.delete('/:id', (req, res) => {
    res.status(404).json("NOT implemented yet").send()
    return;
    if(req.params.id.length !== 36) {
        res.json("Invalid ID").send()
        return
    }
    const result = delete_exercise(req.params.id)
    res.json(result).send
})

module.exports = router