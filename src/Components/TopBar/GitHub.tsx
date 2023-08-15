import {Hidden, Stack, Typography} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";

export function GitHub() {
    return (
        <div style={{
            fontSize: 50,
            color: "white",
            textAlign: 'right',
        }}>
            <a href="https://github.com/SuperNerdEric/osrs-dps" target="_blank" style={{textDecoration: "none"}}
               rel="noreferrer">
                <Stack direction="row" alignItems="center" gap={1}>
                    <GitHubIcon style={{
                        fontSize: 45,
                        color: "white"
                    }}/>
{/*                    <Hidden smDown>
                        <Typography style={{color: "white", fontSize: "35px"}}>GitHub</Typography>
                    </Hidden>*/}
                </Stack>
            </a>
        </div>
    );
}
