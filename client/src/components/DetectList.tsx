import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PetsIcon from '@mui/icons-material/Pets';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { time } from 'console';

const Records = [
    {
        detect: "Cat",
        time: "2024/5/25 下午12:55:19",
        image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
    },
    {
        detect: "Ball",
        time: "2024/5/24 上午9:30:12",
        image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6"
    },
    {
        detect: "Person",
        time: "2024/5/23 下午3:45:19",
        image: "https://images.unsplash.com/photo-1530731141654-5993c3016c77"
    },
    {
        detect: "Cat",
        time: "2024/5/25 下午12:55:19",
        image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
    },
    {
        detect: "Ball",
        time: "2024/5/24 上午9:30:12",
        image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6"
    },
    {
        detect: "Person",
        time: "2024/5/23 下午3:45:19",
        image: "https://images.unsplash.com/photo-1530731141654-5993c3016c77"
    }
]

const DetectList = () => {
  return (
    <List disablePadding sx={{  width: "100%", height: "89vh", bgcolor: 'background.paper', overflowY: "auto", scrollbarColor: "black", borderRadius: 3 }}>
        {Records.map((record) => (
            <ListItem alignItems="flex-start" sx={{background: "#CDE8E5", paddingY: 1}}>
                <ListItemAvatar>
                    {record.detect === "Cat" ? <PetsIcon /> : record.detect === "Ball" ? <SportsBaseballIcon /> :<DirectionsRunIcon />}
                </ListItemAvatar>
                <Box sx={{background: "none"}}>
                    <ListItemText
                    primary={record.detect}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {record.time}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <Box 
                    component="img"
                    sx={{width: "8vw", height: "8vw"}}
                    src={record.image}
                />
                </Box>
            </ListItem>
        ))
    }
    </List>
  )
}

export default DetectList
