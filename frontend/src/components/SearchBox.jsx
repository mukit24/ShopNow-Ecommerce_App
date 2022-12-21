import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('yo')
        if(keyword){
            navigate(`/?keyword=${keyword}`)
        }else{
            navigate(location.pathname)
        }
    }

    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
            />
            <Button variant="outline-success" type='submit'>Search</Button>
        </Form>
    )
}

export default SearchBox