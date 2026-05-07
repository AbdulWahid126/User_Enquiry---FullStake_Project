import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function EnquiryList({ data }) {
    return (
        <div className='bg-gray-300 p-4'>
            <h2 className='text-[20px] font-bold mb-4'>Enquiry List</h2>
            <div className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Sr No</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Phone</TableHeadCell>
                            <TableHeadCell>Massage</TableHeadCell>
                            <TableHeadCell>
                                <span>Delete</span>
                            </TableHeadCell>
                            <TableHeadCell>
                                <span>Edit</span>
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className="divide-y">
                        {
                            data.length >= 1 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                            <TableCell>(index+1)</TableCell>
                                            <TableCell>(item.name)</TableCell>
                                            <TableCell>(item.email)</TableCell>
                                            <TableCell>(item.phone)</TableCell>
                                            <TableCell>(item.message)</TableCell>
                                            <TableCell>
                                                <button className='bg-red-500 text-white px-4 py-1 rounded-md'>Delete</button>
                                            </TableCell>
                                            <TableCell>
                                                <button className='bg-blue-500 text-white px-4 py-1 rounded-md'>Edit</button>
                                            </TableCell>
                                        </tr>
                                    )
                                })
                                :
                                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <TableCell colSpan={7} className='text-center'>No Data Found</TableCell>
                                </TableRow>
                        }

                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
