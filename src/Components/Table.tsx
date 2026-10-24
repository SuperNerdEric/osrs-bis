import React, { useEffect, useState } from "react";

import "../index.css";

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    FilterFn,
    ColumnDef,
} from "@tanstack/react-table";
import { Calculator } from "../Calculator/Calculator";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button, ButtonBase, Checkbox, ClickAwayListener, Popper, Stack, styled, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Slot } from "../Calculator/DataObjects/Item";
import TwoHandIcon from "../Images/Slots/2h_slot.png";
import AmmoIcon from "../Images/Slots/Ammo_slot.png";
import BodyIcon from "../Images/Slots/Body_slot.png";
import CapeIcon from "../Images/Slots/Cape_slot.png";
import FeetIcon from "../Images/Slots/Feet_slot.png";
import HandsIcon from "../Images/Slots/Hands_slot.png";
import HeadIcon from "../Images/Slots/Head slot.png";
import LegsIcon from "../Images/Slots/Legs_slot.png";
import NeckIcon from "../Images/Slots/Neck_slot.png";
import RingIcon from "../Images/Slots/Ring_slot.png";
import ShieldIcon from "../Images/Slots/Shield_slot.png";
import WeaponIcon from "../Images/Slots/Weapon_slot.png";
import { FilterList } from "@mui/icons-material";

interface GearTableProps {
    data: Calculator[];
    columns: ColumnDef<Calculator>[];
    gearSets: Array<{ getItemBySlot(slot: Slot): { name: string } | undefined }>;
    filterStateRef: React.MutableRefObject<GearFilterState>;
    onFiltersChange: (filters: GearFilterState) => void;
}

const StyledIconButton = styled(IconButton)`
    color: black;
    background-color: #d8ccb4;
    padding: 8px;
    border: 1px solid #ccc;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: white;
        color: black;
    }

    &:disabled {
        color: #888;
        background-color: #ccc;
    }
`;

const StyledButton = styled(Button)`
    color: black;
    background-color: #d8ccb4;
    padding: 0px 4px;
    border: 1px solid #ccc;
    transition: background-color 0.3s ease;
    font-size: 16px;
    font-weight: bold;

    &:hover {
        background-color: white;
        color: black;
    }

    &:disabled {
        color: #888;
        background-color: #ccc;
    }
`;

export type SlotFilterMode = "include" | "exclude";

export interface GearFilterState {
    selected: Record<Slot, string[]>;
    modes: Record<Slot, SlotFilterMode>;
}

type OptionType = { label: string; value: string };

const slotKeys = Object.values(Slot).filter((slot): slot is Slot => typeof slot === "number");

function emptySlotSelections(): Record<Slot, string[]> {
    return slotKeys.reduce(
        (selections, slot) => {
            selections[slot] = [];
            return selections;
        },
        {} as Record<Slot, string[]>,
    );
}

function defaultFilterModes(): Record<Slot, SlotFilterMode> {
    return slotKeys.reduce(
        (modes, slot) => {
            modes[slot] = "include";
            return modes;
        },
        {} as Record<Slot, SlotFilterMode>,
    );
}

export function emptyGearFilterState(): GearFilterState {
    return { selected: emptySlotSelections(), modes: defaultFilterModes() };
}

const optionSlots = slotKeys.filter((slot) => slot !== Slot.TwoHand);

export function collectSlotOptions(
    gearSets: Array<{ getItemBySlot(slot: Slot): { name: string } | undefined }>,
): Record<Slot, OptionType[]> {
    const names = {} as Record<Slot, Set<string>>;
    const hasEmpty = {} as Record<Slot, boolean>;
    for (const slot of optionSlots) {
        names[slot] = new Set();
        hasEmpty[slot] = false;
    }

    for (const gearSet of gearSets) {
        for (const slot of optionSlots) {
            const sourceSlots = slot === Slot.MainHand ? [Slot.MainHand, Slot.TwoHand] : [slot];
            for (const sourceSlot of sourceSlots) {
                const item = gearSet.getItemBySlot(sourceSlot);
                if (!item) {
                    hasEmpty[slot] = true;
                } else {
                    names[slot].add(item.name);
                }
            }
        }
    }

    const options = {} as Record<Slot, OptionType[]>;
    for (const slot of slotKeys) {
        const slotOptions = Array.from(names[slot] || [], (name) => ({ value: name, label: name }));
        slotOptions.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" }));
        if (hasEmpty[slot] && slot !== Slot.MainHand && slot !== Slot.OffHand && slot !== Slot.TwoHand) {
            slotOptions.unshift({ value: "None", label: "None" });
        }
        options[slot] = slotOptions;
    }
    return options;
}

function slotSelectionMatches(selectedItems: string[], itemName: string | undefined): boolean {
    if (!itemName) {
        return selectedItems.includes("None");
    }
    return selectedItems.includes(itemName);
}

