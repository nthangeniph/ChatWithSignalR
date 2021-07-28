import { Button, FormControl, InputGroup ,Form} from "react-bootstrap"
import {useState} from 'react'

const SendMessageForm = ({ sendMessage }) => {
    const [msg, setMsg] = useState();
    


    return <Form onSubmit={e => {
            e.preventDefault();
            sendMessage(msg)
            setMsg('')
    }
        
    }
        className='send-form'
    >
            <FormControl placeholder='message...'
                onChange={e => setMsg(e.target.value)}
            value={msg}
            style={{width:'100%'}}
            />
            <InputGroup.Append>
                <Button variant='primary' type='submit' disabled={!msg}>
                    Send
                </Button>
            </InputGroup.Append>
        </Form>
    
}

export default SendMessageForm;