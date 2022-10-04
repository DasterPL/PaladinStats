import React from 'react';
import { Chart, ArcElement, Title, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import championsList from '../../../Resources/champions.json';

export default function ClassChart({ championData }) {
    Chart.register(ArcElement);
    Chart.register(ChartDataLabels);
    Chart.register(Title);
    Chart.register(Tooltip);

    function matchSum(role) {
        const filtered = championData.filter(champion => championsList.find(c => c.id == champion.champion_id)?.Roles === role);
        const reduced = filtered.reduce((accumulator, curr) => accumulator + curr.Wins + curr.Losses, 0);
        return reduced;
    }

    const chartData = [
        {
            role: 'Obrońcy',
            matches: matchSum("Paladins Obrońca"),
            backgroundColor: 'rgba(244, 202, 100, 0.8)'
        },
        {
            role: 'Wsparcie',
            matches: matchSum("Paladins Wsparcie"),
            backgroundColor: 'rgba(49, 131, 200, 0.8)'
        },
        {
            role: 'Napastnicy',
            matches: matchSum("Paladins Napastnik"),
            backgroundColor: 'rgba(220, 48, 48, 0.8)'
        },
        {
            role: 'Skrzydłowi',
            matches: matchSum("Paladins Skrzydłowy"),
            backgroundColor: 'rgba(140, 122, 230, 0.8)'
        }
    ];
    const chartDataSorted = chartData.sort((a,b)=> b.matches-a.matches);

    const data = {
        labels: chartDataSorted.map(c=>c.role),
        datasets: [{
            label: 'Podział meczy na klasy',
            backgroundColor: chartDataSorted.map(c=>c.backgroundColor),
            borderColor: 'transparent',
            data: chartDataSorted.map(c=>c.matches)
        }]
    };
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                color: 'black',
                text: 'Procentowy udział roli',
                font:{
                    size: '20'
                }
            },
            datalabels: {
                color: 'white',
                backgroundColor: '#404040',
                formatter: (value, chart,) => {
                    const name = chart.chart.data.labels[chart.dataIndex];
                    const all = chart.dataset.data.reduce((sum, curr) => sum + curr);
                    return `${name}: ${Math.round(value / all * 100)}%`;
                },
                font: {
                    size: '16'
                }
            }
        }
    };
    return <div className='classChart'>
        <Doughnut data={data} options={options} />
    </div >
}