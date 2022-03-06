import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, Title, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const types = {
    kills: { name: 'Kills_Player', label: 'Zabójstwa' },
    deaths: { name: 'Deaths', label: 'Śmierci' },
    damage: { name: 'Damage_Player', label: 'Zadane obrażenia' },
    heal: { name: 'Healing', label: 'Wyleczone obrażenia' }
}

export default function MatchCharts({ matchData }) {
    Chart.register(ArcElement);
    Chart.register(ChartDataLabels);
    Chart.register(Title);
    Chart.register(Tooltip);

    // console.log(matchData);
    // const championImages = chartData.map(c => {return {
    //     src: ImageSrc(c.championId),
    //     width: 32,
    //     height: 32
    // }});
    // console.log(championImages);

    const [value, setValue] = useState(types.kills);
    const [render, setRender] = useState(null);
    const [sort, setSort] = useState(false);

    useEffect(() => {
        const chartData = matchData.map((player, index) => {
            const deg = 1 * index;
            const hue = index < 5 ? 130 + deg : deg;
            return {
                champion: player.Reference_Name,
                championId: player.ChampionId,
                value: player[value.name],
                backgroundColor: `hsla(${hue}, 100%, 50%, 0.65)`
            }
        });
        const chartDataSorted = sort ? chartData.sort((a, b) => b.value - a.value) : chartData;
        const data = {
            labels: chartDataSorted.map(c => c.champion),
            datasets: [{
                label: value.label,
                backgroundColor: chartDataSorted.map(c => c.backgroundColor),
                borderColor: 'rgba(255,255,255,0.6)',
                data: chartDataSorted.map(c => c.value)
            }]
        };
        const options = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    color: 'black',
                    text: value.label,
                    font: {
                        size: '20'
                    }
                },
                datalabels: {
                    color: 'black',
                    font: {
                        size: '16',
                        weight: 'bold'
                    },
                    formatter: (value, chart,) => {
                        if (value === 0) return '';
                        const name = chart.chart.data.labels[chart.dataIndex];
                        return name;
                    }
                },
                tooltip: {
                    displayColors: false,
                    bodyFont: {
                        weight: 'bold',
                        size: '18'
                    },
                    position: 'nearest',
                    callbacks: {
                        label: context => context.formattedValue
                    }
                }
            }
        };
        setRender(<Pie data={data} options={options} />);
    }, [value, sort]);

    function handleClick(state, event) {
        switch (state) {
            case 'kills':
                setValue(types.kills)
                break;
            case 'deaths':
                setValue(types.deaths)
                break;
            case 'damage':
                setValue(types.damage)
                break;
            case 'heal':
                setValue(types.heal)
                break;
            case 'sort':
                setSort(prev => !prev);
                break;
        }
    }

    return <div className='chart'>
        <nav className='chartSwitch buttonGroup'>
            <button onClick={() => handleClick('kills')} className={value.name === 'Kills_Player' ? 'active' : ''}>Zabójstwa</button>
            <button onClick={() => handleClick('deaths')} className={value.name === 'Deaths' ? 'active' : ''}>Śmierci</button>
            <button onClick={() => handleClick('damage')} className={value.name === 'Damage_Player' ? 'active' : ''}>Obrażenia</button>
            <button onClick={() => handleClick('heal')} className={value.name === 'Healing' ? 'active' : ''}>Leczenie</button>
            <button onClick={(event) => handleClick('sort', event)} className={sort ? 'active' : ''}>Sort</button>
        </nav>
        {render}
    </div >
}