
import React, { forwardRef, useMemo, useEffect, useState, useImperativeHandle } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

//correct url to actual restcountries API  (https://restcountries.eu is unobtainable) 
const url = 'https://restcountries.com/v2/all'

const CountriesList = forwardRef((props, ref) => {

 //Setting important initial states to null
const [countries, setCountries] = useState([null]);
const [gridApi, setGridApi] = useState(null);

const onGridReady = (params) => {
    setGridApi(params.api);
    }
    
    //imperative handle for testing tools
    useImperativeHandle(ref, () => {
        return {
            getApi() {
                return gridApi;
            }
        }
    });

    //AgGrid column definitions with important params
    const columnDefs = useMemo( ()=> [
        { field: 'alpha3Code', headerName: "Code", maxWidth: 100},
        { field: 'name', filter: "agTextColumnFilter", suppressMenu: true }, 
        { field: 'capital', filter: "agTextColumnFilter", suppressMenu: true},
        { field: 'subregion', filter:"agTextColumnFilter", suppressMenu: true}
    ], []); 
    

    //asynchronously fetching data with restcountries API and setting countries
    const fetchCountrydata = async() => {
        const response = await fetch(url)
        const countries = await response.json()
        setCountries(countries)
    }

    //using fetch function
    useEffect(() => {
        fetchCountrydata()
    }, [])

    //Query input handling and quick filtering
    const onInputChange = (e) => {
        gridApi.setQuickFilter(e.target.value);
    }

    return(   
        <div className="container">
            <section className="searchSection">
                Search query&rarr;
                <input id="searchBar" type="text" onChange={onInputChange} placeholder="Poland"/>
            </section>
            <div className="ag-theme-alpine">
                <AgGridReact
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100,
                        
                        //important for additional filters
                        floatingFilter: true
                    }}
                    columnDefs={columnDefs}
                    rowData={countries}
                    onGridReady={onGridReady}
                    animateRows="true"
                    pagination="true" 
                />
            </div>
        </div>
    )
    })

export default CountriesList