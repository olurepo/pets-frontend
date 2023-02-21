/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Box, CircularProgress, SelectChangeEvent } from '@mui/material';
import { GridRowId, GridSelectionModel } from '@mui/x-data-grid';

import axios from 'axios';

import InstanceDataGrid from './instance-data-grid';

import { InstanceDataGridRow } from '../../../../types';
import { PredictionOutcome, BACKEND_URL } from '../../../../utils';
import InstanceDataGridFilters from './instance-data-grid-filters';

const InstanceDataGridBox = styled(Box)`
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 750px;
  width: 85%;
  min-width: 700px;
  max-width: 1280px;
`;

export const InstanceDataGridContainer = () => {
  const [instanceData, setInstanceData] = useState<InstanceDataGridRow[]>([]);
  const [rows, setRows] = useState<InstanceDataGridRow[]>([]);
  const [instanceSelectionModel, setInstanceSelectionModel] = React.useState<GridSelectionModel>([]);

  // FILTER STATE
  const [predictionOutcomeFilter, setPredictionOutcomeFilter] = useState<PredictionOutcome | 'None'>('None');

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
        const URL = `${BACKEND_URL}/instances`;
        const response = await axios(URL);
        setInstanceData(response.data);
        setRows(response.data);
    }

    setLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (instanceData.length > 0) {
        setLoading(false);
    }
  }, [instanceData]);

  const filterByPredictionOutcome = (dataToFilter: InstanceDataGridRow[], newPredictionOutcomeFilter: PredictionOutcome | 'None') => {
    if (newPredictionOutcomeFilter === PredictionOutcome.FAIL.toString()) {
      return dataToFilter.filter((datum) => datum.result === PredictionOutcome.FAIL);
    }
    if (newPredictionOutcomeFilter === PredictionOutcome.PASS.toString()) {
      return dataToFilter.filter((datum) => datum.result === PredictionOutcome.PASS);
    }

    return dataToFilter;
  };

  const handleFilterInteractions = (newSelectionModel: GridRowId[], newPredictionOutcomeFilter: PredictionOutcome | 'None') => {
    let newRows;
    if (newSelectionModel.length === 0) {
      newRows = filterByPredictionOutcome(instanceData, newPredictionOutcomeFilter);
    } else {
      const selectedItemId = newSelectionModel[0];
      const selectedInstance = instanceData.find((value) => (value.id === parseInt(selectedItemId.toString(), 10)));
      const filteredInstances = instanceData.filter((instance) => instance.groupId === selectedInstance?.groupId);

      newRows = filterByPredictionOutcome(filteredInstances, newPredictionOutcomeFilter);
    }

    setRows(newRows);
  };

  return (
    <>
      {loading && <CircularProgress />}
      {
        !loading
        && (
        <InstanceDataGridBox>
          <InstanceDataGridFilters
            predictionOutcomeFilter={predictionOutcomeFilter}
            handleChangePredictionOutcomeFilter={(event: SelectChangeEvent) => {
              setPredictionOutcomeFilter(event.target.value as PredictionOutcome | 'None');
              handleFilterInteractions(instanceSelectionModel, event.target.value as PredictionOutcome | 'None');
            }}
            disabled={instanceSelectionModel.length > 0}
          />
          <InstanceDataGrid
            rows={rows}
            instanceSelectionModel={instanceSelectionModel}
            handleInstanceSelection={(newSelectionModel: GridSelectionModel) => {
                setInstanceSelectionModel(newSelectionModel);
                handleFilterInteractions(newSelectionModel, predictionOutcomeFilter);
              }}
          />
        </InstanceDataGridBox>
        )
      }
    </>
  );
};

export default InstanceDataGridContainer;
