import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

export class PieChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: {
				labels: ['All Visits', 'Weekly Visitors', 'Daily Visitors'],
				datasets: [{ label: 'Visitors', data: [333, 777, 888] }],
			},
		};
	}
	render() {
		return (
			<div>
				<Doughnut
					data={this.state.chartData}
					width={300}
					height={300}
					options={{
						maintainAspectRatio: false,
					}}
				/>
			</div>
		);
	}
}

export default PieChart;
