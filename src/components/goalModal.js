import React from 'react';
import {useInput} from '../hooks/useInput';
import {Form, Modal, Select} from 'semantic-ui-react';


const GoalModal = ({modalOpen, handleClose}) => {
    const {value:name, bind:bindName, reset:resetName} = useInput("");
    const {value:goalType, bind:bindGoalType, reset:resetGoalType} = useInput("");
    const {value:frequency, bind:bindFrequency, reset:resetFrequency} = useInput("");
    const {value:goalTotalDays, bind:bindGoalTotalDays, reset:resetGoalTotalDays} = useInput("");

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
    // t.string "name"
    // t.datetime "start_date"
    // t.datetime "end_date"
    // t.string "goal_type"
        //Total - description
        //Percentage - description
    // t.integer "goal_total_days" only if total
    // t.float "goal_percentage" only if percentage
    // t.bigint "user_id", null: false
    // t.string "frequency"
        //daily, weekly, biweekly, monthly, bimothly


    return(
        <Modal
        centered={false}
        open={modalOpen}
        onClose={handleClose}
        >
            <Modal.Header>Add a Goal</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Input label="Goal" placeholder="Enter the goal you want to achieve..." {...bindName}/>
                    <Select placeholder="Goal Type" options={typeOptions} {...bindGoalType}/>
                    <Select placeholder="Frequency" options={freqOptions} {...bindFrequency} />
                    {(goalType === "total" ? <Form.Input label="Total" placeholder="Total number of days you want to complete the goal.." {...bindGoalTotalDays} /> : null)}
                </Form>
            </Modal.Content>
        </Modal>
    )

}

export default GoalModal;