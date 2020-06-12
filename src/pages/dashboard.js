import React, {Fragment, useState, useContext} from 'react';
import {TasksContext} from '../context/tasksContext';
import Calendar from '../components/calendar/calendar';
import Planner from '../components/planner/planner';
import ProgressContainer from '../containers/progressContainer';
import GoalButton from '../components/goal/goalButton';
import ProjectButton from '../components/project/projectButton';
import GoalModal from '../components/goal/goalModal';
import ProjectModal from '../components/project/projectModal';
import EditGoalModal from '../components/goal/editGoalModal';
import EditProjectModal from '../components/project/editProjectModal';
import {Sidebar, Segment, Grid, Container, Item} from 'semantic-ui-react';
import TaskFilter from '../components/task/taskFilter';

const Dashboard = ({notes, setNotes, goals, setGoals, projects, setProjects, user, planner}) => {
    const tasksContext = useContext(TasksContext);
    const {getTasksByDay} = tasksContext;

    //============== STATE VARIABLES ===================//
    const [visible, setVisible] = useState(false);
    const [dimmed, setDimmed] = useState(false);
    const [day, setDay] = useState(0);
    const [currentNote, setCurrentNote] = useState(null);
    const [goalModalOpen, setGoalModalOpen] = useState(false);
    const [projModalOpen, setProjModalOpen] = useState(false);
    const [editGoalModalOpen, setEditGoalModalOpen] = useState(false);
    const [editProjModalOpen, setEditProjModalOpen] = useState(false);
    const [currentGoal, setCurrentGoal] = useState({});
    const [currentProject, setCurrentProject] = useState({});

    //============== GOAL FUNCTIONS ===================//
    const addGoal = (goal) => {
        setGoals(goals => [...goals, goal])
    }

    const removeGoal = (goal) => {
        setGoals(goals => goals.filter(dGoal => dGoal.id !== goal.id))
    }

    const updateGoal = (goal) => {
        const updatedGoals = [...goals];
        const index = updatedGoals.findIndex(goalToUpdate => goalToUpdate.id === goal.id)
        updatedGoals[index] = goal;
        setGoals(updatedGoals);
    }

    //============== NOTE FUNCTIONS ===================//
    const addNote = (note) => {
        setNotes(notes => [...notes, note])
    }

    const getNote = (day) => {
        let noteId = notes.find(note => {
            const noteDate = note.date.slice(0,10).replace(/-/g, "");
            return noteDate === day
        }); 
    
        if (noteId){
            noteId = noteId.id
            const noteUrl = `http://localhost:3000/notes/${noteId}`;
            fetch(noteUrl)
            .then(res => res.json())
            .then(note => setCurrentNote(note));
        } else {
            setCurrentNote(null);
        }
    }

    //============== PROJECT FUNCTIONS ===================//
    const addProject = (project) => {
        setProjects(projects => [...projects, project])
    }

    const removeProject = (proj) => {
        setProjects(projs => projs.filter(dProj => dProj.id !== proj.id))
    }

    const updateProject = (project) => {
        const updatedProjects = [...projects];
        const index = updatedProjects.findIndex(projectToUpdate => projectToUpdate.id === project.id)
        updatedProjects[index] = project;
        setProjects(updatedProjects);
    }


    //============== EVENT FUNCTIONS (PLANNER) ===================//
    const handlePlanner = (day) => {
        setVisible(true);
        setDimmed(true);
        setDay(day);
        getTasksByDay(day);
        getNote(day);
    }

    const clickOffPlanner = (e) => {
        if ((visible && e.target.className === "ui segment pushable") || e.target.className === "pusher dimmed") {
            setVisible(false);
            setDimmed(false);
            setDay(0);
            setCurrentNote(null);
        }
    }

    //============== MODALS ===================//

    const handleGoalModalOpen = () => {
        setGoalModalOpen(true);
    }

    const handleGoalModalClose = () => {
        setGoalModalOpen(false);
    }

    const handleProjModalOpen = () => {
        setProjModalOpen(true);
    }

    const handleProjModalClose = () => {
        setProjModalOpen(false);
    }
    
    const handleEditProjModalOpen = () => {
        setEditProjModalOpen(true);
    }

    const handleEditProjModalClose = () => {
        setCurrentProject({});
        setEditProjModalOpen(false);
    }
    
    const handleEditGoalModalOpen = () => {
        setEditGoalModalOpen(true);
    }

    const handleEditGoalModalClose = () => {
        setCurrentGoal({});
        setEditGoalModalOpen(false);
    }

    //============== RENDERING FUNCTION ===================//
    return (
        <Fragment>
            <Sidebar.Pushable as={Segment} onClick={clickOffPlanner}>
                <Planner planner={planner} visible={visible} plannerDay={day} note={currentNote} setCurrentNote={setCurrentNote} addNote={addNote}/>
                <Sidebar.Pusher dimmed={dimmed && visible}>
                    <Grid columns={2}>
                        <Grid.Row stretched>

                            <Grid.Column width={12}>
                                
                                <Container style={{width: "90%"}}>
                                    <Segment basic>
                                        <Grid.Row>
                                            <Item.Group>
                                                <Item>
                                                    <Item.Content verticalAlign="bottom">
                                                            <Segment floated="left">
                                                                <TaskFilter />
                                                            </Segment>
                                                            <GoalButton handleClick={handleGoalModalOpen} />
                                                            <ProjectButton handleClick={handleProjModalOpen}/>
                                                            <GoalModal user={user} handleClose={handleGoalModalClose} modalOpen={goalModalOpen} addGoal={addGoal}/>
                                                            <ProjectModal user={user} handleClose={handleProjModalClose} modalOpen={projModalOpen} addProject={addProject} />
                                                            {Object.keys(currentGoal).length === 0 || <EditGoalModal user={user} handleClose={handleEditGoalModalClose} modalOpen={editGoalModalOpen} currentGoal={currentGoal} updateGoal={updateGoal}/>}
                                                            {Object.keys(currentProject).length === 0 || <EditProjectModal user={user} handleClose={handleEditProjModalClose} modalOpen={editProjModalOpen} currentProject={currentProject} updateProject={updateProject}/>}
                                                    </Item.Content>
                                                </Item>
                                            </Item.Group>
                                        </Grid.Row>

                                        <Calendar showDay={handlePlanner} />
                                    </Segment>
                                </Container>

                            </Grid.Column>

                            <Grid.Column width={4}>
                                <Segment>
                                    <ProgressContainer goals={goals} projects={projects} removeGoal={removeGoal} removeProject={removeProject} handleProjClick={handleProjModalOpen} handleGoalClick={handleGoalModalOpen} handleEditProjClick={handleEditProjModalOpen} handleEditGoalClick={handleEditGoalModalOpen} setCurrentGoal={setCurrentGoal} setCurrentProject={setCurrentProject}/>
                                </Segment>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Fragment>
    )
}

export default Dashboard;
