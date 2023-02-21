import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import styled from '@emotion/styled';

import { PredictionOutcome } from '../../../../utils';

interface InstanceDataGridFiltersProps {
    predictionOutcomeFilter: PredictionOutcome | 'None';
    handleChangePredictionOutcomeFilter: (event: SelectChangeEvent) => void;
    disabled?: boolean
}

const InstanceDataGridFiltersContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;

    .filter-input {
        width: 50%;
    }
`;

export const InstanceDataGridFilters = ({
    predictionOutcomeFilter,
    handleChangePredictionOutcomeFilter,
    disabled = false,
}: InstanceDataGridFiltersProps) => (
  <InstanceDataGridFiltersContainer>
    <div className="filter-input">
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id="prediction-outcome-select">Prediction Outcome</InputLabel>
        <Select
          labelId="prediction-outcome-select"
          id="prediction-outcome-select"
          value={predictionOutcomeFilter}
          onChange={handleChangePredictionOutcomeFilter}
          input={<OutlinedInput label="Prediction Outcome" />}
        >
          <MenuItem value={PredictionOutcome.PASS}>{PredictionOutcome.PASS.toUpperCase()}</MenuItem>
          <MenuItem value={PredictionOutcome.FAIL}>{PredictionOutcome.FAIL.toUpperCase()}</MenuItem>
          <MenuItem value="None">NONE</MenuItem>
        </Select>
        { disabled && <FormHelperText>Disabled</FormHelperText>}
      </FormControl>
    </div>
  </InstanceDataGridFiltersContainer>
);

export default InstanceDataGridFilters;