export function gearSetMatchesFilters(
    gearSet: Calculator["gearSet"],
    selectedItemsBySlot: Record<Slot, string[]>,
    filterModeBySlot: Record<Slot, SlotFilterMode>,
): boolean {
    const includeActive = (slot: Slot) => filterModeBySlot[slot] === "include" && selectedItemsBySlot[slot].length > 0;
    const excludeActive = (slot: Slot) => filterModeBySlot[slot] === "exclude" && selectedItemsBySlot[slot].length > 0;

    const mainHandItem = gearSet.getItemBySlot(Slot.MainHand);
    const twoHandItem = gearSet.getItemBySlot(Slot.TwoHand);
    const offhandItem = gearSet.getItemBySlot(Slot.OffHand);
    const weaponItem = twoHandItem || mainHandItem;
    const weaponNames = selectedItemsBySlot[Slot.MainHand];
    const offhandNames = selectedItemsBySlot[Slot.OffHand];
    const weaponInclude = includeActive(Slot.MainHand);
    const offhandInclude = includeActive(Slot.OffHand);

    // Two-handed weapons are chosen from the weapon list. An offhand filter still
    // applies to one-handed setups, and a selected two-handed weapon is kept either way.
    let weaponMatch = true;
    if (weaponInclude && offhandInclude) {
        const oneHandMatch = Boolean(
            mainHandItem &&
            weaponNames.includes(mainHandItem.name) &&
            offhandItem &&
            offhandNames.includes(offhandItem.name),
        );
        const twoHandMatch = Boolean(twoHandItem && weaponNames.includes(twoHandItem.name));
        weaponMatch = oneHandMatch || twoHandMatch;
    } else if (weaponInclude) {
        weaponMatch = Boolean(weaponItem && weaponNames.includes(weaponItem.name));
    } else if (offhandInclude) {
        weaponMatch = Boolean(offhandItem && offhandNames.includes(offhandItem.name));
    }

    if (!weaponMatch) {
        return false;
    }

    if (excludeActive(Slot.MainHand) && weaponItem && weaponNames.includes(weaponItem.name)) {
        return false;
    }
    if (excludeActive(Slot.OffHand) && slotSelectionMatches(offhandNames, offhandItem?.name)) {
        return false;
    }

    const weaponSlots = [Slot.MainHand, Slot.OffHand, Slot.TwoHand];
    for (const slot of slotKeys) {
        if (weaponSlots.includes(slot)) {
            continue;
        }
        const selectedItems = selectedItemsBySlot[slot];
        const equipped = gearSet.getItemBySlot(slot);
        if (includeActive(slot)) {
            if (selectedItems.includes("None")) {
                if (equipped && !selectedItems.includes(equipped.name)) {
                    return false;
                }
            } else if (!equipped || !selectedItems.includes(equipped.name)) {
                return false;
            }
        }
        if (excludeActive(slot) && slotSelectionMatches(selectedItems, equipped?.name)) {
            return false;
        }
    }

    return true;
}

const ClearFiltersButton = styled(StyledButton)`
    min-width: 20px;
    font-size: calc(0.4em + 0.1vw);
    white-space: nowrap;
`;

