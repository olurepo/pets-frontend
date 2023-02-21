import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';
import { AttentionDataGridRow, AttentionHead } from '../../../../types';
import Chart from '../../chart';
import { PRIMARY_300, SyntacticRelationColorMap } from '../../../../utils';

const COLUMN_COUNT = 7;
const ROW_HEIGHT = 150;

interface TooltipContainerProps {
  top: number;
  left: number;
}

interface MouseCoordinates {
  x: number;
  y: number;
}

interface TooltipData {
  layer: number;
  attentionHead: number;
  syntacticRelationship: string;
  accuracy: number;
  model: string;
}

const TooltipContainer = styled.div<TooltipContainerProps>`
  background-color: white;

  width: 300px;
  height: 200px;
  border: 1px solid ${PRIMARY_300};

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};

  .tooltip-item {
    width: 100%;
    padding: 0px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledRect = styled.rect`
  &:hover {
    cursor: pointer;
    stroke: black;
    stroke-width: 2px;
  }
`;

// TODO: Navigate to details page on click

interface AttentionDataGridProps {
  rows: AttentionDataGridRow[];
  showColors?: boolean;
  instanceId?: string;
}

export const AttentionDataGrid = ({
  rows,
  showColors,
  instanceId = '0',
} : AttentionDataGridProps) => {
  const navigate = useNavigate();

  const [pageSize, setPageSize] = React.useState<number>(10);
  const [mouseCoordinates, setMouseCoordinates] = useState<MouseCoordinates>({
    x: 0,
    y: 0,
  });
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [tooltipVisibility, setTooltipVisibility] = useState<boolean>(false);

  const renderAttentionHeads = ({
    attentionHeads,
    cellWidth,
    index,
    model,
  }:{
    attentionHeads: AttentionHead[],
    cellWidth: number,
    index: number,
    model: string,
  }) => attentionHeads.map((attentionHead) => {
    const cellLength = cellWidth / (COLUMN_COUNT * 2);
    return (
      <g>
        <StyledRect
          onClick={() => {
            navigate(`/attention/${instanceId}?layer=${index}&head=${attentionHead.id}`);
          }}
          onMouseOver={(event) => {
            if (!tooltipVisibility) {
              setMouseCoordinates({
                x: event.pageX + 30,
                y: event.pageY - 10,
              });
              setTooltipData({
                layer: index,
                attentionHead: attentionHead.id,
                syntacticRelationship: attentionHead.syntacticRelationship,
                accuracy: attentionHead.accuracy,
                model,
              });
              setTooltipVisibility(true);
            }
          }}
          onMouseLeave={() => {
            if (tooltipVisibility) {
              setTooltipVisibility(false);
              setTooltipData(null);
            }
          }}
          width={cellLength}
          height={cellLength}
          fill={
            showColors ? (SyntacticRelationColorMap as any)[attentionHead.syntacticRelationship] : 'black'
          }
          fillOpacity={showColors ? 1 : attentionHead.accuracy}
          stroke={attentionHead.syntacticRelationship === SyntacticRelationColorMap.UNKNOWN ? 'black' : 'none'}
          x={Math.floor(attentionHead.id % COLUMN_COUNT) * (cellLength * 2)}
          y={Math.floor(attentionHead.id / COLUMN_COUNT) * (cellLength * 2)}
        />
      </g>
    );
  });

  const columns: GridColDef[] = [
    {
      field: 'layer',
      headerName: 'Layer',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <p>{`Layer ${params.value}`}</p>
      ),
    },
    {
      field: 'benignRelations',
      headerName: 'Benign Heads',
      flex: 3,
      renderCell: (params: GridRenderCellParams) => (
        <Chart
          dimensions={{
            width: params.colDef.computedWidth,
            height: ROW_HEIGHT,
            margin: {
              top: 20,
              bottom: 20,
              left: 0,
              right: 0,
            },
          }}
        >
          {
            renderAttentionHeads({
                attentionHeads: params.value,
                cellWidth: params.colDef.computedWidth,
                index: params.row.layer,
                model: 'Fine Tuned',
            })
          }
        </Chart>
      ),
    },
    {
      field: 'adversarialRelations',
      headerName: 'Adversarial Heads',
      flex: 3,
      renderCell: (params: GridRenderCellParams) => (
        <Chart
          dimensions={{
            width: params.colDef.computedWidth,
            height: ROW_HEIGHT,
            margin: {
              top: 20,
              bottom: 20,
              left: 0,
              right: 0,
            },
          }}
        >
          {
            renderAttentionHeads({
                attentionHeads: params.value,
                cellWidth: params.colDef.computedWidth,
                index: params.row.layer,
                model: 'Fine Tuned',
            })
          }
        </Chart>
      ),
    },
  ];

  return (
    <>
      <DataGrid
        rowHeight={ROW_HEIGHT}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 15, 20]}
      />
      {
        tooltipVisibility
        && (
        <TooltipContainer
          top={mouseCoordinates.y}
          left={mouseCoordinates.x}
        >
          <div className="tooltip-item">
            <p>Layer</p>
            <p>{tooltipData?.layer}</p>
          </div>
          <div className="tooltip-item">
            <p>Attention Head</p>
            <p>{tooltipData?.attentionHead}</p>
          </div>
          <div className="tooltip-item">
            <p>Syntactic Relation</p>
            <p>{tooltipData?.syntacticRelationship}</p>
          </div>
          <div className="tooltip-item">
            <p>Accuracy</p>
            <p>{tooltipData?.accuracy}</p>
          </div>
          <div className="tooltip-item">
            <p>Model</p>
            <p>{tooltipData?.model}</p>
          </div>
        </TooltipContainer>
        )
      }
    </>
  );
};

export default AttentionDataGrid;
