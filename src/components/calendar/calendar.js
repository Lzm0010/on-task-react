import React, {useState, Fragment} from 'react';
import Month from './month';
import monthArray from '../../data/calendarData';
import {Menu, Segment} from 'semantic-ui-react';


const Calendar = ({showDay, projects}) => {
    const [today] = useState(new Date());
    const getCurrentMonth = () => (monthArray[today.getMonth()]);
    const [activePage, setActivePage] = useState(getCurrentMonth().month);
    

    const displayCalendar = () => {
        const currentMonth = monthArray.find(month => month.month === activePage);
        const monthId = monthArray.findIndex(month => month.month === activePage) + 1;
        return <Month month={currentMonth.month} monthId={monthId} numberOfDays={currentMonth.numberOfDays} offset={currentMonth.offset} showDay={showDay} projects={projects}/> 
    }

    const displayMenuItems = () => (
        monthArray.map(month => <Menu.Item key={month.abbr} name={month.month} active={activePage === `${month.month}`} onClick={handleClick}>{month.abbr}</Menu.Item>)
    )

    const handleClick = (e, {name}) => {
        setActivePage(name)
    }

    return (
        <Fragment>
            {displayCalendar()}
            <Segment style={{textAlign: "center"}}>
                <Menu color="teal" widths={12}>
                    {displayMenuItems()}
                </Menu>    
            </Segment>
        </Fragment>
    )
}

export default Calendar;