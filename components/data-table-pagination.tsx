import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

interface DataTablePaginationProps<TData> {
  meta: any
  table?: Table<TData>
  onPageIndex: (...args: any[]) => void
}

export function DataTablePagination<TData>({
  table,
  meta,
  onPageIndex,
}: DataTablePaginationProps<TData>) {

  const setPageIndex = (index: number) => {
    onPageIndex({
      ...meta,
      page: index,
    })
  }

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => setPageIndex(1)}
          // disabled={!table.getCanPreviousPage()}
          disabled={meta.page <= 1}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPageIndex(meta.page - 1)}
          // disabled={!table.getCanPreviousPage()}
          disabled={meta.page <= 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <div className="flex items-center justify-center text-sm font-medium">
          {meta.page} / {meta.lastPage}
          {/* {table.getState().pagination.pageIndex + 1} / {table.getPageCount()} */}
        </div>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPageIndex(meta.page + 1)}
          // disabled={!table.getCanNextPage()}
          disabled={meta.page >= meta.lastPage}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => setPageIndex(meta.lastPage)}
          // disabled={!table.getCanNextPage()}
          disabled={meta.page >= meta.lastPage}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
    </div>
  )
}