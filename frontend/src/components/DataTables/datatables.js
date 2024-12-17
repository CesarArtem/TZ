import React, {useState, useEffect, useCallback} from 'react';
import type { GridReadyEvent, IDatasource } from "ag-grid-community";
import type { CustomCellRendererProps } from "ag-grid-react";
import {InfiniteRowModelModule, ModuleRegistry, ValidationModule, RowSelectionModule} from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';
import DataTableActions from '../DataTableActions/datatableactions';
import EmployeeForm from "../Form/EmployeeForm";

ModuleRegistry.registerModules([InfiniteRowModelModule, ValidationModule, RowSelectionModule]);

const DataTables = () => {

    const [selectedRow, setselectedRow] = useState();

    const gridOptions = {
        rowModelType: 'infinite',
        datasource: []
    };

    useEffect(() => {
        fetchMainTableData();
        fetchRelatedTableData();
    }, []);

    function fetchMainTableData() {
        fetch(`http://localhost:3003/api/employees/`, {
            method: 'GET',
            mode: 'cors'
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data.data)
            gridOptions.datasource=data.data
        });
    }

    function fetchRelatedTableData() {
        fetch('http://localhost:3003/api/departments/', {
            method: 'GET',
            mode: 'cors'
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data.data)
        });
    }

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch("http://localhost:3003/api/employees/", {
            method: 'GET',
            mode: 'cors'
        })
            .then((resp) => resp.json())
            .then((data) => {
                const dataSource: IDatasource = {
                    rowCount: undefined,
                    getRows: (params) => {
                        console.log(
                            "asking for " + params.startRow + " to " + params.endRow,
                        );
                        setTimeout(function () {
                            const rowsThisPage = data.data.slice(params.startRow, params.endRow);
                            let lastRow = -1;
                            if (data.data.length <= params.endRow) {
                                lastRow = data.data.length;
                            }
                            params.successCallback(rowsThisPage, lastRow);
                        }, 500);
                    },
                };
                params.api.setGridOption("datasource", dataSource);
            });
    }, []);

    const onGridReadyRelatedTable = useCallback((params: GridReadyEvent) => {
        fetch("http://localhost:3003/api/departments/", {
            method: 'GET',
            mode: 'cors'
        })
            .then((resp) => resp.json())
            .then((data) => {
                const dataSource: IDatasource = {
                    rowCount: undefined,
                    getRows: (params) => {
                        console.log(
                            "asking for " + params.startRow + " to " + params.endRow,
                        );
                        setTimeout(function () {
                            const rowsThisPage = data.data.slice(params.startRow, params.endRow);
                            let lastRow = -1;
                            if (data.data.length <= params.endRow) {
                                lastRow = data.data.length;
                            }
                            params.successCallback(rowsThisPage, lastRow);
                        }, 500);
                    },
                };
                params.api.setGridOption("datasource", dataSource);
            });
    }, []);

    const columnDefs = [
        {headerName: "Имя", field: "first_name", cellRenderer: (props: CustomCellRendererProps) => {
                if (props.value !== undefined) {
                    return props.value;
                } else {
                    return (
                        <img src="https://www.ag-grid.com/example-assets/loading.gif" />
                    );
                }
            },},
        {headerName: "Фамилия", field: "last_name", cellRenderer: (props: CustomCellRendererProps) => {
                if (props.value !== undefined) {
                    return props.value;
                } else {
                    return (
                        <img src="https://www.ag-grid.com/example-assets/loading.gif" />
                    );
                }
            },},
        {headerName: "Отчество", field: "otchestvo", cellRenderer: (props: CustomCellRendererProps) => {
                if (props.value !== undefined) {
                    return props.value;
                } else {
                    return (
                        <img src="https://www.ag-grid.com/example-assets/loading.gif" />
                    );
                }
            },},
        {headerName: "Дата рождения", field: "birth_date", cellRenderer: (props: CustomCellRendererProps) => {
                if (props.value !== undefined) {
                    return props.value;
                } else {
                    return (
                        <img src="https://www.ag-grid.com/example-assets/loading.gif" />
                    );
                }
            },},
        {headerName: "Зарплата", field: "salary", cellRenderer: (props: CustomCellRendererProps) => {
                if (props.value !== undefined) {
                    return props.value;
                } else {
                    return (
                        <img src="https://www.ag-grid.com/example-assets/loading.gif" />
                    );
                }
            },},
        {headerName: "Отдел", field: "department_id", cellRenderer: (props: CustomCellRendererProps) => {
                if (props.value !== undefined) {
                    return props.value;
                } else {
                    return (
                        <img src="https://www.ag-grid.com/example-assets/loading.gif" />
                    );
                }
            },}
    ];

    const gridRef = React.useRef();

    function getSelectedRows() {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        setselectedRow(selectedNodes.map(node => node.data));
        console.log(selectedRow);
    }

    return (
        <div className="data-tables" style={{display: "block"}}>
            <EmployeeForm selectedRow={selectedRow} />
            <div style={{height: 500}}>

                <AgGridReact
                    ref={gridRef}
                    columnDefs={columnDefs}
                    rowBuffer={0}
                    rowModelType={"infinite"}
                    cacheBlockSize={100}
                    cacheOverflowSize={2}
                    maxConcurrentDatasourceRequests={1}
                    infiniteInitialRowCount={1000}
                    maxBlocksInCache={10}
                    onGridReady={onGridReady}
                    rowSelection={"single"}
                    onSelectionChanged={getSelectedRows}
                />
            </div>
            <div style={{height: 300, marginTop: 50}}>
                <AgGridReact
                    rowModelType={"infinite"}
                    cacheBlockSize={100}
                    cacheOverflowSize={2}
                    maxConcurrentDatasourceRequests={1}
                    infiniteInitialRowCount={1000}
                    maxBlocksInCache={10}
                    onGridReady={onGridReadyRelatedTable}
                    columnDefs={[{headerName: "Отдел", field: "name_department", cellRenderer: (props: CustomCellRendererProps) => {
                            if (props.value !== undefined) {
                                return props.value;
                            } else {
                                return (
                                    <img src="https://www.ag-grid.com/example-assets/loading.gif" />
                                );
                            }
                        },}]}
                />
            </div>
        </div>
    );
};
export default DataTables;