import Button from "react-bootstrap/Button";
import {ButtonGroup} from "react-bootstrap";
import DimBackground from "./dimBackground";

function ConfirmationDialog({parameters, show}) {
    return(
    <DimBackground show={show}>
        <p>{parameters.text}</p>
        <ButtonGroup>
            <Button onClick={parameters.onConfirm()} variant={parameters.confirmStyle}>Confirm</Button>
            <Button onClick={parameters.onCancel()} variant={parameters.cancelStyle}>Cancel</Button>
        </ButtonGroup>
    </DimBackground>
    )
}

export default ConfirmationDialog;