import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

const CustomTextArea = ({
  postData: { text },
  onInputChange,
  onHandleSubmit,
}) => (
  <Form size="large">
    <Segment stacked>
    <Form.TextArea
        fluid="true"
        placeholder="Write a post"
        value={text}
        name="text"
        onChange={(e) => onInputChange(e)}
      />

      <Button color="blue" fluid size="large" onClick={async () => await onHandleSubmit()}>
       Post
      </Button>
    </Segment>
  </Form>
);

export default CustomTextArea;
