import React, { Component } from 'react';
import { Form, Icon, Input, Radio, Row, Col, Tag } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Search, TextArea } = Input;

class InputForm extends Component {

  state = {
    nonTerminal: '',
    terminal: '',
    nonTerminalList: [],
    terminalList: []
  };


  componentDidMount() {
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }

  //NonTerminal
  addNonTerminal = (nt) => {
    if (nt !== undefined && nt !== null && nt !== '') {
      let alreadyContains = this.state.nonTerminalList.indexOf(nt) > -1;
      if (!alreadyContains) {
        this.setState({
          nonTerminalList: [...this.state.nonTerminalList, nt]
        });
      }
    }
    this.setState({
      nonTerminal: ''
    });
  }

  delNonTerminal = (index) => {
    let newList = this.state.nonTerminalList;
    let nt = newList.splice(index, 1);
    this.setState({
      nonTerminalList: newList,
      nonTerminal: nt
    });
  }

  nonTerminalOnChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (!/[^a-zA-Z]/.test(value)) {
      this.setState({
        nonTerminal: value.charAt(value.length - 1).toUpperCase()
      });
    }
  }

  //Terminal
  addTerminal = (t) => {
    if (t !== undefined && t !== null && t !== '') {
      let alreadyContains = this.state.terminalList.indexOf(t) > -1;
      if (!alreadyContains) {
        this.setState({
          terminalList: [...this.state.terminalList, t]
        });
      }
    }
    this.setState({
      terminal: ''
    });
  }

  delTerminal = (index) => {
    let newList = this.state.terminalList;
    let t = newList.splice(index, 1);
    this.setState({
      terminalList: newList,
      terminal: t
    });
  }

  terminalOnChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (!/[^a-zA-Z]/.test(value)) {
      this.setState({
        terminal: value.charAt(value.length - 1).toLowerCase()
      });
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <h4>Allow empty sentences</h4>
            <RadioGroup name="radiogroup" defaultValue={'Yes'}>
              <Radio value={'Yes'}>Yes</Radio>
              <Radio value={'No'}>No</Radio>
            </RadioGroup>
            <Row style={{ minHeight: 90 }}>
              <Col md={12}>
                <Search
                  prefix={<Icon type="tag-o" />}
                  placeholder="non-terminal"
                  enterButton="Add"
                  style={{ width: 200, marginTop: 40 }}
                  value={this.state.nonTerminal}
                  onChange={this.nonTerminalOnChange}
                  onSearch={this.addNonTerminal} />
              </Col>
              <Col md={12}>
                {
                  this.state.nonTerminalList.length > 0 &&
                  <h5>Non-Terminals:</h5>
                }
                {this.state.nonTerminalList.map((nt, index) =>
                  <Tag
                    key={index}
                    color="red"
                    onClick={() => this.delNonTerminal(index)}
                    name={index}>
                    {nt}
                  </Tag>)}
              </Col>
            </Row>
            <Row style={{ minHeight: 90 }}>
              <Col md={12}>
                <Search
                  prefix={<Icon type="tag-o" />}
                  placeholder="terminal"
                  enterButton="Add"
                  style={{ width: 200, marginTop: 40 }}
                  value={this.state.terminal}
                  onChange={this.terminalOnChange}
                  onSearch={this.addTerminal} />
              </Col>
              <Col md={12}>
                {
                  this.state.terminalList.length > 0 &&
                  <h5>Terminals:</h5>
                }
                {this.state.terminalList.map((t, index) =>
                  <Tag
                    key={index}
                    color="green"
                    onClick={() => this.delTerminal(index)}
                    name={index}>
                    {t}
                  </Tag>)}
              </Col>
            </Row>
            {
              this.state.terminalList.length > 0 &&
              this.state.nonTerminalList.length > 0 &&
              <div>
                <Row type="flex" justify="center" align="middle">
                  <Col span={12}>
                    <h4>Productions:</h4>
                    <TextArea />
                  </Col>
                </Row>
                <Row type="flex" justify="center" align="middle">
                  <Col span={12}>
                    <h4>Grammar:</h4>
                    <TextArea
                      disabled />
                  </Col>
                </Row>
              </div>
            }
          </FormItem>
        </Form>
      </div >
    );
  }
}


const GrammarForm = Form.create()(InputForm)
export default GrammarForm;