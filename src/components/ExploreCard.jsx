// src/components/ExploreCard.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function ExploreCard({ title, icon: IconComponent }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        p: 3,
        boxShadow: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <IconComponent sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
      <CardContent sx={{ flexGrow: 1, p: 0 }}>
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ExploreCard;