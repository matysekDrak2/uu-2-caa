import {Alert, CloseButton, Col, Form, Row} from "react-bootstrap";
import DimBackground from "./dimBackground";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import Button from "react-bootstrap/Button";
import {UniversalContext} from "../data/universalProvider";
import {WorkoutAPI} from "../data/serverCalls";

function Exercise({id, name}) {
    const { setSelectedExerciseList, setInvalidComponentList, setFormData, data } = useContext(FormContext)
    const [isNumberValid, setIsNumberValid] = useState(false);
    function removeSelf(){
        setSelectedExerciseList((prevData)=>{
            const newData = prevData.filter((ids)=> ids !== id)
            console.log(newData)
            return newData
        })
        setInvalidComponentList((prev)=>{
            return prev.filter((ids) => ids !== id)
        })
        setFormData((prev)=>{
            const exercises = prev.exercises.filter((exercise)=>exercise.exercise_id !== id)
            return {...prev, exercises: exercises}
        })
    }
    const val = useMemo(()=>{
        try{
            const val = data.filter((ids)=>ids.exercise_id === id)[0].count
            setIsNumberValid(true)
            return val
        }catch{
            return 0
        }
    }, [])


    return (
        <Row className="mb-3">
            <Form.Group as={Col} md={9} xs={12} controlId={id}>
                <Form.Label column={1}>{name} repetitions</Form.Label>
                <Form.Control
                    required
                    type="number"
                    isInvalid={!isNumberValid}
                    isValid={isNumberValid}
                    defaultValue={val}
                    onChange={(e)=>{
                        //Local
                        setIsNumberValid(e.target.value % 1 === 0 && e.target.value > 0)
                        //Form wide
                        if (e.target.value % 1 === 0 && e.target.value > 0) {
                            setInvalidComponentList((prev)=>{
                                return prev.filter((ids) => ids !== id)
                            })
                            setFormData((prev)=>{
                                const exercises = prev.exercises.filter((exercise)=>exercise.exercise_id !== id)
                                return {...prev, exercises: [...exercises, {exercise_id: id, count: Number(e.target.value)}]}
                            })
                        }else {
                            setInvalidComponentList((prev)=>{
                                return [...prev, id]
                            })
                        }
                    }}
                />
            </Form.Group>
            <Form.Group as={Col} md={3} xs={12} controlId={`${id}-btn`} className="position-relative">
                <Button variant="danger" style={{position: "absolute", bottom: "0px", right: "12px"}} onClick={removeSelf}>Remove</Button>
            </Form.Group>
        </Row>
    )
}

