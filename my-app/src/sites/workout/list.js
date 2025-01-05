import WorkoutCard from "./card";
import {Col, Row} from "react-bootstrap";

function WorkoutList({workoutList}) {
    // If data not ok just fill with placeholder
    if (!workoutList.ok) {
        const noneWorkout = {exercises: [], timeBegin: "T"}
        return (
            <Row lg={2} md={1} style={{ padding: "0px", margin: "12px"}}>
                { [1,2,3,4].map((key) => (
                    <Col key={key} style={{ marginBottom: "12px" }}>
                        <WorkoutCard key={key} workout={ noneWorkout } ></WorkoutCard>
                    </Col>
                ))}
            </Row>
        )
    }

    // Loaded data
    return (
        <Row lg={2} sm={1} style={{ padding: "0px", margin: "12px"}}>
            {workoutList.data.sort((a,b)=> new Date(b.timeBegin).getTime() - new Date(a.timeBegin).getTime() ).map((workout)=>(
                <Col key={workout.id} style={{ marginBottom: "12px" }}>
                    <WorkoutCard key={workout.id} workout={workout} ></WorkoutCard>
                </Col>
            ))}
        </Row>
    );
}
export default WorkoutList;