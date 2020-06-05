import React, {useState, Fragment} from 'react';
import Month from './month';
import monthArray from '../../data/calendarData';
import {Pagination, Segment} from 'semantic-ui-react';


const Calendar = ({showDay, tasks}) => {
    const [today] = useState(new Date());
    const getCurrentMonth = () => (String(today.getMonth() + 1));
    const [activePage, setActivePage] = useState(getCurrentMonth());
    

    const displayCalendar = () => {
        const currentMonth = monthArray[activePage - 1];
        return <Month month={currentMonth.month} monthId={activePage} numberOfDays={currentMonth.numberOfDays} offset={currentMonth.offset} showDay={showDay} tasks={tasks}/> 
    }

    const handlePaginationChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage)
    }

    return (
        <Fragment>
            {displayCalendar()}
            <Segment style={{textAlign: "center"}}>
                <Pagination
                    activePage={activePage}
                    onPageChange={handlePaginationChange}
                    totalPages={12}
                    ellipsisItem={null}
                />
            </Segment>
        </Fragment>
    )
}

export default Calendar;