function ExerciseSelector() {
    // Single Id of selected item
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);
    //List of Ids that are selected in this form

    const { exerciseData } = useContext(UniversalContext)
    const { setSelectedExerciseList, selectedExerciseList, setInvalidComponentList } = useContext(FormContext)

    // [{name: string, id: string}]
    const selectableExerciseList = useMemo(()=>{
        if (!exerciseData.ok) return []
        const exerciseIdList = exerciseData.data.map(item=>{return item.id})
        return exerciseIdList.filter((id)=> !selectedExerciseList.includes(id))
    }, [exerciseData, selectedExerciseList, selectedExerciseId]);

    return (
        <>
            <Row className="mb-3">
                <Form.Group as={Col} md={9} xs={12} controlId="exerciseAdder">
                    <Form.Label column={1}>Add exercise</Form.Label>
                    <Form.Select
                        onChange={(e)=>{
                            setSelectedExerciseId((e.target.value === "None") ? null : e.target.value)
                        }}
                    >
                        <option value={null} selected>None</option>
                        {selectableExerciseList.map((id)=>{
                            const exercise = exerciseData.data.filter(item=>item.id === id)[0]
                            return <option value={exercise.id} key={exercise.id}>{exercise.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md={3} xs={12} className="position-relative" controlId="exerciseAdderButtons">
                    <Button style={{position: "absolute", bottom: "0px", right: "12px"}} variant="secondary" disabled={!selectedExerciseId}
                        onClick={()=>{
                            setSelectedExerciseList((prev) => {
                                const newVal = [...prev, selectedExerciseId]
                                setSelectedExerciseId(null)
                                return newVal
                            })
                            setInvalidComponentList((prev)=>{
                                return [...prev, selectedExerciseId]
                            })
                        }}
                    >Add</Button>
                </Form.Group>
            </Row>
            {selectedExerciseList.map((id)=>{
                const exercise = exerciseData.data.filter(item=>item.id === id)[0]
                return (<Exercise id={exercise.id} name={exercise.name} key={exercise.id} />)
            })}
        </>
    )
}

const FormContext = createContext(null);
function WorkoutForm({preloadedData}) {
    const [invalidComponentList, setInvalidComponentList] = useState([]);

    function containData(data){
        return (data !== undefined && data !== null && data !== {} && Object.keys(data).length !== 0)
    }

    const [isValidTimeDiff, setIsValidTimeDiff] = useState(true);
    const [isValidTimeBegin, setIsValidTimeBegin] = useState(true);
    const [isValidTimeEnd, setIsValidTimeEnd] = useState(true);
    const [isValidPlace, setIsValidPlace] = useState(containData(preloadedData));

    const isValid = useMemo(()=>{
        return isValidTimeDiff && isValidTimeBegin && isValidTimeEnd && isValidPlace && invalidComponentList.length === 0
    }, [isValidTimeDiff, isValidTimeBegin, isValidTimeEnd, isValidPlace, invalidComponentList]);



    const dataToLoad = useMemo(()=>{
        return (containData(preloadedData)) ? {
            ...preloadedData,
            exercises: preloadedData.exercises,
            exerciseIds: preloadedData.exercises.map(item=>{return item.exercise_id})
        } : {
            timeBegin: new Date(new Date().setHours(new Date().getHours() -1 )).toISOString().slice(0, 16),
            timeEnd: new Date().toISOString().slice(0, 16),
            place: "",
            exercises: [],
            exerciseIds: []
        }
    }, [preloadedData]);


    const [formData, setFormData] = useState(() =>{
        if (containData(preloadedData)){
            return {
                timeBegin: new Date(dataToLoad.timeBegin).toISOString(),
                timeEnd: new Date(dataToLoad.timeEnd).toISOString(),
                place: dataToLoad.place,
                exercises: dataToLoad.exercises,
                id: preloadedData.id
            }
        } else{
            return {
                timeBegin: new Date(dataToLoad.timeBegin).toISOString(),
                timeEnd: new Date(dataToLoad.timeEnd).toISOString(),
                place: dataToLoad.place,
                exercises: dataToLoad.exercises
            }
        }
    })

    const handleTimeChange = (e) => {

        try{
            const {name, value} = e.target;
            const dt = new Date(value).toISOString()
            setFormData((prev)=>{
                const newData={...prev, [name]: dt }

                setIsValidTimeDiff( new Date(newData.timeBegin).getTime() < new Date(newData.timeEnd).getTime() )

                return newData
            });
            return true
        }
        catch(e){
            return false
        }
    }
    const handleTextChange = (e) => {

        const {name, value} = e.target;
        setFormData((prev)=>{
            return {...prev, [name]: value}
        })
        return value.length >= 1;
    }

    const { formsWorkoutSetter, updateWorkouts } = useContext(UniversalContext)
    const handleSubmit = async (e)=> {
        e.preventDefault();
        console.log(formData);
        if (formData.id !== null && formData.id !== undefined) {
            const resp = await WorkoutAPI().update(formData)
        }else {
            const resp = await WorkoutAPI().create(formData)
        }
        formsWorkoutSetter((prev)=>{return{...prev, visible: false, preset: {}}})
        updateWorkouts()
    }

    const [selectedExerciseList, setSelectedExerciseList] = useState(dataToLoad.exerciseIds);

    const value = {
        setSelectedExerciseList: setSelectedExerciseList,
        selectedExerciseList: selectedExerciseList,
        setFormData: setFormData,
        setInvalidComponentList: setInvalidComponentList,
        data: dataToLoad.exercises
    }

    return(
        <DimBackground show={true}>
            <FormContext.Provider value={value}>
                <Form onSubmit={(e)=>{handleSubmit(e)}}>
                    <CloseButton onClick={()=>{formsWorkoutSetter((prev)=>{return{...prev, visible: false, preset: {}}})}}/>
                    <Alert show={!isValidTimeDiff} variant="danger">Ending time needs to be after begin time</Alert>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="startDateTime">
                            <Form.Label column={1}>Start Time</Form.Label>
                            <Form.Control
                                required
                                type="datetime-local"
                                step="1"
                                isInvalid={!isValidTimeBegin || !isValidTimeDiff}
                                isValid={isValidTimeBegin && isValidTimeDiff}
                                name='timeBegin'
                                defaultValue={new Date(dataToLoad.timeBegin).toISOString().slice(0, 16)}
                                onChange={(e)=>{setIsValidTimeBegin(handleTimeChange(e))}}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="endDateTime">
                            <Form.Label column={1}>End Time</Form.Label>
                            <Form.Control
                                required
                                type="datetime-local"
                                step="1"
                                isInvalid={!isValidTimeEnd || !isValidTimeDiff}
                                isValid={isValidTimeEnd && isValidTimeDiff}
                                name='timeEnd'
                                defaultValue={new Date(dataToLoad.timeEnd).toISOString().slice(0, 16)}
                                onChange={(e)=>{setIsValidTimeEnd(handleTimeChange(e))}}
                            />

                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="place">
                            <Form.Label column={1}>Place</Form.Label>
                            <Form.Control
                                required
                                type="string"
                                isInvalid={!isValidPlace}
                                isValid={isValidPlace}
                                name="place"
                                defaultValue={dataToLoad.place}
                                onChange={(e)=>{setIsValidPlace(handleTextChange(e))}}
                            />
                        </Form.Group>
                    </Row>
                    <ExerciseSelector/>
                    <Button type="submit" variant="primary" disabled={!isValid}>{(formData.id !== null && formData.id !== undefined)? "Update" : "Submit"}</Button>
                </Form>
            </FormContext.Provider>
        </DimBackground>
    )
}

export default WorkoutForm;