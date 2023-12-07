import React, {useState, useEffect} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {getAllCustomers} from './api';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './App.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState ([]);
    const [originalCustomers, setOriginalCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        getAllCustomers()
        .then(info => {
            const notNullCustomers = info.content.filter(customer => (
                customer.firstname !== null && customer.lastname !== null &&
                customer.streetaddress !== null && customer.postcode != null &&
                customer.city !== null && customer.email !== null &&
                customer.phone !== null
            ));

            setCustomers(notNullCustomers);
            setOriginalCustomers(notNullCustomers);
        })
        .catch(error => console.log(error))
    };

    const columnDefs = [
        {headerName: 'First Name', field: 'firstname', width: 150},
        {headerName: 'Last Name', field: 'lastname', width: 150},
        {headerName: 'Street Address', field: 'streetaddress', width: 200},
        {headerName: 'Postcode', field: 'postcode', width: 100},
        {headerName: 'City', field: 'city', width: 150},
        {headerName: 'Email', field: 'email', width: 200},
        {headerName: 'Phone', field: 'phone', width: 150},
    ];

    const onSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        doSearch(newSearchTerm);
    };

    const doSearch = (term) => {

        if (term.trim() === '') {
            setCustomers(originalCustomers);
        } else {
        const filterCustomers = customers.filter(customer => {
            return (
                customer.firstname.toLowerCase().includes(term.toLowerCase()) ||
                customer.lastname.toLowerCase().includes(term.toLowerCase()) ||
                customer.streetaddress.toLowerCase().includes(term.toLowerCase()) ||
                customer.postcode.toString().includes(term.toLowerCase()) ||
                customer.city.toLowerCase().includes(term.toLowerCase()) ||
                customer.email.toLowerCase().includes(term.toLowerCase()) ||
                customer.phone.toString().includes(term.toLowerCase())
              );
        });
        setCustomers(filterCustomers);
        };
    };

    return (
        <div className="ag-theme-material" style={{ height: '400px', width: '1150px' }}>
            <input type="text" placeholder="Search term" value={searchTerm} onChange={onSearchChange}/>
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
            />
        </div>
    )
}

export default CustomerList;