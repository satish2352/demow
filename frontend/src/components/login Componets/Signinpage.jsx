import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import userlogin_img from '../../assets/images/image.png';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

function Signinpage() {
    return (
        <>
            <Row className='justify-content-center align-items-center p-0 m-0 '>
                <Col lg={5}>
                    <div className='d-flex align-items-center justify-content-center mb-4'>
                        <Image src={userlogin_img} roundedCircle width={'150px'} />
                    </div>
                    <h3 className='text-center'>Sign Up</h3>
                    <Card >
                        <Card.Body>
                            <Container>
                                <Form>
                                    <Form.Group className="mb-3 " controlId="formGroupEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                    <div className='d-inline' style={{ float: "right" }} >
                                        <Link to='/'><Button variant="link" >Already Account </Button></Link>
                                        <Button variant="primary" >Sign Up</Button>
                                    </div>
                                </Form>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Signinpage
