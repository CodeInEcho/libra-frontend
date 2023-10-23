"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useImperativeHandle, useState, MutableRefObject } from "react"

interface DialogTrigger {
  title: string
  description: string
  confirm: () => void
  children: React.ReactNode
  cRef: MutableRefObject<{
    changeloading: (newVal: boolean) => void,
    changeOpen: (newVal: boolean) => void
  }>
}

export default function Deliver({ cRef, children, confirm, title, description }: DialogTrigger) {
  const [open, setOpen] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(false)
  
  useImperativeHandle(cRef, () => ({
    changeloading: (newVal: Boolean) => {
      setLoading(newVal);
    },
    changeOpen: (newVal: Boolean) => {
      setOpen(newVal);
    }
  }));
  const openChange = (val: boolean) => {
    val ? setOpen(val) : '';
  }

  const cancel = (val: boolean) => {
    setOpen(val)
    setLoading(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={openChange}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={ () => cancel(false) }>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirm} disabled={loading}>
            { loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> }
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog> 
  )
}