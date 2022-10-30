import React, {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";

export function TopBar(props: { setTargetMonster: (targetMonster: string) => void, monsterList: string[], sectionName: string }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const handleHover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const handleClose = (e: any) => {
        if (e.currentTarget.localName !== "ul") {
            // @ts-ignore
            const menu: any = document.getElementById(props.sectionName).children[2];
            const menuBoundary = {
                left: menu.offsetLeft,
                top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
                right: menu.offsetLeft + menu.offsetHeight,
                bottom: menu.offsetTop + menu.offsetHeight
            };
            if (
                e.clientX >= menuBoundary.left &&
                e.clientX <= menuBoundary.right &&
                e.clientY <= menuBoundary.bottom &&
                e.clientY >= menuBoundary.top
            ) {
                return;
            }
        }

        setOpen(false);
    };

    const handleSelectBoss = (targetMonster: string) => {
        props.setTargetMonster(targetMonster)
        setAnchorEl(null);
        setOpen(false);
    };


    return <div>
        <Button
            id="basic-button"
            aria-controls={open ? props.sectionName : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onMouseOver={handleHover}
            onMouseLeave={handleClose}
            style={{ zIndex: 1301 }}
        >
            {props.sectionName}
        </Button>
        <Menu
            id={props.sectionName}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
                onMouseLeave: (e) => {
                    handleClose(e);
                }
            }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
        >
            {props.monsterList.map(result => (
                <MenuItem onClick={() => handleSelectBoss(result)}>
                    {result}
                </MenuItem>
            ))}
        </Menu>
    </div>;
}