import './App.css';


import Header from "./sites/main/header";
import {useContext} from "react";
import { UniversalContext } from "./sites/data/universalProvider";
import WorkoutList from "./sites/workout/list";
import ConfirmationDialog from "./sites/tools/confirmationDialog";
import WorkoutForm from "./sites/tools/workoutForm";

function App() {
    const {confirmationWindow, workoutData, formsWorkoutData} = useContext(UniversalContext)

    return (
        <>
            <Header />
            <WorkoutList workoutList={workoutData} />
            <ConfirmationDialog parameters={confirmationWindow.parameters} show={confirmationWindow.isOpened}></ConfirmationDialog>
            {formsWorkoutData.visible ? <WorkoutForm preloadedData={formsWorkoutData.preset}/> : null}
        </>
    )
}
export default App;
