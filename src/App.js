import React, { Component } from 'react';
import './App.css';
import { Row, Col, Card } from 'antd'


import GrammarForm from './modules/grammar-form/GrammarForm'

import GlcGrAnalyzer from './modules/helpers/glc-gr-analyzer/GlcGrAnalyzer'
import SentenceGenerator from './modules/helpers/sentence-generator/SentenceGenerator'
import ValidityAnalyzer from './modules/helpers/validity-analyzer/ValidityAnalyzer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div >

          <Row>
            <Col>
            <Card style={{ background: '#ECECEC', padding: '30px' }} title="Input" bordered={false}>
              <GrammarForm />
            </Card>
            </Col>
          </Row>

          <Row style={{ background: '#ECECEC', padding: '30px' }} gutter={16}>
            <Col span={8}>
              <Card title="GLC GR Analyzer" bordered={false}>
                <GlcGrAnalyzer />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Sentence Generator" bordered={false}>
                <SentenceGenerator />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Validity Analyzer" bordered={false}>
                <ValidityAnalyzer />
              </Card>
            </Col>
          </Row>
        </div>

        <div>

        </div>
      </div>
    );
  }
}

export default App;
