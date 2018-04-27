import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

export default class Grammar extends Component {

	formatGrammar = (productionsList) => {
		let allNonTerminals = [];
		let allTerminals = [];

		productionsList.forEach(({ nonTerminal, terminalsList }) => {
			allNonTerminals.push(nonTerminal);

			terminalsList.forEach((terminal) => {
				terminal.length > 0 && terminal.split('').forEach((terminalSplitted) => {
					if (terminalSplitted === terminalSplitted.toLowerCase()) {
						allTerminals.push(terminalSplitted);
					}
				})
			})
		});

		allTerminals = [ ...new Set(allTerminals) ];

		if (allTerminals.length > 0 && allNonTerminals.length > 0) {
			return `{${allNonTerminals.join(', ')}}, {${allTerminals.join(', ')}}, P, ${allNonTerminals[0]}`;
		}
		return '';
	};

	render() {
		const cardStyle = {
			textAlign: 'left',
		};
		return (
			<Fragment>
				<Card style={cardStyle} title={<b>Generated grammar</b>}>
					G = {'('}
					{this.formatGrammar(this.props.productionsList)}
					{')'}
				</Card>
			</Fragment>
		);
	}
}