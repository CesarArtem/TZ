import React from 'react';
import SideMenu from '../SideMenu/sidemenu.js';
import DataTables from '../DataTables/datatables.js';
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className="main-body">
            <div className="dashboard">
                <SideMenu />
                <div className="main-content">
                    <DataTables />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;