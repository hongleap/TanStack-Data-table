'use client'

import React from 'react'
import DataTable from 'react-data-table-component'
import { TableColumn } from 'react-data-table-component';

type Movie = {
    id: number;
    title: string;
    year: string;
}
const columns: TableColumn<Movie>[] = [
    {
        name: 'Title',
        selector: (row: Movie) => row.title,
    },
    {
        name: 'Year',
        selector: (row: Movie) => row.year,
    },
];
const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

export default function AdminBashboard() {
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                keyField='id'
            />
        </div>
    )
}
