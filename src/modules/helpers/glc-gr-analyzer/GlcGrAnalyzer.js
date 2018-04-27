import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

export default class GlcGrAnalyzer extends Component {

  analyze = (productionsList) => {
    let isRegularGrammar = false;
    let isContexFreeGrammar = false;
    
		productionsList && productionsList.forEach(
			({ nonTerminal, terminalsList }) => {
				if (nonTerminal && terminalsList) {

          terminalsList.forEach((terminal) => {
            if (/^[a-z]?[A-Z]?$/.test(terminal) && !/^[A-Z]?$/.test(terminal)) {
              if (!isContexFreeGrammar) {
                isRegularGrammar = true;
              }
            } else {
              isContexFreeGrammar = true;
              isRegularGrammar = false;
            }
          });
				}
			}
    );

    if (isRegularGrammar) return 'Regular grammar'
    if (isContexFreeGrammar) return 'Contex free grammar'
    return 'Unrestricted Grammar'
	};

	render() {
		const cardStyle = {
			textAlign: 'center',
		};
		return (
			<Fragment>
				<Card style={cardStyle}>
					<h1>{this.analyze(this.props.productionsList)}</h1>
				</Card>
			</Fragment>
		);
	}
}