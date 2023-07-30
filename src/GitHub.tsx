import {Stack, Typography} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";

export function GitHub() {
    return <div style={{
        position: "absolute",
        top: 0,
        right: 10,
        zIndex: 1,
        fontSize: 50,
        color: "white",
    }}>
        <a href="https://github.com/SuperNerdEric/osrs-dps" target="_blank" style={{textDecoration: "none"}} rel="noreferrer">
            <Stack direction="row" alignItems="center" gap={1}>
                <GitHubIcon style={{
                    fontSize: 45,
                    color: "white"
                }}/>
                <Typography style={{color: "white", fontSize: "35px"}}>GitHub</Typography>
            </Stack>
        </a>
    </div>;
}