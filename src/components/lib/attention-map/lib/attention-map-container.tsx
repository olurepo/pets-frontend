import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, Typography, useTheme } from '@mui/material';
import styled from '@emotion/styled';

import AttentionMap from './attention-map';

const FilterContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
`;

const ChartContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const mapOptions = [
  'Pre-trained',
  'Fine-tuned',
  'Pre-trained Adversarial',
  'Fine-tuned Adversarial',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, mapVariations: readonly string[], theme: Theme) {
  return {
    fontWeight:
    mapVariations.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const AttentionMapContainer = () => {
    const { id } = useParams();
    const query = useQuery();
    const theme = useTheme();

    const [layer, setLayer] = useState<number | string>(query.get('layer') ?? 1);
    const [head, setHead] = useState<number | string>(query.get('head') ?? 1);
    const [mapVariations, setMapVariations] = React.useState<string[]>(['Pre-trained']);

    const handleChangeVariations = (event: SelectChangeEvent<typeof mapVariations>) => {
      const {
        target: { value },
      } = event;
      const valueArray = typeof value === 'string' ? value.split(',') : value;
      if (valueArray.length <= 2) {
        setMapVariations(valueArray);
      }
    };

    const calculatePairId = () => {
      const currentId = parseInt(id ?? '0', 10);
      const isEven = currentId % 2 === 0;
      return (isEven ? currentId + 1 : currentId - 1);
    };

  return (
    <>
      <FilterContainer>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="layer-input">Layer</InputLabel>
          <Select
            labelId="layer-input"
            value={layer}
            label="Layer"
            onChange={(event) => {
                    setLayer(event.target.value);
                }}
          >
            {Array.from(Array(12).keys()).map((number) => <MenuItem value={number}>{number}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="head-input">Head</InputLabel>
          <Select
            labelId="head-input"
            value={head}
            label="Head"
            onChange={(event) => {
                setHead(event.target.value);
            }}
          >
            {Array.from(Array(12).keys()).map((number) => <MenuItem value={number}>{number}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="map-variations">Map Variations</InputLabel>
          <Select
            labelId="map-variations"
            multiple
            value={mapVariations}
            onChange={handleChangeVariations}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {mapOptions.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, mapVariations, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterContainer>
      <ChartContainer>
        {
          mapVariations.includes('Pre-trained')
          && (
          <div>
            <Typography>Pre-Trained Attentions</Typography>
            <AttentionMap
              layer={layer}
              head={head}
              id={id ?? '1'}
              model="pretrained"
            />
          </div>
          )
        }
        {
          mapVariations.includes('Fine-tuned')
          && (
          <div>
            <Typography>Fine-tuned Attentions</Typography>
            <AttentionMap
              layer={layer}
              head={head}
              id={id ?? '1'}
              model="fineTuned"
            />
          </div>
          )
        }
        {
          mapVariations.includes('Pre-trained Adversarial')
          && (
          <div>
            <Typography>Pre-trained Adversarial Pair</Typography>
            <AttentionMap
              layer={layer}
              head={head}
              id={calculatePairId().toString()}
              model="pretrained"
            />
          </div>
          )
        }
        {
          mapVariations.includes('Fine-tuned Adversarial',)
          && (
          <div>
            <Typography>Fine-tuned Adversarial Pair</Typography>
            <AttentionMap
              layer={layer}
              head={head}
              id={calculatePairId().toString()}
              model="fineTuned"
            />
          </div>
          )
        }
      </ChartContainer>
    </>
  );
};

export default AttentionMapContainer;