export function GearTable({ data, columns, gearSets, filterStateRef, onFiltersChange }: GearTableProps) {
    type SortKey = "dps" | "maxHit" | "hitChance";
    const [sortConfig, setSortConfig] = React.useState({ key: "dps" as keyof Calculator, direction: "descending" });
    const [sortedColumn, setSortedColumn] = React.useState<string | null>(null);
    const [isSortedDesc, setIsSortedDesc] = React.useState<boolean>(false);
    const [selectedItemsBySlot, setSelectedItemsBySlot] = React.useState<Record<Slot, string[]>>(emptySlotSelections);
    const [filterModeBySlot, setFilterModeBySlot] = React.useState<Record<Slot, SlotFilterMode>>(defaultFilterModes);

    const sortedData = React.useMemo(() => {
        const sortableData = data.slice();
        const direction = sortConfig.direction === "ascending" ? 1 : -1;
        sortableData.sort((a, b) => (Number(a[sortConfig.key]) - Number(b[sortConfig.key])) * direction);
        return sortableData;
    }, [data, sortConfig]);

    const combinedFilterFn: FilterFn<Calculator> = (row) => {
        return gearSetMatchesFilters(row.original.gearSet, selectedItemsBySlot, filterModeBySlot);
    };

    const table = useReactTable({
        initialState: {
            pagination: {
                pageSize: 15,
            },
        },
        data: sortedData,
        columns,
        globalFilterFn: combinedFilterFn,
        getRowId: (originalRow) => originalRow.id,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const requestSort = (key: keyof Calculator) => {
        if (key === "maxHit" || key === "hitChance" || key === "dps") {
            let direction = "ascending";
            if (sortConfig !== null && sortConfig.key === key && sortConfig.direction === "ascending") {
                direction = "descending";
            }
            setSortConfig({ key, direction });
            setSortedColumn(key);
            setIsSortedDesc(direction === "descending");
        }
    };

    const optionsBySlot = React.useMemo(() => collectSlotOptions(gearSets), [gearSets]);
    filterStateRef.current = { selected: selectedItemsBySlot, modes: filterModeBySlot };

    const setFilterMode = React.useCallback((slot: Slot, mode: SlotFilterMode) => {
        setFilterModeBySlot((previous) => ({
            ...previous,
            [slot]: mode,
        }));
    }, []);

    const setFilterItems = React.useCallback((slot: Slot, selected: OptionType[] | null) => {
        setSelectedItemsBySlot((previous) => ({
            ...previous,
            [slot]: selected?.map((item) => item.value) || [],
        }));
    }, []);

    React.useEffect(() => {
        table.setGlobalFilter({ selectedItemsBySlot, filterModeBySlot });
        table.setPageIndex(0);
        onFiltersChange({ selected: selectedItemsBySlot, modes: filterModeBySlot });
    }, [selectedItemsBySlot, filterModeBySlot]);

    const areAnyFiltersApplied = (filters: Record<Slot, string[]>) => {
        for (const key in filters) {
            if (filters[Number(key) as Slot].length > 0) {
                return true;
            }
        }
        return false;
    };

    const isClearButtonVisible = areAnyFiltersApplied(selectedItemsBySlot);

    const clearAllFilters = () => {
        setSelectedItemsBySlot(emptySlotSelections());
        setFilterModeBySlot(defaultFilterModes());
    };
    const isMobile = window.innerWidth <= 600;

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    overflowX: "auto",
                    width: "100%",
                    alignItems: "center",
                }}
            >
                {isMobile ? (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "right",
                            marginTop: "5px",
                            marginBottom: "3px",
                        }}
                    >
                        <ClearFiltersButton
                            style={{ visibility: isClearButtonVisible ? "visible" : "hidden" }}
                            onClick={clearAllFilters}
                        >
                            Clear Filters
                        </ClearFiltersButton>
                    </div>
                ) : null}

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <div style={{ cursor: "pointer", marginRight: "0px", display: isMobile ? "none" : "block" }}>
                        <Tooltip title="Include or exclude items by slot">
                            <FilterList />
                        </Tooltip>
                    </div>

                    {Object.values(Slot)
                        .filter((slot): slot is Slot => typeof slot === "number" && slot !== Slot.TwoHand)
                        .map((slot) => (
                            <div key={slot} style={{ margin: "0 0px" }}>
                                <SlotDropdown
                                    key={slot}
                                    slot={slot}
                                    mode={filterModeBySlot[slot]}
                                    selectedItems={selectedItemsBySlot[slot]}
                                    onModeChange={setFilterMode}
                                    onItemSelect={setFilterItems}
                                    options={optionsBySlot[slot]}
                                />
                            </div>
                        ))}

                    {!isMobile ? (
                        <div style={{ marginLeft: "auto", marginRight: "3px" }}>
                            <ClearFiltersButton
                                style={{ visibility: isClearButtonVisible ? "visible" : "hidden" }}
                                onClick={clearAllFilters}
                            >
                                Clear Filters
                            </ClearFiltersButton>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="p-2">
                <div className="h-2" />
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} onClick={() => requestSort(header.id as SortKey)}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                        {sortedColumn === header.id ? (
                                            isSortedDesc ? (
                                                <ArrowDropDownIcon />
                                            ) : (
                                                <ArrowDropUpIcon />
                                            )
                                        ) : null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="h-2" />
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    sx={{ marginBottom: "40px" }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                        <StyledIconButton onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                            <FirstPageIcon />
                        </StyledIconButton>
                        <StyledIconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            <NavigateBeforeIcon />
                        </StyledIconButton>
                        <StyledIconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            <NavigateNextIcon />
                        </StyledIconButton>
                        <StyledIconButton
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <LastPageIcon />
                        </StyledIconButton>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </strong>
                    </Stack>
                </Stack>
            </div>
        </div>
    );
}

function FilterModeButton({
    active,
    exclude,
    onClick,
    children,
}: {
    active: boolean;
    exclude?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    const background = active ? (exclude ? "#7a1f1f" : "#3d3428") : "transparent";
    const color = active ? "white" : "black";
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                flex: 1,
                border: "1px solid #3d3428",
                borderRadius: "4px",
                padding: "4px 8px",
                fontWeight: "bold",
                cursor: "pointer",
                backgroundColor: background,
                color,
            }}
        >
            {children}
        </button>
    );
}

