import React, {useState} from 'react';
import {Checkbox, FormControlLabel, Stack} from '@mui/material';
import slayerIcon from './Images/Slayer_icon.png';


const OnTaskCheck = (props: { onTask: boolean, handleOnTask: any }) => {
    return (
        <div>
            <Stack direction="row" alignItems="center" gap={2}>
                <img src={slayerIcon} width="auto" height="45" alt="Slayer Task"/>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={props.onTask}
                            onChange={props.handleOnTask}
                            name="On Task"
                            sx={{
                                color: "#d8ccb4",
                                '&.Mui-checked': {
                                    color: '#d8ccb4',
                                },
                                '& .MuiSvgIcon-root': {
                                    fontSize: 50
                                }
                            }}
                        />
                    }
                    label="On Task"
                />
            </Stack>
        </div>
    );
};

export default OnTaskCheck;
