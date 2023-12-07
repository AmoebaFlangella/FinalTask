import React, {useState, useEffect} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {getAllTrainings} from './api';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './App.css';
import {format} from 'date-fns';

const TrainingList = () => {
    const [trainings, setTrainings] = useState([]);
    const [originalTrainings, setOriginalTrainings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async() => {
        const trainingInfo = await getAllTrainings();

        const customerTraining = [];

        for(const training of trainingInfo.content){
            const customerInfo = await fetch(training.links.find((link) => link.rel === 'customer').href).then((res) => res.json());
            const customerName = `${customerInfo.firstname} ${customerInfo.lastname}`;
            customerTraining.push({...training, customerName});
        };
        setTrainings(customerTraining);
        setOriginalTrainings(customerTraining);
    };


    const columnDefs = [
        {headerName: 'Customer', field: 'customerName', width: 200},
        {headerName: 'Activity', field: 'activity', width: 500},
        {headerName: 'Duration', field: 'duration', width: 100},
        {headerName: 'Date', field: 'date', width: 150, valueFormatter: (param) => format(new Date(param.value), 'dd.MM.yyyy hh:MM'),},
    ];
        

    const onSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        doSearch(newSearchTerm);
    };

    const doSearch = (term) => {

        if (term.trim() === '') {
            setTrainings(originalTrainings);
        } else {
        const filterTrainings = trainings.filter(training => {
            return (
                training.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                training.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                training.duration.toString().includes(searchTerm.toLowerCase()) ||
                format(new Date(training.date), 'dd.MM.yyyy hh:MM').toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setTrainings(filterTrainings);
        };
    };

    return (
        <div className="ag-theme-material" style={{ height: '400px', width: '1150px' }}>
            <input type="text" placeholder="Search term" value={searchTerm} onChange={onSearchChange}/>
            <AgGridReact
                rowData={trainings}
                columnDefs={columnDefs}
            />
        </div>
    )
}

export default TrainingList;