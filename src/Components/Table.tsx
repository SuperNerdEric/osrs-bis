import React, {useEffect, useMemo, useState} from 'react'

import '../index.css'

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender, FilterFn,
} from '@tanstack/react-table'
import {Calculator} from "../Calculator/Calculator";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Button, ButtonBase, Checkbox, ClickAwayListener, Popper, Stack, styled, Tooltip} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {gearSets} from "../DataObjects/GearSets";
import {Slot} from "../DataObjects/Item";
import Select from 'react-select';
import TwoHandIcon from '../Images/Slots/2h_slot.png';
import AmmoIcon from '../Images/Slots/Ammo_slot.png';
import BodyIcon from '../Images/Slots/Body_slot.png';
import CapeIcon from '../Images/Slots/Cape_slot.png';
import FeetIcon from '../Images/Slots/Feet_slot.png';
import HandsIcon from '../Images/Slots/Hands_slot.png';
import HeadIcon from '../Images/Slots/Head slot.png';
import LegsIcon from '../Images/Slots/Legs_slot.png';
import NeckIcon from '../Images/Slots/Neck_slot.png';
import RingIcon from '../Images/Slots/Ring_slot.png';
import ShieldIcon from '../Images/Slots/Shield_slot.png';
import WeaponIcon from '../Images/Slots/Weapon_slot.png';
import {FilterList, Label} from "@mui/icons-material";

