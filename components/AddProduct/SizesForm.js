import {BsTrash} from 'react-icons/bs'
import {GrFormAdd} from 'react-icons/gr'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState} from 'react';

const SizesForm = props => {
    const [selectedUniSize, setSelectedUnisize] = useState(false)
    
    const addUniSize = () => {
        setSelectedUnisize(prevState => {return !prevState})
        const data = [...props.sizesList]
        props.onAddSize([data[0]])
    }

    const deleteSize = (event) => {
        if(event.target.name){
            const id = event.target.name.split('-')[1]
            let data = [...props.sizesList]
            data = data.filter((item,index) => index !== +id)
            console.log(data)
            props.onAddSize(data)
        }
    }

    const addNewBlankSize = () => {
        props.onAddSize(prevState => {
            return [...prevState,{size:'',quantity:''}]
        })
    }

    const updateSize = (event) => {
        console.log(event)
        const [field,index] = event.target.id.split('-')
        let data = [...props.sizesList]
        data[index][field] = event.target.value
        props.onAddSize(data)
    }

    return(
        <div className='my-3'>
            <label>Sizes</label>
            {props.sizesList.map((item,index) => {
            return <Row key={index}>
                <Col>
                    <FloatingLabel className="mb-3" controlId={'size-' + index} label='Size'>
                        <Form.Control type="text" placeholder="Enter size" value={item.size} onChange={updateSize} required/>
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel className="mb-3" controlId={'quantity-' + index} label='Quantity'>
                        <Form.Control type="number" min='0' step='1' placeholder="Enter quantity" value={item.quantity} onChange={updateSize} required/>
                    </FloatingLabel>
                </Col>
                {index !== 0 && <Col style={{maxWidth:'fit-content'}}>
                    <Button variant='danger' style={{height:'58px'}} name={'deleteSize-' + index} onClick={deleteSize}><BsTrash /></Button>
                </Col>}
            </Row>
            })}

            <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                <Form.Check type="checkbox" label="Unisize" onChange={addUniSize}/>
                {!selectedUniSize && <Button variant="outline-dark" onClick={addNewBlankSize}><GrFormAdd size='1.2rem' /> Add new size</Button>}
            </Form.Group>
            
        </div>
    )
}

export default SizesForm