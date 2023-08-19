import React from 'react'

import '../index.css'

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'
import {Calculator} from "../Calculator/Calculator";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Stack, styled} from "@mui/material";
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

export function GearTable({data, columns}: GearTableProps) {
    type SortKey = 'dps' | 'maxHit' | 'hitChance';
    const [sortConfig, setSortConfig] = React.useState({key: 'dps' as keyof Calculator, direction: 'descending'});
    const [sortedColumn, setSortedColumn] = React.useState<string | null>(null);
    const [isSortedDesc, setIsSortedDesc] = React.useState<boolean>(false);

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


    return (
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