import React from 'react';
import styled from '@emotion/styled';
import { PredictionOutcome, ERROR_100, SUCCESS_100, NEUTRAL_300 } from '../../../../utils';

interface DataGridProgressBarProps {
    value: number;
    result: PredictionOutcome;
}

const DataGridProgressBarContainer = styled.div<DataGridProgressBarProps>`
    border: 1px solid ${NEUTRAL_300};
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 26px;

    .value {
        position: absolute;
        line-height: 24px;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .bar {
        height: 100%;
        background-color: ${(props: any) => {
            if (props.result === PredictionOutcome.FAIL) return ERROR_100;
            return SUCCESS_100;
        }};
        max-width: ${(props:any) => `${props.value}%`};
    }
`;

export const DataGridProgressBar = (props : DataGridProgressBarProps) => {
    const { value } = props;

    return (
      <DataGridProgressBarContainer {...props}>
        <div className="value">{`${value}%`}</div>
        <div className="bar" />
      </DataGridProgressBarContainer>
    );
};

export default DataGridProgressBar;
