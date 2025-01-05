import {createContext, useEffect, useState} from "react";
import {ExerciseAPI, WorkoutAPI} from "./serverCalls";

export const UniversalContext = createContext(null);

function UniversalProvider({children}) {
    const [confirmationWindow, setConfirmationWindow ] = useState({
        isOpened: false,
        parameters: {
            text: "Initial deletion text",
            onConfirm: ()=>{},
            onCancel: ()=>{},
            confirmStyle: "danger",
            cancelStyle: "secondary"
        }
    });
    const [workoutFormData, setWorkoutFormData] = useState({
        visible: false,
        preset: {}
    })


    const [dataStable, setDataStable] = useState(false);
    const [workoutData, setWorkoutData] = useState({
        ok: false,
        data: null,
        error: "Data not initialized"
    });
    const [exerciseData, setExerciseData] = useState({
        ok: false,
        data: null,
        error: "Data not initialized"
    });


    async function updateWorkouts(){
        setWorkoutData((prevState) => {
            return {...prevState, ok: false, error: null};
        })

        const response = await WorkoutAPI().getAll(); //https://jsonplaceholder.typicode.com/posts
        const responseJson = response.data
        setWorkoutData((prevState) => {
            if(response.ok){
                return {...prevState, ok: true, data: responseJson, error: null }
            }
            return {...prevState, ok: false, error: "failed to load data" }
        })
    }
    async function updateExercises(){
        setExerciseData((prevState) => {
            return {...prevState, ok: false, error: null};
        })

        const response = await ExerciseAPI().getAll(); //https://jsonplaceholder.typicode.com/posts
        const responseJson = response.data
        setExerciseData((prevState) => {
            if(response.ok){
                return {...prevState, ok: true, data: responseJson, error: null }
            }
            return {...prevState, ok: false, error: "failed to load data" }
        })
    }


    useEffect(() => {
        updateWorkouts();
        updateExercises();
    }, []);

    //data i want to provide
    const value = {
        confirmationWindow: confirmationWindow,
        setConfirmationWindow: setConfirmationWindow,
        exerciseData: exerciseData,
        workoutData: workoutData,
        updateWorkouts: updateWorkouts,
        updateExercises: updateExercises,
        formsWorkoutData: workoutFormData,
        formsWorkoutSetter: setWorkoutFormData
    }

    return (
        <UniversalContext.Provider value={value}>
            {children}
        </UniversalContext.Provider>
    )
}

export default UniversalProvider;