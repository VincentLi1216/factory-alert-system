import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useAppSelector } from '../app/hooks';
import { getDetectRecords } from '../features/dataFetching/DataSlice';

const DetectList = () => {
    const detectRecords = useAppSelector(getDetectRecords);
  return (
    <List disablePadding sx={{  width: "100%", height: "89vh", bgcolor: '#CDE8E5', overflowY: "auto", scrollbarColor: "black", borderRadius: 3 }}>
        {detectRecords.map((record) => (
            <ListItem alignItems="flex-start" sx={{background: "#CDE8E5", paddingY: 1}}>
                <ListItemAvatar>
                    {record.detect === "Block" ? <Inventory2Icon /> : record.detect === "Ball" ? <SportsBaseballIcon /> :<DirectionsRunIcon />}
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
                    sx={{width: "8vw", height: "8vw", borderRadius: 2}}
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
