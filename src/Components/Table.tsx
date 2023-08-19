import React from 'react'

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
import {Button, Checkbox, Stack, styled} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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



export function GearTable({data, columns}: GearTableProps) {
    type SortKey = 'dps' | 'maxHit' | 'hitChance';
    const [sortConfig, setSortConfig] = React.useState({key: 'dps' as keyof Calculator, direction: 'descending'});
    const [sortedColumn, setSortedColumn] = React.useState<string | null>(null);
    const [isSortedDesc, setIsSortedDesc] = React.useState<boolean>(false);
    const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);

    const showAllRows = () => {
        table.setGlobalFilter(undefined);
        setSelectedRowIds([]);
    };


    const toggleRowSelection = (rowId: string) => {
        setSelectedRowIds(prevState =>
            prevState.includes(rowId)
                ? prevState.filter(id => id !== rowId)
                : [...prevState, rowId]
        );
    };

    const hideSelectedRows = () => {
        const alreadyHiddenRows = table.getState().globalFilter || [];
        const combinedHiddenRows =[...selectedRowIds, ...alreadyHiddenRows];
        setSelectedRowIds([]);
        table.setGlobalFilter(combinedHiddenRows);
    };



    const hideSelectedRowsFilterFn: FilterFn<Calculator> = (row, columnId, filterValue) => {
        const rowData: Calculator = row.original;
        return !filterValue.includes(rowData.id);
    };


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


    const table = useReactTable({
        initialState: {
            pagination: {
                pageSize: 15,
            },
        },
        data: sortedData,
        columns,
        globalFilterFn: hideSelectedRowsFilterFn,
        getRowId: (originalRow) => originalRow.id,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    })

    const areAllRowsSelected = table.getRowModel().rows.every(row => selectedRowIds.includes(row.id));

    const toggleAllRowSelections = () => {
        if (areAllRowsSelected) {
            // If all rows on the page are selected, deselect them
            const newSelectedRowIds = selectedRowIds.filter(rowId => !table.getRowModel().rows.some(row => row.id === rowId));
            setSelectedRowIds(newSelectedRowIds);
        } else {
            // If not all rows on the page are selected, select all of them
            const newSelectedRowIds = [...selectedRowIds, ...table.getRowModel().rows.map(row => row.id)];
            setSelectedRowIds(newSelectedRowIds);
        }
    };

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

    return (
        <div className="p-2">
            <div className="h-2"/>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3px', minHeight: '30px' }}>
                <Stack direction="row" spacing={1}>
                    {selectedRowIds.length !== 0 && (
                        <StyledButton onClick={hideSelectedRows}>
                            Hide ({selectedRowIds.length})
                        </StyledButton>
                    )}
                    {table.getState().globalFilter !== undefined && (
                        <StyledButton onClick={showAllRows}>
                            Show ({table.getState().globalFilter.length})
                        </StyledButton>
                    )}
                </Stack>
            </div>
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        <th>
                            <Checkbox
                                size="small"
                                checked={areAllRowsSelected}
                                onChange={toggleAllRowSelections}
                            />
                        </th>
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
                            <td>
                                <Checkbox size="small"
                                    checked={selectedRowIds.includes(row.id)}
                                    onChange={() => toggleRowSelection(row.id)}
                                />
                            </td>
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
            <Stack direction="column" alignItems="center" justifyContent="center" gap={1} sx={{marginBottom: '40px'}}>
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
    )
}