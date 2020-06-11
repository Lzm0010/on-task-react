import React, {createContext, useState} from 'react';
import PropTypes from "prop-types";

export const TasksContext = createContext({});

export const TasksProvider = props => {
    //initial values obtained from props
    const {
        tasks: initialTasks,
        dayTasks: initialDayTasks,
        tasksCompleted: initialTasksCompleted,
        children
    } = props;

    //state to keep the values
    const [tasks, setTasks] = useState(initialTasks);
    const [dayTasks, setDayTasks] = useState(initialDayTasks);
    const [tasksCompleted, setTasksCompleted] = useState(initialTasksCompleted);
    
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
            .then(tasks => {
                setTasks(tasks)
                getTasksCompleted(tasks)
            })
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

    const getTasksCompleted = (tasks) => {
        const completedTasks = tasks.filter(task => task.is_completed === true);
        setTasksCompleted(completedTasks);
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
        getTasksCompleted(updatedTasks);
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
        tasksCompleted,
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
    dayTasks: PropTypes.array,
    tasksCompleted: PropTypes.array
};

TasksProvider.defaultProps = {
    tasks: [],
    dayTasks: [],
    tasksCompleted: []
};