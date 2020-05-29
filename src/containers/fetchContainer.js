import React, {useState, useEffect} from 'react';
import Dashboard from '../pages/dashboard';

const FetchContainer = () => {
    const [notes, setNotes] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [goals, setGoals] = useState([]);
    const [projects, setProjects] = useState([]);
    
    const getNotes = () => {
        const notesUrl = `http://localhost:3000/notes`;
        fetch(notesUrl)
            .then(res => res.json())
            .then(notes => setNotes(notes))
    }

    const getTasks = () => {
        const tasksUrl = `http://localhost:3000/tasks`;
        fetch(tasksUrl)
            .then(res => res.json())
            .then(tasks => setTasks(tasks))
    }

    const getGoals = () => {
        const goalsUrl = `http://localhost:3000/goals`;
        fetch(goalsUrl)
            .then(res => res.json())
            .then(goals => setGoals(goals))
    }

    const getProjects = () => {
        const projectsUrl = `http://localhost:3000/projects`;
        fetch(projectsUrl)
            .then(res => res.json())
            .then(projects => setProjects(projects))
    }

     //============== USE EFFECT HOOK ===================//
    useEffect(() => {
        getNotes()
        getTasks()
        getGoals()
        getProjects()
    }, [])

    return (
        <Dashboard goals={goals} setGoals={setGoals} notes={notes} setNotes={setNotes} projects={projects} setProjects={setProjects} tasks={tasks} setTasks={setTasks}/>
    )
}

export default FetchContainer;