import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

export default class Productions extends Component {

	formatProductionList = (productionsList) => {
		const productionStyle = {
			marginLeft: '10px',
		};

		return productionsList && productionsList.map(
			({ nonTerminal, terminalsList }, index) => {
				if (nonTerminal) {
					return (
						<span key={index} style={productionStyle}>
							{nonTerminal} = {terminalsList.map((terminalList, indexTerminal) => 
								(terminalList === '' ? 'Σ' : terminalList) + (indexTerminal === terminalsList.length-1 ? ''  : ' | ')
							)}
							<br/>
						</span>
					);
				}
				return '';
			}
		);
	};

	render() {
		const cardStyle = {
			textAlign: 'left',
		};
		return (
			<Fragment>
				<Card style={cardStyle} title={<b>Generated productions</b>}>
					P = {'{'}
					<br />
					{this.formatProductionList(this.props.productionsList)}
					{' }'}
				</Card>
			</Fragment>
		);
	}
}