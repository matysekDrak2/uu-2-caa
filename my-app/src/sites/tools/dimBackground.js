import {Modal} from "react-bootstrap";


function DimBackground({children, show}) {
    return (
        <Modal show={show} onHide={() => {}} centered >
            <div style={{margin: "20px"}}>
                {children}
            </div>
        </Modal>
    )
}

export default DimBackground