import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd'

import GrammarForm from './modules/grammar-form/GrammarForm'

import GlcGrAnalyzer from './modules/helpers/glc-gr-analyzer/GlcGrAnalyzer'
import Productions from './modules/helpers/productions/Productions'
import Grammar from './modules/helpers/grammar/Grammar'
class App extends Component {
  state = {
    productions: []
  }

  handleProductionsChange = (productions) => {
    this.setState({ productions });
  };

  render() {
    return (
      <div className="App">
          <Row style={{ background: '#ECECEC', padding: '30px' }} >
            <Col md={16}>
                <GrammarForm handleProductionsChange={this.handleProductionsChange} />
            </Col>
            <Col md={8}>
              <Row>
                <Col md={24}>
                  <GlcGrAnalyzer productionsList={this.state.productions} />
                </Col>  
                <Col md={24}>
                  <Productions productionsList={this.state.productions} />
                </Col>
                <Col md={24}>
                  <Grammar productionsList={this.state.productions} />
                </Col>
              </Row>
            </Col>
          </Row>
      </div>
    );
  }
}

export default App;
