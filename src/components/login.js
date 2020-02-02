import React, { Component } from "react";
import {
  Form,
  Button,
  Container,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
  FormText
} from "reactstrap";
import "./Login.css";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validate: {
        emailState: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }
  submitForm() {
    console.log("Entrou Submit Form");
    fetch("http://localhost:4000/auth/login", {
      method: "post",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(this.state)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        sessionStorage.setItem('token', data.token);
      })
      .catch(console.log);
      if(sessionStorage.getItem('token')){
        this.props.history.push("/allusers");
      }
  }
  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <Container className="AppLogin">
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={email}
                valid={this.state.validate.emailState === "has-success"}
                invalid={this.state.validate.emailState === "has-danger"}
                onChange={e => {
                  this.validateEmail(e);
                  this.handleChange(e);
                }}
              />
              <FormFeedback valid>
                That's a tasty looking email you've got there.
              </FormFeedback>
              <FormFeedback>
                Uh oh! Looks like there is an issue with your email. Please
                input a correct email.
              </FormFeedback>
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={password}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
          </Col>
          <Button onClick={() => this.submitForm()}>Submit</Button>
        </Form>
      </Container>
    );
  }

}
export default withRouter(Login);

