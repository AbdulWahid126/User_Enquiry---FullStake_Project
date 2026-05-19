import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import EnquiryList from './enquiry/enquiryList';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';

export default function () {

    let [enquiryList, setEnquiryList] = useState([])
    let [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    let saveEnquiry = (e) => {

        e.preventDefault();

        // let formData = {
        //     name: e.target.name.value,
        //     email: e.target.email.value,
        //     phone: e.target.phone.value,
        //     message: e.target.message.value,
        // }

        axios.post("http://localhost:8020/api/website/enquiry/insert", formData)
            .then((res) => {
                console.log(res.data)
                toast.success('Enquiry Saved Successfully')

                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                })
                getAllEnquiry()
            })
    }

    let getAllEnquiry = () => {
        axios.get('http://localhost:8020/api/website/enquiry/view')
        .then((res) => {
            return res.data
        })
        .then((finalData) => {
            if (finalData.status) {
                setEnquiryList(finalData.enquiryList)
            }
        })
    }

    let getValue = (e) => {
        let inputName = e.target.name
        let inputValue = e.target.value

        let oldData = { ...formData };
        oldData[inputName] = inputValue;
        setFormData(oldData)
    }

    useEffect(() => {
        getAllEnquiry()
    }, [])

    return (
        <div>
            <ToastContainer />
            <h1 className='text-[40px] text-center py-6 font-bold'>User Enquiry</h1>

            <div className='grid grid-cols-[30%_auto] gap-10'>
                <div className='bg-gray-300 p-4'>
                    <h2 className='text-[20px] font-bold'>Enquiry Form</h2>
                    <form action="" onSubmit={saveEnquiry}>
                        <div className='py-3'>
                            <Label htmlFor='name'>Your Name</Label>
                            <TextInput type='text' value={formData.name} onChange={getValue} name='name' placeholder='Enter Your Name' required />
                        </div>
                        <div className='py-3'>
                            <Label htmlFor='email'>Email</Label>
                            <TextInput type='text' value={formData.email} onChange={getValue} name='email' placeholder='Enter Your Email' required />
                        </div>
                        <div className='py-3'>
                            <Label htmlFor='phone'>Phone</Label>
                            <TextInput type='text' value={formData.phone} onChange={getValue} name='phone' placeholder='Enter Your Phone' required />
                        </div>
                        <div className='py-3'>
                            <Label htmlFor='message'>Message</Label>
                            <Textarea name='message' value={formData.message} onChange={getValue} placeholder="Leave a comment..." required rows={4} />
                        </div>
                        <div className='py-3'>
                            <Button type='submit' className='w-[100%]'>Save</Button>
                        </div>
                    </form>
                </div>

                <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry} Swal={Swal} />

            </div>
        </div>
    )
}
