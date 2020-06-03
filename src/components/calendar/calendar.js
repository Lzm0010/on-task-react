import React, {useState} from 'react';
import Month from './month';
import monthArray from '../../data/calendarData';
import {Container, Pagination, Segment} from 'semantic-ui-react';
import GoalButton from '../goalButton';
import ProjectButton from '../projectButton';
import GoalModal from '../goalModal';
import ProjectModal from '../projectModal';

const Calendar = ({showDay, tasks, addTask, addProject, addGoal}) => {
    const [today] = useState(new Date());
    const getCurrentMonth = () => (String(today.getMonth() + 1));
    const [activePage, setActivePage] = useState(getCurrentMonth());
    const [goalModalOpen, setGoalModalOpen] = useState(false);
    const [projModalOpen, setProjModalOpen] = useState(false);

    const displayCalendar = () => {
        const currentMonth = monthArray[activePage - 1];
        return <Month month={currentMonth.month} monthId={activePage} numberOfDays={currentMonth.numberOfDays} offset={currentMonth.offset} showDay={showDay} tasks={tasks}/> 
    }

    const handlePaginationChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage)
    }

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

    return (
        <Container style={{width: "90%"}}>
            <Segment textAlign="right">
                <GoalButton handleClick={handleGoalModalOpen} />
                <ProjectButton handleClick={handleProjModalOpen}/>
            </Segment>
            {displayCalendar()}
            <Segment style={{textAlign: "center"}}>
                <Pagination
                    activePage={activePage}
                    onPageChange={handlePaginationChange}
                    totalPages={12}
                    ellipsisItem={null}
                />
            </Segment>
            <GoalModal handleClose={handleGoalModalClose} modalOpen={goalModalOpen} addGoal={addGoal}/>
            <ProjectModal handleClose={handleProjModalClose} modalOpen={projModalOpen} addTask={addTask} addProject={addProject}/>
        </Container>
    )
}

export default Calendar;