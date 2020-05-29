import React, {useState} from 'react';
import Month from './month';
import monthArray from '../../data/calendarData';
import {Container, Pagination, Segment} from 'semantic-ui-react';
import GoalButton from '../goalButton';
import ProjectButton from '../projectButton';
import GoalModal from '../goalModal';

const Calendar = ({showDay, tasks}) => {
    const [today] = useState(new Date());
    const getCurrentMonth = () => (String(today.getMonth() + 1));
    const [activePage, setActivePage] = useState(getCurrentMonth());
    const [modalOpen, setModalOpen] = useState(false);

    const displayCalendar = () => {
        const currentMonth = monthArray[activePage - 1];
        return <Month month={currentMonth.month} monthId={activePage} numberOfDays={currentMonth.numberOfDays} offset={currentMonth.offset} showDay={showDay} tasks={tasks}/> 
    }

    const handlePaginationChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage)
    }

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    return (
        <Container style={{width: "90%"}}>
            <Segment textAlign="right">
                <GoalButton handleClick={handleModalOpen} />
                <ProjectButton />
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
            <GoalModal handleClose={handleModalClose} modalOpen={modalOpen}/>
        </Container>
    )
}

export default Calendar;