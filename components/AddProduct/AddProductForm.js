import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useRef } from 'react';
import SizesForm from './SizesForm';
import ImageForm from './ImageForm';
import CategoryForm from './CategoryForm';
import MessageModal from '../UI/MessageModal';

const AddProductForm = props => {
    const [name,setName] = useState(props.product ? props.product.name : '')
    const nameInputHandler = (event) => {
        setName(event.target.value)
    }

    const imageRef = useRef()
    const [image,setImage] = useState(props.product ? props.product.image : '')
    const imageInputHandler = (event) => {
        setImage(event.target.value)
        setImgError(false)
    }

    const [imgError, setImgError] = useState(false)

    const [priceFull,setPriceFull] = useState(props.product ? props.product.priceFull : '')
    const priceFullInputHandler = (event) => {
        setPriceFull(event.target.value)
    }

    const [priceDisc,setPriceDisc] = useState(props.product ? props.product.priceCurrent : '')
    const priceDiscInputHandler = (event) => {
        setPriceDisc(event.target.value)
    }

    const [brand,setBrand] = useState(props.product ? props.product.brand : '')
    const brandInputHandler = (event) => {
        setBrand(event.target.value.toLowerCase())
    }

    const [sport,setSport] = useState(props.product ? props.product.sport : '')
    const sportInputHandler = (event) => {
        setSport(event.target.value.toLowerCase())
    }

    const [color,setColor] = useState(props.product ? props.product.color : '')
    const colorInputHandler = (event) => {
        setColor(event.target.value.split(','))
    }

    const [gender,setGender] = useState(props.product ? props.product.gender : '')
    const genderInputHandler = (event) => {
        setGender(event.target.value)
    }

    const [sizes,setSizes] = useState(props.product ? props.product.sizes : [{size:'',quantity:''}])
    const sizesInputHandler = (list) => {
        setSizes(list)
    }
    
    const [category, setCategory] = useState(props.product ? props.product.category : '')
    const categoryInputHandler = (event) => {
        setCategory(event.target.value)
    }

    const [modalShow, setModalShow] = useState(false);

    const clearInputs = () => {
        setName('')
        setPriceFull('')
        setPriceDisc('')
        setBrand('')
        setSport('')
        setColor('')
        setGender('')
        setSizes([{size:'',quantity:''}])
        setImage('')
        setCategory('')
    }

    const submitForm = (event) => {
        event.preventDefault()
        if(imgError){
            imageRef.current.focus()
        }else{
            const date = new Date()
            //const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()

            const data = {
                name,
                image,
                price: {full: priceFull, current: priceDisc},
                brand,
                sport,
                color,
                gender,
                category,
                sizes,
                date
            }
            console.log(data)
            if(props.mode === 'add'){
                props.onAddProduct(data)
                clearInputs()
                event.target.reset()
            }else if(props.mode === 'edit'){
                props.onEditProduct(data)
            }
            setModalShow(true)
            setTimeout(()=>{setModalShow(false)}, 3000);
        }
        
    }

    return(
        <Form className='d-block mx-auto' onSubmit={submitForm} style={{maxWidth:'500px'}}>

        <FloatingLabel className="mb-3" controlId="name" label='Name'>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={nameInputHandler} required />
        </FloatingLabel>

        <ImageForm imageRef={imageRef} onInputImage={imageInputHandler} imgUrl={image} errorHandler={setImgError} imgError={imgError}/>

        <FloatingLabel className="mb-3" controlId="price" label='Full Price (US$)'>
            <Form.Control type="number" min='0' step='0.01' placeholder="US$ 0.00" value={priceFull} onChange={priceFullInputHandler} required/>
        </FloatingLabel>

        <FloatingLabel className="mb-3" controlId="price" label='Discount Price(US$)'>
            <Form.Control type="number" min='0' step='0.01' placeholder="US$ 0.00" value={priceDisc} onChange={priceDiscInputHandler} required/>
        </FloatingLabel>

        <FloatingLabel className="mb-3" controlId="brand" label='Brand'>
            <Form.Control type="text" placeholder="Enter product brand" value={brand} onChange={brandInputHandler} required/>
        </FloatingLabel>

        <FloatingLabel className="mb-3" controlId="sport" label='Sport'>
            <Form.Control type="text" placeholder="Enter sport" value={sport} onChange={sportInputHandler} required/>
        </FloatingLabel>

        <FloatingLabel className="mb-3" controlId="colors" label='Colors - Ex:(color 1, color 2,...)'>
            <Form.Control type="text" placeholder="Enter colors Ex:(color 1, color 2,...)" value={color} onChange={colorInputHandler} required/>
        </FloatingLabel>

        <FloatingLabel className="mb-3" controlId="floatingSelect" label="Gender">
            <Form.Select required defaultValue={gender} onChange={genderInputHandler}>
                <option value=""></option>
                <option value="unisex">Unisex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </Form.Select>
        </FloatingLabel>



        <CategoryForm onInputCategory={categoryInputHandler} category={category}/>

        <SizesForm sizesList={sizes} onAddSize={sizesInputHandler}/>

        <div className='d-grid'>
            <Button variant="dark" type="submit" className='my-4'>Submit</Button>
        </div>

        <MessageModal show={modalShow} onHide={() => setModalShow(false)} message={props.modalMessage}/>
        
    </Form>
    )
}

export default AddProductForm