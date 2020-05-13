import React, {useState} from 'react';
import Month from './month';
import monthArray from '../../data/calendarData';
import {Container, Pagination, Segment} from 'semantic-ui-react';

const Calendar = ({showDay}) => {
    const [activePage, setActivePage] = useState(1)

    // const createCalendar = () => {
    //     return monthArray.map(month => <Month key={month.month} month={month.month} numberOfDays={month.numberOfDays} offset={month.offset}/>)
    // }

    const displayCalendar = () => {
        const currentMonth = monthArray[activePage - 1]
        return <Month month={currentMonth.month} numberOfDays={currentMonth.numberOfDays} offset={currentMonth.offset} showDay={showDay}/> 
    }

    const handlePaginationChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage)
    }

    return (
        <Container style={{width: "70%"}}>
            {displayCalendar()}
            <Segment style={{textAlign: "center"}}>
                <Pagination
                    activePage={activePage}
                    onPageChange={handlePaginationChange}
                    totalPages={12}
                    ellipsisItem={null}
                />
            </Segment>
        </Container>
    )
}

export default Calendar;