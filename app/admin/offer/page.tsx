"use client"
import http from '@/lib/request'
import { useEffect, useState } from "react"
import OrderItems from '../../userCenter/myorder/order-items'
import { DataTablePagination } from "@/components/data-table-pagination"

export default function AdminOfferPage() {
    const [orderList, setOrderList] = useState([]);
    const [labelValue, setLabelValue] = useState('2');
    const [page, setPage] = useState({ page: 1, perPage: 10 });

    useEffect(() => {
        getOfferList();
    }, [])

    const getOfferList = async (params?: any) => {
        const res = await http.get('/offer/admin-list', { params: { ...params } });
        setOrderList(res.data.data.data);
        setPage({
            ...res.data.data.meta,
            page: res.data.data.meta.currentPage,
        });
    }

    const updateList = () => {
        getOfferList(page);
    }

    const pageChange = (meta: any) => {
        setPage(meta);
        getOfferList(meta);
    }

    return (
        <div className="container mt-[2.5rem]">
            <div className='mb-[2rem]'>
                <h1 className="text-3xl font-semibold">Offer</h1>
                <p className='text-[#6A6A6A] leading-10'>Phasellus quis justo non nunc congue gravida.</p>
            </div>
            {orderList && orderList.map((item, index) => {
                return <OrderItems onUpdate={updateList} labelValue={labelValue} order_type={labelValue} key={index} item={item}></OrderItems>
            })}
            <DataTablePagination meta={page} onPageIndex={pageChange} />
        </div>
    )
}