import React, { Component } from 'react';
import { Form, Icon, Input, Button, Radio, Row, Col } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class InputForm extends Component {

  state = {
    nonTerminal: '',
    terminal: '',
    nonTerminalList: [],
    terminalList: []
  };


  componentDidMount() {
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.

    const nonTerminals = isFieldTouched('nonTerminals') && getFieldError('nonTerminals');
    const nonTerminal = isFieldTouched('nonTerminal') && getFieldError('nonTerminal');
    const terminals = isFieldTouched('Terminals') && getFieldError('Terminals');


    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>

        <Form onSubmit={this.handleSubmit}>

          <h4>Allow empty sentences</h4>
          <RadioGroup name="radiogroup" defaultValue={'Yes'}>
            <Radio value={'Yes'}>Yes</Radio>
            <Radio value={'No'}>No</Radio>
          </RadioGroup>
          <FormItem
            validateStatus={nonTerminals ? 'error' : ''}
            help={nonTerminals || ''}>

            <Row>
              <Col md='5'>
                {getFieldDecorator('nonTerminal', {
                  rules: [{ required: true, message: 'Please input your a non-terminal!' }],
                })(
                  <Input
                    prefix={<Icon type="pushpin-o" />}

                    placeholder="non-terminal" />
                )}
              </Col>
              <Col md='5'>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  Add
            </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
        
        {/* <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
          </Button>
          </FormItem>
        </Form> */}
      </div>
    );
  }
}


const GrammarForm = Form.create()(InputForm)
export default GrammarForm;