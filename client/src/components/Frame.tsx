import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RegionSelect from "react-region-select";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getImageData, getIsSelectingROI, getRegionsNew, setRegionsNew } from "../features/dataFetching/DataSlice";

const Frame = () => {
    const dispatch = useAppDispatch()
    const imageSrc = useAppSelector(getImageData)
    const isSelectROI = useAppSelector(getIsSelectingROI)
    const regionsNew = useAppSelector(getRegionsNew)
    const regionStyle = {
        background: "rgba(0, 0, 0, 0.5)"
    };
    const onChange = (regions: any) => {
        if (isSelectROI) dispatch(setRegionsNew(regions));
    };

    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const img = event.target as HTMLImageElement;
        setImageWidth(img.width);
        setImageHeight(img.height);
    };

    return (
        <Grid item xs={11} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <RegionSelect
                regions={regionsNew}
                regionStyle={regionStyle}
                constraint
                onChange={onChange}
            > 
                <Box
                    component="img"
                    sx={{width: `95%`, height: `${100/12*7}vh`, borderRadius: 5, border: "1px solid black", marginX: 2}}
                    alt="Selectable"
                    src={imageSrc}
                    onLoad={onImageLoad}
                />
            </RegionSelect>
        </Grid>
    )
}

export default Frame
