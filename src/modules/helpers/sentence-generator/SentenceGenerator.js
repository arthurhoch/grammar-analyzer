import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

export default class SentenceGenerator extends Component {

	generateSentence = (productionsList) => {
    const firstProduction = this.getRandomFirstProduction(productionsList);
    if (firstProduction) {
      return this.generate(firstProduction, productionsList, 'S -> ' + firstProduction, 20);
    }
  };

  generate = (production, productionsList, sentence, timout, count = 0) => {
    if (count >= timout) return sentence + ' Stop here to prevent infinite looping.';
    count ++;
    
    const productionSplited = production.split('');
    let someNtEmpty = null;
    productionSplited.forEach((nt, index) => {
      if (nt === nt.toUpperCase()) {
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

    if (this.haveTerminalsInProduction(newProduction)) {
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
  
  haveTerminalsInProduction = (production) => {
    const productionSplited = production.split('');
    const nts = productionSplited.filter(value => value === value.toUpperCase);
    
    return nts && nts.length > 0 ? true : false;
  } 

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

	render() {
		const cardStyle = {
			textAlign: 'left',
		};
		return (
			<Fragment>
				<Card style={cardStyle} title={<b>{this.props.title || 'Sentence'}</b>}>
					{this.generateSentence(this.props.productionsList)}
				</Card>
			</Fragment>
		);
	}
}