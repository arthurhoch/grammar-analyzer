import React, { Component, Fragment } from 'react';
import { Button, Form, Icon, Input, Row, Col, Tag, Select, Card } from 'antd';

import './GrammarForm.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { Search } = Input;

class InputForm extends Component {

  state = {
    nonTerminal: '',
    terminal: '',
    nonTerminalList: [],
    terminalList: [],
    productionsList: [],
    production: {
      nonTerminal: '',
      terminalsList: []
    }
  };

  componentDidMount() {
    this.props.handleProductionsChange(this.state.productionsList);
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

  terminalListOnChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (!/[^a-zA-Z]/.test(value)) {
      this.setState({
        nonTerminal: value.charAt(value.length - 1).toUpperCase()
      });
    }
  }

  createNewProduction = () => {
    this.setState({
      productionsList: [...this.state.productionsList, { terminalsList: [] }]
    })

    this.props.handleProductionsChange(this.state.productionsList);
  }

  delProduction = (index) => {
    let productionsList = this.state.productionsList;

    this.setState({
      productionsList: productionsList
    });

    this.props.handleProductionsChange(this.state.productionsList);
  }

  setNonTerminalProduction = (value, options) => {
    let row = options.props.row;
    let productionsList = this.state.productionsList;
    productionsList[row].nonTerminal = value;
    this.setState({
      productionsList: productionsList
    });

    this.props.handleProductionsChange(this.state.productionsList);
  }

  createNewTerminalProduction = (index) => {
    let productionsList = this.state.productionsList;

    productionsList[index].terminalsList.push('');
    this.setState({
      productionsList: productionsList
    });

    this.props.handleProductionsChange(this.state.productionsList);
  }

  onSentenceChange = (e, index, indexTerminal) => {
    let value = e.target.value;
    let char = value.slice(-1);

    let containsTerminal = this.state.terminalList.indexOf(char) > -1;
    let containsNonTerminal = this.state.nonTerminalList.indexOf(char) > -1;

    if (!/[^a-zA-Z]/.test(value) && (containsTerminal || containsNonTerminal)) {
      let productionsList = this.state.productionsList;
      productionsList[index].terminalsList[indexTerminal] = value;

      this.setState({
        productionsList: productionsList
      });
    }

    this.props.handleProductionsChange(this.state.productionsList);
  }

  delSentence = (index, indexTerminal) => {
    let productions = this.state.productionsList;
    let terminalsList = productions[index].terminalsList;
    terminalsList.splice(indexTerminal, 1);

    this.setState({
      productionsList: productions
    });

    this.props.handleProductionsChange(this.state.productionsList);
  }

  terminalProductionOnChange = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          <Row>
            <Col md={12}>
              <Card
                className="text-left"
                title={<b>Non-terminals</b>}
                extra={
                  <Fragment>
                    <Search
                      prefix={<Icon type="tag-o" />}
                      placeholder="non-terminal"
                      enterButton="Add"
                      value={this.state.nonTerminal}
                      onChange={this.nonTerminalOnChange}
                      onSearch={this.addNonTerminal} />
                  </Fragment>
                }
              >
                <Row>
                  <Col md={24} className="text-center">
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
              </Card>
            </Col>
            <Col md={12}>
              <Card
                className="text-left"
                title={<b>Terminals</b>}
                extra={
                  <Fragment>
                    <Search
                      prefix={<Icon type="tag-o" />}
                      placeholder="terminal"
                      enterButton="Add"
                      value={this.state.terminal}
                      onChange={this.terminalOnChange}
                      onSearch={this.addTerminal} />
                  </Fragment>
                }
              >
                <Row>
                  <Col md={24} className="text-center">
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
              </Card>
            </Col>
          </Row>
          <Card
            className="text-left"
            title={<b>Productions</b>}
            extra={
              <Button
                type="primary"
                onClick={this.createNewProduction}
              >
                Add production
                </Button>
            }
          >
            {this.state.productionsList.map((production, index) =>
              <Card
                key={index}
                className="production-card text-left"
                title={"Production " + (index + 1)}
                extra={
                  <Fragment>
                    <Button
                      type="primary"
                      onClick={() => this.createNewTerminalProduction(index)}>
                      Add sentence
                      </Button>
                    <Button
                      type="danger"
                      onClick={() => this.delProduction(index)}>
                      Remove Production
                      </Button>
                  </Fragment>
                }
              >
                <Col md={8}>
                  <Select
                    showSearch
                    className="select-non-terminal"
                    placeholder="Select a non-terminal"
                    optionFilterProp="children"
                    value={this.state.productionsList[index].nonTerminal}
                    onSelect={this.setNonTerminalProduction}
                    filterOption={(input, option) => option.props.children.toUpperCase().indexOf(input.toUpperCase()) >= 0}
                  >
                    {this.state.nonTerminalList.map((nt, indexNonterminal) =>
                      <Option
                        value={nt}
                        row={index}
                        key={indexNonterminal}
                      >
                        {nt}
                      </Option>
                    )}
                  </Select>
                </Col>
                <Col md={2} className="text-center">
                  <Icon type="arrow-right" style={{ fontSize: 20, marginTop: 5 }} />
                </Col>
                <Col md={12}>
                  {this.state.productionsList[index].terminalsList.map((terminal, indexTerminal) =>
                    <Row key={indexTerminal}>
                      <Col md={18}>
                        <Input
                          key={indexTerminal}
                          value={this.state.productionsList[index].terminalsList[indexTerminal]}
                          onChange={e => this.onSentenceChange(e, index, indexTerminal)}
                          placeholder="Sentence"
                        />
                      </Col>
                      <Col md={6}>
                        <Button
                          type="danger"
                          onClick={() => this.delSentence(index, indexTerminal)}>
                          Del sentence
                          </Button>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Card>
            )}
          </Card>
        </FormItem>
      </Form>
    );
  }
}

const GrammarForm = Form.create()(InputForm)
export default GrammarForm;