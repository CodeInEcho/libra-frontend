"use client"
import http from "@/lib/request"
import { debounce } from "@/lib/utils"
import { Payment, columns } from "./columns"
import { Icons } from "@/components/icons"
import { Input } from "@/components/ui/input"
import { LabelSelection } from "./radio-group"
import { DataTable } from "@/components/data-table"
import { useEffect, useState, useCallback } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OfferListTable({ slug }: { slug: string }) {
  const [type, setType] = useState("0");
  const [keyword, setKeyword] = useState("");
  const [sortType, setSortType] = useState("0");
  const [offerList, setOfferList] = useState([]);
  const [page, setPage] = useState({ page: 1, perPage: 10 });

  async function getOfferList(slug: string, params: any = {}) {
    const res = await http.get(`/collection/collection-list/${slug}`, { params });
    setPage({
      ...res.data.data.meta,
      page: res.data.data.meta.currentPage,
    });
    setOfferList(res.data.data.data);
  }

  useEffect(() => {
    getOfferList(slug);
  }, [])

  const selectChange = (val: string) => {
    setSortType(val);
    getOfferList(slug, { sort: val, keyword });
  }

  const searchChange = useCallback(debounce((event: any) => {
    setKeyword(event?.target.value);
    const value = event?.target.value;
    getOfferList(slug, { keyword: value, sort: sortType });
  }, 500), [])

  const pageChange = (meta: any) => {
    setPage(meta);
    getOfferList(slug, { sort: sortType, keyword, ...meta });
  }

  return (
    <>
      {/* { <LabelSelection /> } */}
      <div className="flex space-x-4 mb-[1.5rem]">
        <Input onChange={searchChange} placeholder="Type of Collection"/>
        <Select value={sortType} onValueChange={selectChange}>
          <SelectTrigger className="w-[16rem]">
            <SelectValue placeholder="Date: Latest to Oldest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Date: Latest to Oldest</SelectItem>
            <SelectItem value="1">Date: Oldest to Latest</SelectItem>
            <SelectItem value="2">Price: Low to Height</SelectItem>
            <SelectItem value="3">Price: Height to Low</SelectItem>
          </SelectContent>
        </Select>
        <Tabs value={type} onValueChange={ (val) => setType(val) }>
          <TabsList className="h-[3.5rem]">
            <TabsTrigger className={`${type === '0' ? '' : 'fill-[#A4A4A4]' } py-[0.875rem] px-[0.875rem]`} value="0"><Icons.list /></TabsTrigger>
            <TabsTrigger className={`${type === '1' ? '' : 'fill-[#A4A4A4]' } py-[0.875rem] px-[0.875rem]`} value="1"><Icons.grid /></TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <DataTable columns={columns} data={offerList} meta={page} onPageIndex={pageChange}/>
    </>
  )
}