interface GearTableProps {
    data: Calculator[];
    columns: any;
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

const ClearFiltersButton = styled(StyledButton)`
  font-size: calc(0.4em + 0.1vw);
  white-space: nowrap;
`;


export function GearTable({data, columns}: GearTableProps) {
    type SortKey = 'dps' | 'maxHit' | 'hitChance';
    const [sortConfig, setSortConfig] = React.useState({key: 'dps' as keyof Calculator, direction: 'descending'});
    const [sortedColumn, setSortedColumn] = React.useState<string | null>(null);
    const [isSortedDesc, setIsSortedDesc] = React.useState<boolean>(false);
    const [selectedItemsBySlot, setSelectedItemsBySlot] = React.useState<Record<Slot, string[]>>({
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
    });


    const sortedData = React.useMemo(() => {
        const sortableData = [...data];
        if (sortConfig !== null) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);

    const combinedFilterFn: FilterFn<Calculator> = (row, columnId, filterValue) => {
        const rowData: Calculator = row.original;
        const gearSetWeapon = rowData.gearSet.getWeapon();
        const gearSetOffhand = rowData.gearSet.getItemBySlot(Slot.OffHand)!;

        let weaponMatch = false;

        const mainHandSelected = selectedItemsBySlot[Slot.MainHand].length > 0;
        const offHandSelected = selectedItemsBySlot[Slot.OffHand].length > 0;
        const twoHandSelected = selectedItemsBySlot[Slot.TwoHand].length > 0;

        // Using nested conditions to determine the weapon match
        if (mainHandSelected && offHandSelected && twoHandSelected) {
            weaponMatch = ((gearSetWeapon && (selectedItemsBySlot[Slot.MainHand].includes(gearSetWeapon.name) && gearSetOffhand && selectedItemsBySlot[Slot.OffHand].includes(gearSetOffhand.name))
                || selectedItemsBySlot[Slot.TwoHand].includes(gearSetWeapon.name)));
        } else if (mainHandSelected && offHandSelected) {
            weaponMatch = gearSetWeapon && selectedItemsBySlot[Slot.MainHand].includes(gearSetWeapon.name) &&
                gearSetOffhand && selectedItemsBySlot[Slot.OffHand].includes(gearSetOffhand.name);
        } else if (mainHandSelected && twoHandSelected) {
            weaponMatch = gearSetWeapon && (selectedItemsBySlot[Slot.MainHand].includes(gearSetWeapon.name) || selectedItemsBySlot[Slot.TwoHand].includes(gearSetWeapon.name));
        } else if (offHandSelected && twoHandSelected) {
            weaponMatch = (gearSetOffhand && selectedItemsBySlot[Slot.OffHand].includes(gearSetOffhand.name)) || (gearSetWeapon && selectedItemsBySlot[Slot.TwoHand].includes(gearSetWeapon.name));
        } else if (mainHandSelected) {
            weaponMatch = gearSetWeapon && selectedItemsBySlot[Slot.MainHand].includes(gearSetWeapon.name);
        } else if (offHandSelected) {
            weaponMatch = gearSetOffhand && selectedItemsBySlot[Slot.OffHand].includes(gearSetOffhand.name);
        } else if (twoHandSelected) {
            weaponMatch = gearSetWeapon && selectedItemsBySlot[Slot.TwoHand].includes(gearSetWeapon.name);
        } else {
            weaponMatch = true; // No weapon filter
        }

        let nonWeaponMatch = true;
        for (const slot in selectedItemsBySlot) {
            const slotType = Number(slot) as Slot;
            if (slotType !== Slot.MainHand && slotType !== Slot.TwoHand && slotType !== Slot.OffHand) {
                const selectedItems = selectedItemsBySlot[slotType];
                if (selectedItems.length > 0) {
                    const item = rowData.gearSet.getItemBySlot(slotType);
                    if (selectedItems.includes('None')) {
                        if (item && !selectedItems.includes(item.name)) {
                            nonWeaponMatch = false;
                            break;
                        }
                    } else if (!item || !selectedItems.includes(item.name)) {
                        nonWeaponMatch = false;
                        break;
                    }
                }
            }
        }

        return weaponMatch && nonWeaponMatch;
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
        debugTable: true,
    })

    const requestSort = (key: keyof Calculator) => {
        if (key === 'maxHit' || key === 'hitChance' || key === 'dps') {
            let direction = 'ascending';
            if (sortConfig !== null && sortConfig.key === key && sortConfig.direction === 'ascending') {
                direction = 'descending';
            }
            setSortConfig({key, direction});
            setSortedColumn(key);
            setIsSortedDesc(direction === 'descending');
        }
    }

    const slotOptions = (slot: Slot) => {
        const itemsNamesSet = new Set();
        let hasEmptySlot = false;

        const options = data.reduce((acc, rowData) => {
            const item = rowData.gearSet.getItemBySlot(slot);
            if (!item) {
                hasEmptySlot = true;
            } else if (!itemsNamesSet.has(item.name)) {
                itemsNamesSet.add(item.name);
                acc.push({value: item.name, label: item.name});
            }
            return acc;
        }, [] as Array<{ value: string; label: string }>);

        if (hasEmptySlot && slot !== Slot.MainHand && slot !== Slot.OffHand && slot !== Slot.TwoHand) {
            options.push({value: 'None', label: 'None'});
        }

        return options;
    };

    const createFilterValue = () => {
        return {selectedItemsBySlot};
    };


    React.useEffect(() => {
        const filterValue = createFilterValue();
        table.setGlobalFilter(filterValue);
    }, [selectedItemsBySlot]);

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
        setSelectedItemsBySlot({
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10: [],
            11: [],
        });
    };

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto', width: '100%'}}>
                <div style={{cursor: 'pointer', marginRight: '10px'}}>
                    <Tooltip title="Filter items by slot">
                        <FilterList/>
                    </Tooltip>
                </div>
                {Object.values(Slot).filter((slot): slot is Slot => typeof slot === 'number').map((slot) => (
                    <div style={{margin: '0 1px'}}>
                        <SlotDropdown
                            key={slot}
                            slot={slot}
                            selectedItems={selectedItemsBySlot[slot]}
                            onItemSelect={(selected) => {
                                setSelectedItemsBySlot(prev => ({
                                    ...prev,
                                    [slot]: selected?.map(s => s.value) || [],
                                }));
                            }}
                            options={slotOptions(slot)}
                        />
                    </div>
                ))}
                <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
                    {isClearButtonVisible ? (
                        <ClearFiltersButton onClick={clearAllFilters}>Clear Filters</ClearFiltersButton>
                    ) : (
                        <div style={{width: '100%', height: '100%', visibility: 'hidden'}}>
                            <ClearFiltersButton>Clear Filters</ClearFiltersButton>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-2">
                <div className="h-2"/>
                <table>
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} onClick={() => requestSort(header.id as SortKey)}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    {sortedColumn === header.id ? (isSortedDesc ? <ArrowDropDownIcon/> :
                                        <ArrowDropUpIcon/>) : null}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div className="h-2"/>
                <Stack direction="column" alignItems="center" justifyContent="center" gap={1}
                       sx={{marginBottom: '40px'}}>
                    <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                        <StyledIconButton onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                            <FirstPageIcon/>
                        </StyledIconButton>
                        <StyledIconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            <NavigateBeforeIcon/>
                        </StyledIconButton>
                        <StyledIconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            <NavigateNextIcon/>
                        </StyledIconButton>
                        <StyledIconButton onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                          disabled={!table.getCanNextPage()}>
                            <LastPageIcon/>
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
    )
}

