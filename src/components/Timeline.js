import { Button, Form } from "react-bootstrap"
import { useSelector } from "react-redux"

const Timeline = () => {

    const user = useSelector(state => state.userInfo.user)
    return(
        <div className="timeline">
            <h2>Hello, {user.first}</h2>
            <div className="form-container">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" rows={4} placeholder="Say something..." />
                        <Button>Submit</Button>
                    </Form.Group>
                </Form>
            </div>
            <h3>Timeline</h3>
        </div>
    )
}

export default Timeline