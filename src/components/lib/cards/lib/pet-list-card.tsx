import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip, Divider, Grid } from '@mui/material';
import _ from 'lodash';

interface PetListCardProps {
    image?: string;
    name?: string;
    age?: number;
    breed?: string;
    sex?: string;
    size?: string;
    altText?: string;
    onClick?: () => void;
}

export function PetListCard({
    image,
    name,
    age,
    breed,
    sex,
    size,
    altText,
    onClick,
}: PetListCardProps) {
  function truncate(label: string, length: number) {
    return _.truncate(label, {
      length,
      omission: '...',
    });
  }

  return (
    <Card onClick={onClick} sx={{ minWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={altText}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { name }
          </Typography>
          <Divider />
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={4}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="overline">
                    Age
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip label={age} color="primary" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="overline">
                    Breed
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip label={truncate(breed ?? '', 16)} color="primary" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="overline">
                    Sex
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip label={sex} color="primary" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="overline">
                    Size
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip label={size} color="primary" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PetListCard;