const SlotDropdown = React.memo(function SlotDropdown({
    slot,
    mode,
    selectedItems,
    onModeChange,
    onItemSelect,
    options,
}: {
    slot: Slot;
    mode: SlotFilterMode;
    selectedItems: string[];
    onModeChange: (slot: Slot, mode: SlotFilterMode) => void;
    onItemSelect: (slot: Slot, selected: OptionType[] | null) => void;
    options: OptionType[];
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleOptions = (event: React.MouseEvent<HTMLDivElement>) => {
        setOpen((prevOpen) => !prevOpen);
        setAnchorEl(event.currentTarget);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        if (!open) {
            setAnchorEl(null);
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ display: "inline-block", marginRight: "0px" }}>
            <ButtonBase
                sx={{
                    "&:hover": {
                        backgroundColor: "#d8ccb4",
                    },
                }}
            >
                <div onClick={toggleOptions} style={{ position: "relative" }}>
                    {slotIcons[slot]}
                    <span
                        style={{
                            position: "absolute",
                            bottom: "5px",
                            left: "5px",
                            borderRadius: "8px",
                            padding: "0px 2px",
                            fontWeight: "bold",
                            color: mode === "exclude" && selectedItems.length > 0 ? "#7a1f1f" : "black",
                            backgroundColor: mode === "exclude" && selectedItems.length > 0 ? "#f3d0d0" : "transparent",
                        }}
                    >
                        {mode === "exclude" && selectedItems.length > 0
                            ? `−${selectedItems.length}`
                            : selectedItems.length}
                    </span>
                </div>
            </ButtonBase>

            {open ? (
                <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
                    <ClickAwayListener onClickAway={handleClose}>
                        <div
                            style={{
                                backgroundColor: "#d8ccb4",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                marginTop: "5px",
                                minWidth: "220px",
                            }}
                        >
                            <div style={{ display: "flex", gap: "4px", padding: "6px 6px 0" }}>
                                <FilterModeButton
                                    active={mode === "include"}
                                    onClick={() => onModeChange(slot, "include")}
                                >
                                    Include
                                </FilterModeButton>
                                <FilterModeButton
                                    active={mode === "exclude"}
                                    exclude
                                    onClick={() => onModeChange(slot, "exclude")}
                                >
                                    Exclude
                                </FilterModeButton>
                            </div>
                            <div style={{ padding: "4px 8px 0", color: "black", fontSize: "13px" }}>
                                {mode === "exclude" ? "Checked items are hidden" : "Only checked items are shown"}
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{ width: "90%", padding: "2px", margin: "6px" }}
                            />
                            <div style={{ maxHeight: "320px", overflowY: "auto" }}>
                                {filteredOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        style={{ padding: "5px", display: "flex", alignItems: "center" }}
                                    >
                                        <Checkbox
                                            size="small"
                                            color="default"
                                            checked={selectedItems.includes(option.value)}
                                            onChange={() => {
                                                const isSelected = selectedItems.includes(option.value);
                                                const updatedItems = isSelected
                                                    ? selectedItems.filter((item) => item !== option.value)
                                                    : [...selectedItems, option.value];
                                                onItemSelect(
                                                    slot,
                                                    updatedItems.map((item) => ({ value: item, label: item })),
                                                );
                                            }}
                                            style={{ color: "black" }}
                                        />

                                        <span style={{ color: "black", fontSize: "18px" }}>{option.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ClickAwayListener>
                </Popper>
            ) : null}
        </div>
    );
});

const slotIcons = {
    [Slot.MainHand]: <img src={WeaponIcon} alt="Weapon icon" className="icon-size" />,
    [Slot.OffHand]: <img src={ShieldIcon} alt="Shield icon" className="icon-size" />,
    [Slot.TwoHand]: <img src={TwoHandIcon} alt="Two-handed weapon icon" className="icon-size" />,
    [Slot.Ammo]: <img src={AmmoIcon} alt="Ammo icon" className="icon-size" />,
    [Slot.Helm]: <img src={HeadIcon} alt="Helm icon" className="icon-size" />,
    [Slot.Chest]: <img src={BodyIcon} alt="Chest icon" className="icon-size" />,
    [Slot.Legs]: <img src={LegsIcon} alt="Leg icon" className="icon-size" />,
    [Slot.Gloves]: <img src={HandsIcon} alt="Gloves icon" className="icon-size" />,
    [Slot.Boots]: <img src={FeetIcon} alt="Boots icon" className="icon-size" />,
    [Slot.Neck]: <img src={NeckIcon} alt="Neck icon" className="icon-size" />,
    [Slot.Cape]: <img src={CapeIcon} alt="Cape icon" className="icon-size" />,
    [Slot.Ring]: <img src={RingIcon} alt="Ring icon" className="icon-size" />,
};
