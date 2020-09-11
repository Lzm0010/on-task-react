import React, {useState, useContext} from 'react';
import {TasksContext} from '../../context/tasksContext';
import {useInput} from '../../hooks/useInput';
import {useSelect} from '../../hooks/useSelect';
import DatePicker from 'react-datepicker';
import {Form, Modal, Select, Button, Divider, Input} from 'semantic-ui-react';


const EditGoalModal = ({user, modalOpen, handleClose, updateGoal, currentGoal}) => {
    const tasksContext = useContext(TasksContext);
    const {addTask, removeTask} = tasksContext;

    const {value:name, bind:bindName} = useInput(currentGoal.name);
    const {value:goalType, bind:bindGoalType} = useSelect(currentGoal.goal_type);
    const [startDate, setStartDate] = useState(new Date(currentGoal.start_date));
    const [endDate, setEndDate] = useState(new Date(currentGoal.end_date));
    const {value:goalTotalDays, bind:bindGoalTotalDays} = useInput(currentGoal.goal_total_days);
    const {value:goalPercentage, bind:bindGoalPercentage} = useInput(currentGoal.goal_percentage);
    const {value:frequency, bind:bindFrequency} = useSelect(currentGoal.frequency);

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

    const editGoal = () => {
        currentGoal.tasks.forEach(task => {
            removeTask(task)
        });
        const goalUrl = `https://thawing-retreat-85272.herokuapp.com/goals/${currentGoal.id}`;
        const token = localStorage.getItem('token')
        const goalObj = {
            'method': 'PATCH',
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
                goal_percentage: goalPercentage,
                frequency,
                user_id: user.id
            })
        };
        fetch(goalUrl, goalObj)
        .then(res => res.json())
        .then(goal => {
            updateGoal(goal);
            goal.tasks.forEach(task => addTask(task));
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        editGoal();
        handleClose();
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

export default EditGoalModal;