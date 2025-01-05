import {ButtonGroup, Card, Col, Row} from "react-bootstrap";
import {useContext, useMemo, useState} from "react";
import Button from "react-bootstrap/Button";
import {UniversalContext} from "../data/universalProvider";
import triggerBrowserReflow from "react-bootstrap/triggerBrowserReflow";
import {WorkoutAPI} from "../data/serverCalls";

function WorkoutCard({workout}) {

    const {exerciseData, setConfirmationWindow, updateWorkouts, formsWorkoutSetter} = useContext(UniversalContext)
    const [ isExpanded, setExpanded ] = useState(false);
    const points = useMemo(() => {
        let count = 0
        workout.exercises.forEach((exercise) => {
            count += exercise.count
        })
        return count
    }, [workout.exercises]);
    /**@type JSX*/
    const expansion = useMemo(()=> {
        return (
            <Row xs={1}>
                <Col style={{borderTop: "2px solid black"}}>
                    <Row xs={3}>
                        <Card.Text>Exercise Name</Card.Text>
                        <Card.Text>Reps. Done</Card.Text>
                        <Card.Text>Points Earned</Card.Text>
                    </Row>
                </Col>
                {workout.exercises.map((exercise) => {
                    const filtered = exerciseData.data.filter(ex => ex.id === exercise.exercise_id)[0]

                    return (
                        <Col key={exercise.exercise_id} style={{borderTop: "2px solid black"}}>
                            <Row xs={3}>
                                <Card.Text>{filtered.name}</Card.Text>
                                <Card.Text>{exercise.count}</Card.Text>
                            </Row>
                        </Col>
                    )
                })}
            </Row>
        )
    }, [isExpanded])

    const pointsText = "Points earned: " + points

    function openConfirmationWindow(text, onConfirm, onCancel, confirmStyle, cancelStyle)  {
        setConfirmationWindow(()=> {
            return {
                isOpened: true,
                parameters:{
                    text: text,
                    onConfirm: () => onConfirm,
                    onCancel: () => onCancel,
                    confirmStyle: confirmStyle,
                    cancelStyle: cancelStyle
                }
            }
        })
    }
    function openConfirmDelete(id){
        function closePopup(){
            setConfirmationWindow((prev)=> {
                return {
                    ...prev,
                    isOpened: false
                }
            })
        }
        function confirmDelete(id){
            closePopup()
            WorkoutAPI().delete(id)
            setTimeout(()=>{updateWorkouts()}, 200)
        }
        openConfirmationWindow("Are you sure you want to permanently delete this item", ()=>confirmDelete(id), () => closePopup(), "danger", "secondary")
    }


    return (
        <Card style={{ border: "3px solid black" }}>
            <Card.Body>
                <Row xs={2}>
                    <Col style={{ textAlign: "left",  alignSelf: "center"}}>
                        <Card.Title>{ new Date(workout.timeBegin).toLocaleDateString()}</Card.Title>
                    </Col>
                    <Col style={{alignSelf: "end"}}>
                        <ButtonGroup className="flex-wrap" style={{ margin: "10px", alignSelf: "right" }} >
                            <Button variant="danger" className="flex-fill rounded-pill" style={{marginRight: "5px"}} onClick={()=>openConfirmDelete(workout.id)}>DEL</Button>
                            <Button variant="warning" className="flex-fill rounded-pill" style={{marginRight: "5px"}} onClick={() => formsWorkoutSetter((prev)=>{return {...prev, visible: true, preset: {...workout}}})}>EDIT</Button>
                            <Button variant="primary" className="flex-fill rounded-pill" onClick={() => setExpanded((ps)=>{return !ps})}>{isExpanded? 'Close' : "Show"}</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                {isExpanded ? expansion : <Card.Text>{pointsText}</Card.Text>}
            </Card.Body>

        </Card>
    )
}
export default WorkoutCard;