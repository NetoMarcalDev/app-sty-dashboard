import React from 'react';
import Dashboard from '../../components/Dashboard/index';
import UserSettings from '../../globals/UserSettings';

export default function DashboardPage() {
   
    return(
        <Dashboard user={ UserSettings.default } />
    )
}