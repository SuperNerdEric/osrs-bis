import * as React from "react";
import { Stack, TextField, Tooltip } from "@mui/material";
import bandosGodsword from "../../Images/Bandos_godsword_small.png";
import dragonWarhammer from "../../Images/Dragon_warhammer_small.png";
import elderMaul from "../../Images/Elder_maul_small.png";
import tonalzticsOfRalos from "../../Images/Tonalztics_of_ralos_small.png";
import defenceIcon from "../../Images/Skills/Defence_icon.png";
import {
    calculateDefenceLevel,
    calculateHits,
    DefenceReductionSummary,
    ralosReductionPerHit,
} from "../../Calculator/DefenceCalculator";

interface DefenceReductionProps {
    bossName: string;
    defenceLevel: number;
    magicLevel: number;
    maxReduction: number;
    currentDefence: number;
    handleCurrentDefence: (newValue: number) => void;
}

export default function DefenceReduction(props: DefenceReductionProps) {
    const [elderMaulHits, setElderMaulHits] = React.useState(0);
    const [dwhHits, setDwhHits] = React.useState(0);
    const [ralosHits, setRalosHits] = React.useState(0);
    const [bgsDamage, setBgsDamage] = React.useState(0);
    const [tooltipOpen, setTooltipOpen] = React.useState<boolean>(false);

    const applySummary = (summary: DefenceReductionSummary) => {
        const newDefence = calculateDefenceLevel(props.defenceLevel, summary, props.maxReduction, props.magicLevel);
        props.handleCurrentDefence(newDefence);
    };

    const summaryFrom = (overrides: Partial<DefenceReductionSummary>): DefenceReductionSummary => ({
        elderMaul: elderMaulHits,
        dragonWarhammer: dwhHits,
        tonalzticsOfRalos: ralosHits,
        bandosGodsword: bgsDamage,
        ...overrides,
    });

    const handleElderMaulChange = (newValue: number) => {
        applySummary(summaryFrom({ elderMaul: newValue }));
        setElderMaulHits(newValue);
    };

    const handleDWHChange = (newValue: number) => {
        applySummary(summaryFrom({ dragonWarhammer: newValue }));
        setDwhHits(newValue);
    };

    const handleRalosChange = (newValue: number) => {
        applySummary(summaryFrom({ tonalzticsOfRalos: newValue }));
        setRalosHits(newValue);
    };

    const handleBGSChange = (newValue: number) => {
        applySummary(summaryFrom({ bandosGodsword: newValue }));
        setBgsDamage(newValue);
    };

    const handleCurrentDefenceChange = (newValue: number) => {
        if (newValue < props.defenceLevel - props.maxReduction) {
            newValue = props.defenceLevel - props.maxReduction;
            setTooltipOpen(true);
            setTimeout(() => {
                setTooltipOpen(false);
            }, 2000);
        }

        const hits = calculateHits(newValue, props.defenceLevel);
        props.handleCurrentDefence(newValue);
        setElderMaulHits(hits.elderMaul);
        setDwhHits(hits.dragonWarhammer);
        setRalosHits(hits.tonalzticsOfRalos);
        setBgsDamage(hits.bandosGodsword);
    };

    React.useEffect(() => {
        setElderMaulHits(0);
        setDwhHits(0);
        setRalosHits(0);
        setBgsDamage(0);
        if (Number(props.currentDefence) !== Number(props.defenceLevel)) {
            props.handleCurrentDefence(props.defenceLevel);
        }
    }, [props.defenceLevel, props.magicLevel]);

    const ralosPerHit = ralosReductionPerHit(props.magicLevel);

    return (
        <div
            style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "7px", maxWidth: "100%" }}
        >
            <Stack spacing={2} alignItems="center" direction="row" flexWrap="wrap" justifyContent="center">
                <Stack direction="row" alignItems="center" gap={1}>
                    <Tooltip title="Elder maul special: each hit removes 35% of current Defence">
                        <img src={elderMaul} alt="Elder maul" width="30" height="30" style={specIconStyle} />
                    </Tooltip>
                    <TextField
                        type="number"
                        value={elderMaulHits}
                        onChange={(e) => {
                            const newValue = Math.max(0, Math.min(Number(e.target.value), 99));
                            handleElderMaulChange(newValue);
                        }}
                        variant="outlined"
                        style={textFieldStyle}
                        inputProps={{ style: { padding: 0, fontSize: "18px" }, min: 0, max: 99 }}
                    />
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Tooltip title="Dragon warhammer special: each hit removes 30% of current Defence">
                        <img
                            src={dragonWarhammer}
                            alt="Dragon Warhammer"
                            width="30"
                            height="30"
                            style={specIconStyle}
                        />
                    </Tooltip>
                    <TextField
                        type="number"
                        value={dwhHits}
                        onChange={(e) => {
                            const newValue = Math.max(0, Math.min(Number(e.target.value), 99));
                            handleDWHChange(newValue);
                        }}
                        variant="outlined"
                        style={textFieldStyle}
                        inputProps={{ style: { padding: 0, fontSize: "18px" }, min: 0, max: 99 }}
                    />
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Tooltip
                        title={`Tonalztics of Ralos special: each hit removes ${ralosPerHit} Defence (1/8 of Magic level). A charged special can land twice.`}
                    >
                        <img
                            src={tonalzticsOfRalos}
                            alt="Tonalztics of Ralos"
                            width="30"
                            height="30"
                            style={specIconStyle}
                        />
                    </Tooltip>
                    <TextField
                        type="number"
                        value={ralosHits}
                        onChange={(e) => {
                            const newValue = Math.max(0, Math.min(Number(e.target.value), 99));
                            handleRalosChange(newValue);
                        }}
                        variant="outlined"
                        style={textFieldStyle}
                        inputProps={{ style: { padding: 0, fontSize: "18px" }, min: 0, max: 99 }}
                    />
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Tooltip title="Bandos godsword special: removes Defence equal to the damage dealt">
                        <img src={bandosGodsword} alt="Bandos Godsword" width="30" height="30" style={specIconStyle} />
                    </Tooltip>
                    <TextField
                        type="number"
                        value={bgsDamage}
                        onChange={(e) => {
                            const newValue = Math.max(0, Math.min(Number(e.target.value), props.maxReduction));
                            handleBGSChange(newValue);
                        }}
                        variant="outlined"
                        style={{ ...textFieldStyle, width: "60px" }}
                        inputProps={{ style: { padding: 0, fontSize: "18px" }, min: 0, max: props.maxReduction }}
                    />
                </Stack>
                <Stack direction="row" alignItems="center" gap={0}>
                    <Tooltip
                        title={`Max defence reduction for ${props.bossName} is ${props.maxReduction}. Specs apply as elder maul, dragon warhammer, Tonalztics of Ralos, then Bandos godsword.`}
                        open={tooltipOpen}
                        disableHoverListener
                        arrow
                    >
                        <TextField
                            value={props.currentDefence}
                            onChange={(e) => {
                                const newValue = Math.min(Number(e.target.value), props.defenceLevel);
                                handleCurrentDefenceChange(newValue);
                            }}
                            variant="outlined"
                            style={{ ...textFieldStyle, width: "60px" }}
                            inputProps={{
                                style: { padding: 0, textAlign: "center", fontSize: "18px" },
                                min: 0,
                                max: props.defenceLevel,
                            }}
                        />
                    </Tooltip>
                    <span style={labelStyle}>/{props.defenceLevel}</span>
                    <Tooltip title={"Defence affects melee and ranged hit chance"}>
                        <img src={defenceIcon} alt="Defence" width="25" height="25" style={specIconStyle} />
                    </Tooltip>
                </Stack>
            </Stack>
        </div>
    );
}

const textFieldStyle = {
    color: "black",
    backgroundColor: "#d8ccb4",
    width: 60,
    "& label.Mui-focused": {
        color: "white",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "white",
        },
        "&:hover fieldset": {
            borderColor: "white",
        },
        "&.Mui-focused fieldset": {
            borderColor: "white",
        },
        '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button': {
            "-webkit-appearance": "none",
            margin: 0,
        },
        '& input[type="number"]': {
            "-moz-appearance": "textfield",
        },
    },
    "& .MuiInputLabel-root": {
        whiteSpace: "nowrap",
    },
};

const specIconStyle: React.CSSProperties = {
    objectFit: "contain",
};

const labelStyle: React.CSSProperties = {
    fontSize: "18px",
    marginRight: "5px",
    display: "inline-block",
    textAlign: "right",
    whiteSpace: "nowrap",
};
