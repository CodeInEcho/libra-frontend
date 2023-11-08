"use client"
import Link from "next/link"
import http from '@/lib/request'
import { columns } from "./columns"
import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
// import { DataTablePagination } from "@/components/data-table-pagination"

export default function AdminOfferPage() {
    const [collectionList, setCollectionList] = useState([]);
    const [page, setPage] = useState({ page: 1, perPage: 10 });

    useEffect(() => {
        getCollectionList();
    }, [])

    const getCollectionList = async (params?: any) => {
        const res = await http.get('/collection/admin-collection-list', { params: { ...params } });
        setCollectionList(res.data.data.data);
        setPage({
            ...res.data.data.meta,
            page: res.data.data.meta.currentPage,
        });
    }

    const pageChange = (meta: any) => {
        setPage(meta);
        getCollectionList(meta);
    }

    return (
        <div className="container mt-[2.5rem]">
            <div className="flex justify-between items-center mb-[2rem]">
                <div>
                    <h1 className="text-3xl font-semibold">Collection</h1>
                    <p className='text-[#6A6A6A] leading-10'>Phasellus quis justo non nunc congue gravida.</p>
                </div>
                <Link href={`/admin/collectionCreation`} rel="noreferrer" className={buttonVariants()}>Create Collection</Link>
            </div>
            <DataTable columns={columns} data={collectionList} meta={page} onPageIndex={pageChange} />
        </div>
    )
}