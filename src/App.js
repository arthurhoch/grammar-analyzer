import React, { Component, Fragment } from 'react';
import './App.css';
import { Row, Col, Card } from 'antd'


import GrammarForm from './modules/grammar-form/GrammarForm'

import GlcGrAnalyzer from './modules/helpers/glc-gr-analyzer/GlcGrAnalyzer'
import SentenceGenerator from './modules/helpers/sentence-generator/SentenceGenerator'
import ValidityAnalyzer from './modules/helpers/validity-analyzer/ValidityAnalyzer'
import Productions from './modules/helpers/productions/Productions'

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
          <Row>
            <Col>
              <Card style={{ background: '#ECECEC', padding: '30px' }} title="Input" bordered={false}>
                <GrammarForm handleProductionsChange={this.handleProductionsChange} />
              </Card>
            </Col>
          </Row>

          <Row style={{ background: '#ECECEC', padding: '30px' }} gutter={16}>
            <Col md={12} offset={6} style={{ padding: 10 }}>
              <Productions productionsList={this.state.productions} />
            </Col>
          </Row>

          <Card style={{ background: '#ECECEC', padding: '30px' }} title="Result" bordered={false}>
            <Row style={{ background: '#ECECEC', padding: '30px' }} gutter={16}>
              <Col md={24} style={{ padding: 10 }}>
                <Card title="GLC GR Analyzer" bordered={false}>
                  <GlcGrAnalyzer />
                </Card>
              </Col>
              <Col md={24} style={{ padding: 10 }}>
                <Card title="Sentence Generator" bordered={false}>
                  <SentenceGenerator />
                </Card>
              </Col>
              <Col md={24} style={{ padding: 10 }}>
                <Card title="Validity Analyzer" bordered={false}>
                  <ValidityAnalyzer />
                </Card>
              </Col>
            </Row>
          </Card>
      </div>
    );
  }
}

export default App;
