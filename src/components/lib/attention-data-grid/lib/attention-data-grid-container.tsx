/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Box, FormControlLabel, FormGroup, Switch } from '@mui/material';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import AttentionDataGrid from './attention-data-grid';
import { AttentionDataGridRow } from '../../../../types';
import { BACKEND_URL, SyntacticRelationColorMap } from '../../../../utils';

const AttentionDataGridBox = styled(Box)`
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 800px;
  width: 70%;
  min-width: 900px;
  max-width: 1200px;
`;

const LegendContainer = styled.div`
  padding: 20px;
`;

export const AttentionDataGridContainer = () => {
  const { id } = useParams();

  const [rows, setRows] = useState<AttentionDataGridRow[]>([]);
  const [showColors, setShowColors] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
        const URL = `${BACKEND_URL}/syntactic-relation`;
        const response = await axios(URL);
        setRows(response.data);
    }

    fetchData();
  }, []);

  const renderLegend = () => (
    <LegendContainer>
      <svg
        width={1100}
      >
        {
            Object.entries(SyntacticRelationColorMap).map((val, index) => {
              const key = val[0];
              const value = val[1];
              const cellSize = 20;
              const columnCount = 9;
              const largestTextLength = 100;
              const xPos = Math.floor(index % columnCount) * (cellSize + largestTextLength);
              const yPos = Math.floor(index / columnCount) * (cellSize * 2);
              return (
                <>
                  <rect
                    width={cellSize}
                    height={cellSize}
                    fill={value}
                    stroke={key === 'UNKNOWN' ? 'black' : 'none'}
                    x={xPos}
                    y={yPos}
                  />
                  <text
                    x={xPos + 25}
                    y={yPos + 15}
                  >
                    {key}
                  </text>
                </>
              );
            })
          }
      </svg>
    </LegendContainer>
    );

  return (
    <AttentionDataGridBox>
      <div>
        <FormGroup>
          <FormControlLabel
            control={(
              <Switch
                checked={showColors}
                onChange={() => {
                  setShowColors((prevValue) => !prevValue);
                }}
              />
            )}
            label="View Relations"
          />
        </FormGroup>
      </div>
      { showColors && renderLegend() }
      <AttentionDataGrid
        rows={rows}
        showColors={showColors}
        instanceId={id}
      />
    </AttentionDataGridBox>
  );
};

export default AttentionDataGridContainer;
