import React, {useState} from 'react';
import {useInput} from '../hooks/useInput';
import {useSelect} from '../hooks/useSelect';
import DatePicker from 'react-datepicker';
import {Form, Modal, Select, Button, Divider, Input} from 'semantic-ui-react';


const GoalModal = ({modalOpen, handleClose, addGoal}) => {
    const {value:name, bind:bindName, reset:resetName} = useInput("");
    const {value:goalType, bind:bindGoalType, reset:resetGoalType} = useSelect("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const {value:goalTotalDays, bind:bindGoalTotalDays, reset:resetGoalTotalDays} = useInput("");
    const {value:goalPercentage, bind:bindGoalPercentage, reset:resetGoalPercentage} = useInput("");
    const {value:frequency, bind:bindFrequency, reset:resetFrequency} = useSelect("");

    const typeOptions = [
        {key:'total', value:'total', text: 'Total'},
        {key:'percentage', value:'percentage', text: 'Percentage'},
    ];

    const freqOptions = [
        {key:'daily', value:'daily', text: 'Daily'},
        {key:'eoday', value:'eoday', text: 'Every other day'},
        {key:'weekly', value:'weekly', text: 'Weekly'},
        {key:'biweekly', value:'biweekly', text: 'Bi-weekly'},
        {key:'monthly', value:'monthly', text: 'Monthly'},
        {key:'bimonthly', value:'bimonthly', text: 'Bi-Monthly'}
    ];

    const newGoal = () => {
        const goalUrl = `http://localhost:3000/goals`;
        const goalObj = {
            'method': 'POST',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({
                name, 
                goal_type: goalType,
                start_date: startDate,
                end_date: endDate,
                goal_total_days: goalTotalDays,
                goal_percentage: goalPercentage,
                frequency,
                user_id: 1
            })
        };
        fetch(goalUrl, goalObj)
        .then(res => res.json())
        .then(goal => {
            addGoal(goal);
            // addTask(task)
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        newGoal();
        handleClose();
        resetName();
        resetGoalType();
        resetGoalTotalDays();
        resetGoalPercentage();
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

                    <Form.Group widths="equal">

                        {(goalType === "total" ? <Form.Input required label="Total" placeholder="Total number of days you want to complete the goal.." {...bindGoalTotalDays} /> : null)}
                        {(goalType === "percentage" ? <Form.Input required label="Percentage" placeholder="Percentage of days to complete over this time span.." {...bindGoalPercentage} /> : null)}
                        <Form.Field
                            control={Select}
                            label="Frequency"
                            placeholder="Select how often you want to accomplish this goal.." 
                            options={freqOptions}
                            required 
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