type OptionType = { label: string; value: string };


function SlotDropdown({
                          slot,
                          selectedItems,
                          onItemSelect,
                          options
                      }: {
    slot: Slot,
    selectedItems: string[],
    onItemSelect: (selected: OptionType[] | null, actionMeta: any) => void,
    options: OptionType[]
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

    const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        if (!open) {
            setAnchorEl(null);
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{display: 'inline-block', marginRight: '1px'}}>
            <ButtonBase
                sx={{
                    '&:hover': {
                        backgroundColor: '#d8ccb4',
                    }
                }}
            >
                <div onClick={toggleOptions} style={{position: 'relative'}}>
                    {slotIcons[slot]}
                    <span style={{
                        position: 'absolute',
                        bottom: '5px',           // Adjust as per your need
                        left: '5px',          // Adjust as per your need
                        borderRadius: '50%',      // Optional: To make it round
                        padding: '0px 0px'        // Padding around the number
                    }}>
                    {selectedItems.length}
                </span>
                </div>
            </ButtonBase>

            <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={handleClose}>
                    <div style={{
                        backgroundColor: '#d8ccb4',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        marginTop: '5px'
                    }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{width: '90%', padding: '2px'}}
                        />
                        {filteredOptions.map(option => (
                            <div key={option.value} style={{padding: '5px', display: 'flex', alignItems: 'center'}}>
                                <Checkbox
                                    size="small"
                                    color="default"
                                    checked={selectedItems.includes(option.value)}
                                    onChange={() => {
                                        const isSelected = selectedItems.includes(option.value);
                                        const updatedItems = isSelected
                                            ? selectedItems.filter(item => item !== option.value)
                                            : [...selectedItems, option.value];
                                        onItemSelect(updatedItems.map(item => ({value: item, label: item})), null);
                                    }}
                                    style={{color: "black"}}
                                />

                                <span style={{color: 'black', fontSize: '18px'}}>{option.label}</span>
                            </div>
                        ))}
                    </div>
                </ClickAwayListener>
            </Popper>
        </div>
    );
}


const slotIcons = {
    [Slot.MainHand]: <img src={WeaponIcon} alt="Weapon icon" className="icon-size"/>,
    [Slot.OffHand]: <img src={ShieldIcon} alt="Shield icon" className="icon-size"/>,
    [Slot.TwoHand]: <img src={TwoHandIcon} alt="Two-handed weapon icon" className="icon-size"/>,
    [Slot.Ammo]: <img src={AmmoIcon} alt="Ammo icon" className="icon-size"/>,
    [Slot.Helm]: <img src={HeadIcon} alt="Helm icon" className="icon-size"/>,
    [Slot.Chest]: <img src={BodyIcon} alt="Chest icon" className="icon-size"/>,
    [Slot.Legs]: <img src={LegsIcon} alt="Leg icon" className="icon-size"/>,
    [Slot.Gloves]: <img src={HandsIcon} alt="Gloves icon" className="icon-size"/>,
    [Slot.Boots]: <img src={FeetIcon} alt="Boots icon" className="icon-size"/>,
    [Slot.Neck]: <img src={NeckIcon} alt="Neck icon" className="icon-size"/>,
    [Slot.Cape]: <img src={CapeIcon} alt="Cape icon" className="icon-size"/>,
    [Slot.Ring]: <img src={RingIcon} alt="Ring icon" className="icon-size"/>,
}
