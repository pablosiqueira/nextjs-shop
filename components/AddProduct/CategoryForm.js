import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const CategoryForm = (props) => {
    return(
        <>
                <FloatingLabel className="mb-3" controlId="floatingSelect" label="Category">
                    <Form.Select required defaultValue={props.category} onChange={props.onInputCategory}>
                        <option value="" defaultValue></option>
                        <option value="shoes">Shoes</option>
                        <option value="shirts">Shirts</option>
                        <option value="shorts">Shorts</option>
                        <option value="jackets">Jackets</option>
                        <option value="acessories">Acessories</option>
                        <option value="other">Other</option>
                    </Form.Select>
                </FloatingLabel>
        </>
    )
}

export default CategoryForm