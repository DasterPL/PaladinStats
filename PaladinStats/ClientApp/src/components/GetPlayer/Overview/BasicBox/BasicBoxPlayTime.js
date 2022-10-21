import moment from 'moment'
import React from 'react'
import BasicBox from './BasicBox'

export default function BasicBoxPlayTime({ playTime }) {
    const formated = moment.duration(playTime, 'hours').humanize({ d: Number.MAX_VALUE });
    return <BasicBox className='playTime'>
        {formated}
    </BasicBox>
}
