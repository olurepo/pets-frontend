/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-underscore-dangle */
import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { Divider, Grid, Typography } from '@mui/material';

import { PetData } from '../../../../types';
import { BACKEND_URL, getImageUrl } from '../../../../utils';

const DetailsContainer = styled('div')`
  width: 80%;
`;

const DetailsImage = styled('img')`
  max-width: 90%;
`;

export function Search() {
  const [pet, setPet] = useState<PetData>();
  const { id } = useParams();

  const getPet = useCallback(async () => {
    const URL = `${BACKEND_URL}api/pets/${id}`;

    const response = await fetch(URL);
    const foundPet = await response.json();

    setPet(foundPet);
  }, [id]);

  useEffect(() => {
    getPet();
  }, [getPet]);

  return (
    <DetailsContainer>
      <Grid container spacing={2} justifyContent="space-around" sx={{ marginBottom: 2 }}>
        <Grid item xs={12} md={6}>
          <DetailsImage src={getImageUrl(pet?.image)} alt="pet image" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="h3">
                    {pet?.name?.toUpperCase()}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={2}>
                  <Typography variant="h6">
                    Age:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {pet?.age}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={2}>
                  <Typography variant="h6">
                    Breed:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {pet?.breed}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={2}>
                  <Typography variant="h6">
                    Sex:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {pet?.sex}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={2}>
                  <Typography variant="h6">
                    Species:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {pet?.species}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={2}>
                  <Typography variant="h6">
                    Color:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {pet?.color}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider flexItem />
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Typography variant="body2">
                    {pet?.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DetailsContainer>
  );
}

export default Search;
