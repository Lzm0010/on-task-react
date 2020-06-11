import React, {useState, useEffect} from 'react';
import Dashboard from '../pages/dashboard';

const FetchContainer = (props) => {
    const [notes, setNotes] = useState([]);
    const [goals, setGoals] = useState([]);
    const [projects, setProjects] = useState([]);
    
    
    //============== USE EFFECT HOOK ===================//
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getObj = {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }

        const getNotes = () => {
            const notesUrl = `http://localhost:3000/notes`;
            fetch(notesUrl, getObj)
                .then(res => res.json())
                .then(notes => setNotes(notes))
        }
    
        const getGoals = () => {
            const goalsUrl = `http://localhost:3000/goals`;
            fetch(goalsUrl, getObj)
                .then(res => res.json())
                .then(goals => setGoals(goals))
        }
    
        const getProjects = () => {
            const projectsUrl = `http://localhost:3000/projects`;
            fetch(projectsUrl, getObj)
                .then(res => res.json())
                .then(projects => setProjects(projects))
        }

        getNotes()
        getGoals()
        getProjects()
    }, [])

    return (
        <Dashboard user={props.user} planner={props.planner} goals={goals} setGoals={setGoals} notes={notes} setNotes={setNotes} projects={projects} setProjects={setProjects}/>
    )
}

export default FetchContainer;