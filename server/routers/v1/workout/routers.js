const express = require('express');
const router = express.Router()
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const addFormats = require("ajv-formats")
addFormats(ajv)


const { v4: uuidv4 } = require('uuid');

const workout_template = {
    type: 'object',
    properties: {
        timeBegin: { type: 'string', format: 'date-time' },
        timeEnd: { type: 'string', format: 'date-time' },
        place: { type: 'string', maxLength: 150 },
        exercises: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    count: { type: 'integer', exclusiveMinimum: 0, multipleOf: 1},
                    exercise_id: { type: 'string', maxLength: 36, minLength: 36 },
                },
                required: ['count', 'exercise_id']
            },
            minItems: 1
        }
    },
    required: ['timeBegin', 'timeEnd', 'place', 'exercises'],
    additionalProperties: false
}
const validator = ajv.compile(workout_template)

const create = require("../../../dao/methods/v1/workout/create");
router.post('/create', (req, res) => {
    const data = req.body;
    const valid = validator(data)
    if ( !valid ) {
        res.status(400).json(validator.errors).send()
        return
    }
    data.id = uuidv4()

    const created = create(data)

    res.json(created).send()
})

const get_all = require("../../../dao/methods/v1/workout/getAll")
router.get('/', (req, res) => {
    try{
        res.json(get_all(req.query.time))
    }
    catch(err){
        res.json(get_all())
    }
    res.send()
})

const get = require("../../../dao/methods/v1/workout/get")
router.get('/:id', (req, res) => {
    const data = get(req.params.id)
    if (!data) return res.status(404).send()
    res.send(data)
})

const properties = {...workout_template.properties, id: { type: 'string', maxLength: 36, minLength: 36 }}
const workout_template_update = {
    type: 'object',
    properties: properties,
    required: ['id'],
    additionalProperties: false
}
const validator_update = ajv.compile(workout_template_update)

const update = require("../../../dao/methods/v1/workout/update")
router.put('/update', (req, res) => {
    const valid = validator_update(req.body)
    if ( !valid ) {
        res.status(400).json(validator_update.errors).send()
        return;
    }
    const dta = update(req.body.id, req.body)
    res.send(dta).send()
})


const delete_workout = require('../../../dao/methods/v1/workout/delete')
router.delete('/:id', (req, res) => {
    if(req.params.id.length !== 36) {
        res.json("Invalid ID").send()
        return
    }
    const result = delete_workout(req.params.id)
    res.json(result).send
})
module.exports = router