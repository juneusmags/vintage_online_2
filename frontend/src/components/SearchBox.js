import React, {useState} from 'react'
import { Button, Form} from'react-bootstrap'
import { withRouter } from 'react-router-dom'



const SearchBox = ({history}) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }
        else{
            history.push("/")
        }
    }
    return (
        <>
            <Form className = "d-flex" onSubmit = {submitHandler}>
                <Form.Control type = "text" name='q' onChange = {(e)=> setKeyword(e.target.value)} placeholder = "Search" className = "me-sm-2 ms-sm-5"> 
                </Form.Control>
                <Button type = "submit" variant = "outline-success" className = "p-2 ms-sm-2">Search</Button>
            </Form>
            
        </>
    )
}

export default withRouter(SearchBox)
