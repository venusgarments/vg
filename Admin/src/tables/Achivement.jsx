// Achivement.jsx
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import React from 'react';

// Background triangle image
const TriangleImg = styled('img')(() => ({
  position: 'absolute',
  right: -5,
  bottom: -5,
  height: 130,
  opacity: 0.15,
  pointerEvents: 'none',
  zIndex: 0,
}));

// Trophy image (light, clean)
const TrophyImg = styled('img')(() => ({
  position: 'absolute',
  right: 12,
  bottom: 20,
  height: 85,
  opacity: 1,
  pointerEvents: 'none',
  zIndex: 0,
}));

const Achivement = ({ sales }) => {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        backgroundColor: '#ffffff',        // ← PURE WHITE CARD
        color: '#1a1a1a',                  // ← DARK TEXT
        boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
      }}
    >
      <CardContent sx={{ position: 'relative', zIndex: 2, p: 3 }}>
        <Typography variant='h6' sx={{ fontWeight: 700, color: '#000' }}>
          Venus Garments
        </Typography>

        <Typography variant='body2' sx={{ mb: 1, color: '#444' }}>
          Congratulations 🥳
        </Typography>

        <Typography
          variant='h5'
          sx={{
            my: 2.5,
            fontWeight: 900,
            color: '#6A1B9A',              // purple accent
          }}
        >
          {sales ? `${sales.toLocaleString()} INR` : 'Loading...'}
        </Typography>

        <Button size='small' variant='contained' sx={{ textTransform: 'none' }}>
          View Sales
        </Button>
      </CardContent>

      {/* Decorative images */}
      <TriangleImg alt='triangle background' src={`/images/misc/triangle-light.png`} />
      <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
    </Card>
  );
};

export default Achivement;
