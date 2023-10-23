'use client'
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function LabelSelection() {
  const [labelValue, setLabelValue] = useState('All');
  const [classifyValue, setClassifyValue] = useState('1');
  const labelOnChange = (value: string) => {
    setLabelValue(value);
  }
  const classifyOnChange = (value: string) => {
    setClassifyValue(value);
  }
  const classify = [
    {
      id: '1',
      title: 'ITEMS',
      amount: 258,
    },
    {
      id: '2',
      title: 'CURRENCY',
      amount: 1689,
    },
    {
      id: '3',
      title: 'ACCOUNTS',
      amount: 367,
    },
    {
      id: '4',
      title: 'POWER LEVELING',
      amount: 767,
    },
  ]
  const label = [
    {
      label: 'All',
      amount: 258,
    },
    {
      label: 'Weapon',
      amount: 31,
    },
    {
      label: 'Jewelry',
      amount: 28,
    },
    {
      label: 'Ring Finger',
      amount: 53,
    },
    {
      label: 'Gloves',
      amount: 80,
    },
    {
      label: 'Coat',
      amount: 6,
    },
    {
      label: 'Shoe',
      amount: 15,
    },
  ]
  return (
    <div className="space-y-5 mb-[1.75rem]">
      <RadioGroup onValueChange={classifyOnChange} value={classifyValue} className="grid grid-cols-4 gap-4">
        { classify && classify.map(item => (
          <Label key={item.id} htmlFor={item.id} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer">
            <RadioGroupItem value={item.id} id={item.id} className="sr-only" />
            <div className="text-3xl font-semibold">{item.amount}</div>
            <div className="leading-7">{item.title}</div>
          </Label>
        ))}
      </RadioGroup>
      <RadioGroup onValueChange={labelOnChange} value={labelValue} className="flex border-b gap-2">
        { label && label.map(item => (
          <Label key={item.label} htmlFor={item.label} className="flex flex-row items-center justify-between px-4 py-3 [&:has([data-state=checked])]:border-primary border-b-2 border-[#fff0] cursor-pointer">
            <RadioGroupItem value={item.label} id={item.label} className="sr-only" />
            <div className={`${labelValue === item.label ? 'text-[#252525]' : 'text-[#6A6A6A]'} text-sm font-medium mr-1.5`}>{item.label}</div>
            <div className={`bg-[#F5F5F5] text-gray-400 text-xs px-[0.625rem] py-0.5 rounded-full`}>{item.amount}</div>
          </Label> 
        ))}
      </RadioGroup>
    </div>
  )
}