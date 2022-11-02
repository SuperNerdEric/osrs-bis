import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import InfoIcon from "@mui/icons-material/Info";
import IconButton from '@mui/material/IconButton';

export default function ReasonPopover(props: { reasoning: string[] }) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton aria-describedby={id} onClick={handleClick}>
                <InfoIcon style={{color: 'white'}}/>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                disableScrollLock={true}
                style={
                    {
                        whiteSpace: 'pre-line',
                    }
                }
            >
                <Typography style={{backgroundColor: '#d8ccb4', fontSize: '14px', width: '650px' }} sx={{p: 2}}>{props.reasoning}</Typography>
            </Popover>
        </div>
    );
}