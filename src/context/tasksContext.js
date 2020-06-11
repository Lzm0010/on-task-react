import React, {createContext, useState} from 'react';
import PropTypes from "prop-types";

export const TasksContext = createContext({});

export const TasksProvider = props => {
    //initial values obtained from props
    const {
        tasks: initialTasks,
        dayTasks: initialDayTasks,
        children
    } = props;

    //state to keep the values
    const [tasks, setTasks] = useState(initialTasks);
    const [dayTasks, setDayTasks] = useState(initialDayTasks);
    
    //============== TASK FUNCTIONS ===================//
    const getTasks = () => {
        const token = localStorage.getItem('token');
        const getObj = {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
        const tasksUrl = `http://localhost:3000/tasks`;
        fetch(tasksUrl, getObj)
            .then(res => res.json())
            .then(tasks => setTasks(tasks))
    }

    const addTask = (task) => {
        setTasks(tasks => [...tasks, task])
        setDayTasks(tasks => [...tasks, task])
    }

    const getTasksByDay = (day) => {
        const dayTasks = tasks.filter(task => {
            const taskDate = task.date.slice(0,10).replace(/-/g, "");
            return taskDate === day 
        })
        setDayTasks(dayTasks);
    }

    const removeTask = (task) => {
        setTasks(tasks => tasks.filter(dTask => dTask.id !== task.id))
        setDayTasks(tasks => tasks.filter(dTask => dTask.id !== task.id))
    }

    const updateTask = (task) => {
        const updatedTasks = [...tasks];
        const index = updatedTasks.findIndex(taskToUpdate => taskToUpdate.id === task.id);
        updatedTasks[index] = task;
        setTasks(updatedTasks);
        // if (task.goal_id !== null){
        //     const goal = goals.find(goal => goal.id === task.goal_id);
        //     updateGoal(goal);
        // } else if (task.project_id !== null){
        //     const proj = projects.find(proj => proj.id === task.project_id);
        //     console.log(proj)
        //     updateProject(proj)
        // }
        // console.log(projects, goals)
    }

    const updateAllTasks = (tasksToUpdate) => {
        const updatedTasks = [...tasks];
        tasksToUpdate.forEach(task => {
            const index = updatedTasks.findIndex(taskToUpdate => taskToUpdate.id === task.id);
            index === -1 ? updatedTasks.push(task) : updatedTasks[index] = task;
        });
        setTasks(updatedTasks);
        setDayTasks(updatedTasks);
    }

    //make the context object
    const tasksContext = {
        tasks,
        setTasks,
        getTasks,
        dayTasks,
        setDayTasks,
        addTask,
        getTasksByDay,
        removeTask,
        updateTask,
        updateAllTasks
    };
    
    return <TasksContext.Provider value={tasksContext}>{children}</TasksContext.Provider>
};

export const {TasksConsumer} = TasksContext;

TasksProvider.propTypes = {
    tasks: PropTypes.array,
    dayTasks: PropTypes.array
};

TasksProvider.defaultProps = {
    tasks: [],
    dayTasks: []
};