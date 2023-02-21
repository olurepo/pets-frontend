/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { PetListCard } from '../../cards';
import { AnimalSex, FilterKeys, PetData } from '../../../../types';
import { AnimalSize, BACKEND_URL, getImageUrl } from '../../../../utils';

const SearchContainer = styled('div')`
    width: 80%;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const ResultsContainer = styled('div')`
    width: 80%;  
`;

export function Search() {
    const [name, setName] = useState<string>('');
    const [species, setSpecies] = useState<string>('');
    const [age, setAge] = useState<number>();
    const [breed, setBreed] = useState<string>('');
    const [sex, setSex] = useState<AnimalSex | string>('');
    const [size, setSize] = useState<AnimalSize | string>('');
    const [color, setColor] = useState<string>('');

    const [pets, setPets] = useState<PetData[]>([]);

    const searchParamsObject = useMemo(() => ({
        ...(name && { name }),
        ...(species && { species }),
        ...(age && { age: age.toString() }),
        ...(breed && { breed }),
        ...(sex && { sex }),
        ...(size && { size }),
        ...(color && { color }),
    }), [age, breed, color, name, sex, size, species]);

    const navigate = useNavigate();

    function handleFilterInput(type: FilterKeys, value: any) {
        switch (type) {
            case 'name':
                setName(value);
                break;
            case 'species':
                setSpecies(value);
                break;
            case 'age':
                setAge(value);
                break;
            case 'breed':
                setBreed(value);
                break;
            case 'color':
                setColor(value);
                break;
            case 'sex':
                setSex(value);
                break;
            case 'size':
                setSize(value);
                break;
            default:
                break;
        }
    }

    const getPets = useCallback(async () => {
        const searchParams = new URLSearchParams(searchParamsObject);
        const URL = `${BACKEND_URL}api/pets?${searchParams.toString()}`;

        const response = await fetch(URL);
        const allPets = await response.json();

        setPets(allPets);
    }, [searchParamsObject]);

    useEffect(() => {
        getPets();
    }, []);

    return (
      <>
        <SearchContainer>
          <Grid container spacing={2} justifyContent="space-around" sx={{ marginBottom: 2 }}>
            <Grid item xs={12} md={4}>
              <TextField label="Name" fullWidth value={name} onChange={(event) => handleFilterInput('name', event.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Species" fullWidth value={species} onChange={(event) => handleFilterInput('species', event.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Age" fullWidth type="number" value={age} onChange={(event) => handleFilterInput('age', event.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Breed" fullWidth value={breed} onChange={(event) => handleFilterInput('breed', event.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Color" fullWidth value={color} onChange={(event) => handleFilterInput('color', event.target.value)} />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select
                  className="search-select"
                  label="Sex"
                  value={sex}
                  onChange={(event) => handleFilterInput('sex', event.target.value)}
                >
                  <MenuItem value="F">Female</MenuItem>
                  <MenuItem value="M">Male</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Size</InputLabel>
                <Select
                  className="search-select"
                  label="Size"
                  value={size}
                  onChange={(event) => handleFilterInput('size', event.target.value)}
                >
                  <MenuItem value={AnimalSize.SMALL}>{AnimalSize.SMALL}</MenuItem>
                  <MenuItem value={AnimalSize.MEDIUM}>{AnimalSize.MEDIUM}</MenuItem>
                  <MenuItem value={AnimalSize.LARGE}>{AnimalSize.LARGE}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button onClick={() => getPets()} variant="contained" size="large">Search</Button>
        </SearchContainer>
        <ResultsContainer>
          <Grid container columnSpacing={2} rowSpacing={4}>
            {
                pets.map((pet) => (
                  <Grid item xs={12} md={6} lg={4} key={pet._id}>
                    <PetListCard
                      image={getImageUrl(pet.image)}
                      name={pet.name}
                      age={pet.age}
                      breed={pet.breed}
                      sex={pet.sex}
                      size={pet.size}
                      altText={pet.breed}
                      onClick={() => {
                        navigate(`/pets/${pet._id}`);
                      }}
                    />
                  </Grid>
                ))
            }
          </Grid>
        </ResultsContainer>
      </>
    );
}

export default Search;
