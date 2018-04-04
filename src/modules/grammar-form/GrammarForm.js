import React, { Component } from 'react';
import { Form, Icon, Input, Button, Radio, Row, Col, Tag } from 'antd';

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
        console.log(values);
      }
    });
  }

  addNonTerminal = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        let alreadyContains = false;

        this.state.nonTerminalList.map((nt) => {
          if (values.nonTerminal.toUpperCase().indexOf(nt) != -1) {
            alreadyContains = true;
          }
        });

        if (!alreadyContains) {
          this.setState({ nonTerminalList: [...this.state.nonTerminalList, values.nonTerminal.toUpperCase()] });
        }

      }
    });
  }

  delNonTerminal = (index) => {
    let newList = this.state.nonTerminalList;
    newList.splice(index, 1);
    this.setState({ nonTerminalList: newList })
  }

  handleNonTerminal = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    const { setFieldsValue } = this.props.form
    let nonTerminalVar = getFieldValue('nonTerminal');



    if (/[^a-zA-Z]/.test(nonTerminalVar)) {
      callback('Non-terminal cannot contais numbers or special characters!')
    } else {
      if (nonTerminalVar !== undefined) {

        if (nonTerminalVar.length > 0) {
          nonTerminalVar = nonTerminalVar.charAt(0);
        }

        setFieldsValue({
          nonTerminal: nonTerminalVar.toUpperCase(),
        });
      }
    }

    callback()
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.

    const nonTerminals = isFieldTouched('nonTerminals') && getFieldError('nonTerminals');
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
          <FormItem>
            <Row>
              <Col md={5}>
                <FormItem>
                  {getFieldDecorator('nonTerminal', {
                    rules: [{ validator: this.handleNonTerminal }],
                  })(
                    <Input
                      prefix={<Icon type="pushpin-o" />}
                      onChange={this.handleValueChange}
                      placeholder="non-terminal" />
                  )}
                </FormItem>
              </Col>
              <Col md={2}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.addNonTerminal}
                  disabled={hasErrors(getFieldsError())}>
                  Add
                </Button>
              </Col>
              <Col md={5}>
                {this.state.nonTerminalList.map((nt, index) =>
                  <Tag
                    key={index}
                    color="magenta"
                    onClick={() => this.delNonTerminal(index)}
                    name={index}>
                    {nt}
                  </Tag>)}
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
      </div >
    );
  }
}


const GrammarForm = Form.create()(InputForm)
export default GrammarForm;