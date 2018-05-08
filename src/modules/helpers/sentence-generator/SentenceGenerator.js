import React, { Component, Fragment } from 'react';
import { Card, Input } from 'antd';

const { Search } = Input;

export default class SentenceGenerator extends Component {

  state = {
    timeout: 20,
    sentence: ''
  }

  componentDidMount() {
    //this.props.generateAnotherSentence();
    setTimeout(() => {
      this.generateAnotherSentence();  
    }, 500);
  }

	generateSentence = (productionsList) => {
    const firstProduction = this.getRandomFirstProduction(productionsList);
    if (firstProduction) {
      return this.generate(firstProduction, productionsList, 'S -> ' + firstProduction, this.state.timeout);
    }
  };

  generate = (production, productionsList, sentence, timout, count = 0) => {
    if (count >= timout) return sentence + ' Stop here to prevent infinite looping.';
    count ++;
    
    const productionSplited = production.split('');
    let someNtEmpty = null;
    productionSplited.forEach((nt, index) => {
      if (/[A-Z]/.test(nt)) {
        let newProductionFromNt = this.getRandomProductionFromNt(productionsList, nt)
        if (!newProductionFromNt) {
          return someNtEmpty = nt;
        }
        productionSplited[index] = newProductionFromNt;
      }
    })

    if (someNtEmpty) return `You must defined a non terminal called '${someNtEmpty}' .`;     

    const newProduction = productionSplited.join('');
    sentence += ' -> ' + newProduction;

    if (this.haveNonTerminalsInProduction(newProduction)) {
      return this.generate(newProduction, productionsList, sentence, timout, count);
    } else {
      return sentence;
    }
  }

  getRandomFirstProduction = (productionsList) => {
    if (productionsList && productionsList.length > 0) {
      const S = productionsList[0].terminalsList;
      return S[Math.floor(Math.random() * S.length)]
    }
  }
  
  haveNonTerminalsInProduction = (production) => {
    return /[A-Z]/.test(production);
  } 

  isSpecialCharacter = (str) => {
    if (typeof str === 'string' || str instanceof String)
      return false;
    else
      return true
  };

  getRandomProductionFromNt = (productionsList, nt) => {
    const productionListFromNt = this.getProductionListFromNt(productionsList, nt);
    if (productionListFromNt && productionListFromNt.length) {
      const randomIndex = Math.floor(Math.random() * productionListFromNt.length);
      return productionListFromNt[randomIndex];
    }
  }

  getProductionListFromNt = (productionsList, nt) => {
    const productions = productionsList.filter(({ nonTerminal, terminalsList }) => {
      return nt === nonTerminal;
    });
    if (productions && productions.length > 0) return productions[0].terminalsList;
  }

  handleTimeoutChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ timeout: value });
    this.generateAnotherSentence();
  }

  generateAnotherSentence = () => {
    this.setState({
      sentence: this.generateSentence(this.props.productionsList)
    });
  }

	render() {
		return (
			<Fragment>
        <Card 
          title={<b>{this.props.title || 'Sentence'}</b>}
          extra={
            <Fragment>
              <Search
                placeholder="Timeout treshold"
                enterButton="Generate another"
                value={this.state.timeout}
                onChange={e => this.handleTimeoutChange(e)}
                onSearch={this.generateAnotherSentence} 
              />
            </Fragment>

          }
        >
					{this.state.sentence}
				</Card>
			</Fragment>
		);
	}
}