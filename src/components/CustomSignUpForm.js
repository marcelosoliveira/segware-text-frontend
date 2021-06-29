import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

const SignUpForm = ({
  formData: { name, userName, password },
  onInputChange,
  onHandleSubmit,
}) => (
  <Form size="large">
    <Segment stacked>
    <Form.Input
        fluid
        placeholder="Name"
        value={name}
        name="name"
        onChange={(e) => onInputChange(e)}
      />
      <Form.Input
        fluid
        placeholder="Username"
        value={userName}
        name="username"
        onChange={(e) => onInputChange(e)}
      />
      <Form.Input
        fluid
        placeholder="Password"
        value={password}
        type="password"
        name="password"
        onChange={(e) => onInputChange(e)}
      />

      <Button color="blue" fluid size="large" onClick={async () => await onHandleSubmit()}>
        Register
      </Button>
    </Segment>
  </Form>
);

export default SignUpForm;
