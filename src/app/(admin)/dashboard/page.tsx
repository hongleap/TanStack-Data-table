'use client'

import { UserType } from '@/types/userType';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { TableColumn } from 'react-data-table-component';

export default function Dashboard() {
    const [users, setUser] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}users`,);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data.users);
                setUser(data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const columns: TableColumn<UserType>[] = [
    {
        name: 'Title',
        selector: (row: UserType) => row.firstName + ' ' + row.lastName,
    },
    {
        name: 'Year',
        selector: (row: UserType) => row.age,
    },
];

    return (
        <DataTable
            title="User List"
            columns={columns}
            data={users}
            progressPending={loading}
        />
    )
}