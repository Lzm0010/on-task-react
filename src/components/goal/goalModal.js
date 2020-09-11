import React, {useState, useContext} from 'react';
import {TasksContext} from '../../context/tasksContext';
import {useInput} from '../../hooks/useInput';
import {useSelect} from '../../hooks/useSelect';
import DatePicker from 'react-datepicker';
import {Form, Modal, Select, Button, Divider, Input, Grid, Segment} from 'semantic-ui-react';

const GoalModal = ({user, modalOpen, handleClose, addGoal}) => {
    const tasksContext = useContext(TasksContext);
    const {addTask} = tasksContext;

    const {value:name, bind:bindName, reset:resetName} = useInput("");
    const {value:goalType, bind:bindGoalType, reset:resetGoalType} = useSelect("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const {value:goalTotalDays, bind:bindGoalTotalDays, reset:resetGoalTotalDays} = useInput("");
    const {value:numerator, bind:bindNumerator, reset:resetNumerator} = useSelect("");
    const {value:denominator, bind:bindDenominator, reset:resetDenominator} = useSelect("");
    const {value:frequency, bind:bindFrequency, reset:resetFrequency} = useSelect("");

    const typeOptions = [
        {key:'total', value:'total', text: 'Total'},
        {key:'percentage', value:'percentage', text: 'Percentage'},
    ];

    const getNumOptionsForSelect = () => {
        const nums = [...Array(366).keys()];
        return nums.map(num => {
            num += 1;
            return {key: num, text: num, value: num};
        })
    };

    const numOptions = getNumOptionsForSelect();

    const freqOptions = [
        {key:'daily', value:'daily', text: 'Daily'},
        {key:'eoday', value:'eoday', text: 'Every other day'},
        {key:'weekly', value:'weekly', text: 'Weekly'},
        {key:'biweekly', value:'biweekly', text: 'Bi-weekly'},
        {key:'monthly', value:'monthly', text: 'Monthly'},
        {key:'bimonthly', value:'bimonthly', text: 'Bi-Monthly'}
    ];

    const newGoal = () => {
        const goalUrl = `https://thawing-retreat-85272.herokuapp.com/goals`;
        const token = localStorage.getItem('token')
        const goalObj = {
            'method': 'POST',
            'headers': {
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({
                name, 
                goal_type: goalType,
                start_date: startDate,
                end_date: endDate,
                goal_total_days: goalTotalDays,
                goal_percentage: numerator/denominator,
                frequency,
                user_id: user.id
            })
        };
        fetch(goalUrl, goalObj)
        .then(res => res.json())
        .then(goal => {
            addGoal(goal);
            goal.tasks.forEach(task => addTask(task));
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        newGoal();
        handleClose();
        resetName();
        resetGoalType();
        resetGoalTotalDays();
        resetNumerator();
        resetDenominator();
        resetFrequency();
        setStartDate(new Date());
        setEndDate(null);
    };

    return(
        <Modal
        centered={false}
        open={modalOpen}
        onClose={handleClose}
        >
            <Modal.Header>Add a Goal</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Group widths="equal">

                        <Form.Field
                            control={Input}
                            label="Goal" 
                            placeholder="Enter the goal you want to achieve..."
                            required 
                            {...bindName}
                        />

                        <Form.Field 
                            control={Select}
                            label="Goal Type"
                            placeholder="This is the type of goal that will be displayed on the calendar!"
                            required
                            options={typeOptions} 
                            {...bindGoalType}
                        />

                    </Form.Group>

                    <Form.Group widths='equal'>

                        <Form.Field required>
                            <label>Start Date</label>
                            <DatePicker 
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </Form.Field>

                        <Form.Field required>
                            <label>End Date</label>
                            <DatePicker 
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="Select end date.."
                            />
                        </Form.Field>

                    </Form.Group>

                    <Form.Group>

                        {goalType === "total" ? <Form.Input required width={8} label="Total" placeholder="Total number of days you want to complete the goal.." {...bindGoalTotalDays} /> : null}
                        {goalType === "percentage" ? (
                            // <Form.Input required label="Percentage" placeholder="Percentage of days to complete over this time span.." {...bindGoalPercentage} /> 
                            <Segment basic>
                                <Grid columns={2} relaxed="very">
                                    <Grid.Column>
                                        <Form.Select label="Days" placeholder="# of Days to Complete.." options={numOptions} {...bindNumerator}/> 
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Select label="Total Days" placeholder="..These Many Days" options={numOptions} {...bindDenominator}/> 
                                    </Grid.Column>
                                </Grid>
                                <Divider vertical>out of</Divider>
                            </Segment>
                            ) : null
                        }
                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            control={Select}
                            label="Frequency"
                            placeholder="Select how often you want to accomplish this goal.." 
                            options={freqOptions}
                            required 
                            width={8}
                            {...bindFrequency}
                        />
                    </Form.Group>
                        
                    <Divider hidden/>

                    <Button type='submit'>Submit</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )

}

export default GoalModal;