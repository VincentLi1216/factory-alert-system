import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const User = () => {
  return (
    <Grid item container xs={1} direction="row" sx={{paddingX: 2, paddingY: 3}}>
        <Grid item xs={2}>
            <Avatar alt="Admin" src="/" />
        </Grid>
        <Grid item xs={10} sx={{display: "flex", alignItems: "center", paddingX: 2}}>
            <Typography variant="h6">Hello, Admin!</Typography>
        </Grid>
    </Grid>
  )
}

export default User
