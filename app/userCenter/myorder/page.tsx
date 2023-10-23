"use client"
import http from '@/lib/request'
import OrderItems from './order-items'
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DataTablePagination } from "@/components/data-table-pagination"

export default function MyorderPage() {
  const [orderList, setOrderList] = useState([]);
  const [labelValue, setLabelValue] = useState('0');
  const [page, setPage] = useState({ page: 1, perPage: 10 });

  useEffect(() => {
    getOrderList();
  }, [])

  const label = [
    {
      value: '0',
      label: 'Buy Order',
    },
    {
      value: '1',
      label: 'Sell Order',
    },
    {
      value: '2',
      label: 'Publish Offer',
    },
  ]

  const getOrderList = async (type: string = 'buy', params?: any) => {
    const res = await http.get(`/order/list`, { params: { type: type, ...params } });
    setOrderList(res.data.data.data);
    setPage({
      ...res.data.data.meta,
      page: res.data.data.meta.currentPage,
    });
  }

  const getOfferList = async (params?: any) => {
    const res = await http.get('/offer/list', { params: {...params} });
    setOrderList(res.data.data.data);
    setPage({
      ...res.data.data.meta,
      page: res.data.data.meta.currentPage,
    });
  }


  const labelOnChange = (value: string) => {
    setOrderList([]);
    setPage({ page: 1, perPage: 10 });
    setLabelValue(value);
    switch (value) {
      case '0':
        getOrderList('buy');
        break;
      case '1':
        getOrderList('sell');
        break;
      case '2':
        getOfferList();
        break;
    }
  }

  const updateList = () => {
    switch (labelValue) {
      case '0':
        getOrderList('buy', page);
        break;
      case '1':
        getOrderList('sell', page);
        break;
      case '2':
        getOfferList(page);
        break;
    }
  }

  const pageChange = (meta: any) => {
    setPage(meta);
    getOrderList(labelValue === '0' ? 'buy' : 'sell', meta);
  }

  return (
    <div className="container mt-[2.5rem]">
      <div className='mb-[2rem]'>
        <h1 className="text-3xl font-semibold">Orders</h1>
        <p className='text-[#6A6A6A] leading-10'>Phasellus quis justo non nunc congue gravida.</p>
      </div>
      <RadioGroup onValueChange={labelOnChange} value={labelValue} className="flex border-b mb-[1.5rem]">
        { label && label.map(item => (
          <Label key={item.value} htmlFor={item.value} className="flex flex-row items-center justify-between px-4 py-3 [&:has([data-state=checked])]:border-primary border-b-2 border-[#fff0] cursor-pointer">
            <RadioGroupItem value={item.value} id={item.value} className="sr-only" />
            <div className={`${labelValue === item.value ? 'text-[#252525]' : 'text-[#6A6A6A]'} text-sm font-medium mr-1.5`}>{item.label}</div>
          </Label> 
        ))}
      </RadioGroup>
      { orderList && orderList.map((item, index) => {
        return <OrderItems onUpdate={updateList} labelValue={labelValue} order_type={labelValue} key={index} item={item}></OrderItems>
      })}
      <DataTablePagination meta={page} onPageIndex={pageChange}/>
    </div>
  )
}