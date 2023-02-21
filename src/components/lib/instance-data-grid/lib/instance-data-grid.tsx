import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import InstanceDataGridToolbar from './instance-data-grid-toolbar';
import PhraseTextWrapper from './phrase-text-wrapper';
import DataGridProgressBar from './data-grid-progress-bar';

import { InstanceDataGridRow } from '../../../../types';
import { truncateStringIfNeeded } from '../../../../utils';

const MAX_STRING_LENGTH = 60;

const columns: GridColDef[] = [
  {
    field: 'premise',
    headerName: 'Premise',
    flex: 3,
    renderCell: (params: GridRenderCellParams) => (
      <Link to={`/attention-grid/${params.row.id}`}>
        <PhraseTextWrapper isAdversarial={params.row.isAdversarial}>{truncateStringIfNeeded(params.value, MAX_STRING_LENGTH)}</PhraseTextWrapper>
      </Link>
    ),
  },
  {
    field: 'hypothesis',
    headerName: 'Hypothesis',
    flex: 3,
    renderCell: (params: GridRenderCellParams) => (
      <Link to={`/attention-grid/${params.row.id}`}>
        <PhraseTextWrapper isAdversarial={params.row.isAdversarial}>{truncateStringIfNeeded(params.value, MAX_STRING_LENGTH)}</PhraseTextWrapper>
      </Link>
    ),
  },
  {
    field: 'prediction',
    headerName: 'Prediction',
    flex: 1,
  },
  {
    field: 'confidence',
    headerName: 'Model Confidence',
    flex: 1,
    sortable: true,
    renderCell: (params: GridRenderCellParams) => (
      <DataGridProgressBar value={params.value} result={params.row.result} />
    ),
  },
  // TODO: Add column for model prediction
];

interface InstanceDataGridProps {
  rows: InstanceDataGridRow[];
  handleInstanceSelection: (newSelectionModel: GridSelectionModel) => void;
  instanceSelectionModel: GridSelectionModel;
}

export const InstanceDataGrid = ({
  rows,
  handleInstanceSelection,
  instanceSelectionModel,
} : InstanceDataGridProps) => {
  const [pageSize, setPageSize] = React.useState<number>(10);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 15, 20]}
      checkboxSelection
      disableSelectionOnClick
      onSelectionModelChange={handleInstanceSelection}
      selectionModel={instanceSelectionModel}
      components={{
        Toolbar: InstanceDataGridToolbar,
      }}
    />
  );
};

export default InstanceDataGrid;
