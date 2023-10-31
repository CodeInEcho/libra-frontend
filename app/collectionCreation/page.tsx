"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { ProductImages } from "@/lib/types"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormItem, FormLabel, FormField, FormMessage, FormControl } from "@/components/ui/form"
// import {FancyMultiSelect} from './fancy-multi-select'
import http from '@/lib/request'
import { CollectionPorps } from './page.d'
import { useToast } from "@/components/ui/use-toast"
import { ProductImageUploader } from "@/components/product-image-uploader"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function collectionCreation() {
  const { toast } = useToast()
  const [newLogo, setNewLogo] = useState([] as ProductImages[]);
  const [newPicture, setNewPicture] = useState([] as ProductImages[]);
  const formSchema = z.object({
    type: z.coerce.number(),
    fees_ratio: z.coerce.number(),
    collection_en: z.string().nonempty(),
    collection_cn: z.string().nonempty(),
    description_en: z.string().nonempty(),
    description_cn: z.string().nonempty(),
    logo: z.any().refine(({ files }) => files?.length !== 0, "Image is required."),
    picture: z.any().refine(({ files }) => files?.length !== 0, "Image is required."),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 1,
      logo: '',
      picture: '',
      fees_ratio: 2,
      collection_cn: '',
      collection_en: '',
      description_en: '',
      description_cn: '',
    },
  })

  type Option = {
    label: string;
    value: string;
  };

  const options: Option[] = [
    { label: "NFT", value: '1' },
    { label: "COIN", value: '2' },
    { label: "GAME", value: '3' },
  ];

  const onSubmit = async (values: CollectionPorps) => {
    const postData = Object.assign(values, {
      logo: newLogo.map(item => item.url).join(''),
      picture: newPicture.map(item => item.url).join(''),
    })
    const { data } = await http.post('/collection/create', postData);
    if (data.code === 200) toast({ title: "提示: 创建成功" })
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6 text-center">Create an Collection</h1>
      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mb-8">
            <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>集合类型</FormLabel>
                <FormControl>
                  <RadioGroup
                  defaultValue={'1'}
                  onValueChange={field.onChange}
                  className="flex space-x-1">
                    {options.map((option) => (
                      <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                        <FormControl><RadioGroupItem value={option.value} /></FormControl>
                        <FormLabel className="font-normal">{ option.label }</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            {/* <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>开放类型</FormLabel>
                <FormControl>
                  <FancyMultiSelect />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/> */}
            {/* <FormField control={form.control} name="dynamic_data" render={({ field }) => (
              <FormItem>
                <FormLabel>动态数据</FormLabel>
                <FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/> */}
            <FormField control={form.control} name="collection_en" render={({ field }) => (
              <FormItem>
                <FormLabel>集合</FormLabel>
                <FormControl>
                  <Input placeholder="请输入集合名称" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="collection_cn" render={({ field }) => (
              <FormItem>
                <FormLabel>Collection</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter collection name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="fees_ratio" render={({ field }) => (
              <FormItem>
                <FormLabel>费率比列</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Please enter collection name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="logo" render={({ field }) => (
              <FormItem>
                <FormLabel>logo</FormLabel>
                <FormControl>
                  <ProductImageUploader 
                  type="single"
                  newImages={newLogo}
                  setNewImages={setNewLogo}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="picture" render={({ field }) => (
              <FormItem>
                <FormLabel>picture</FormLabel>
                <FormControl>
                  <ProductImageUploader
                  type="single"
                  newImages={newPicture}
                  setNewImages={setNewPicture}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="description_en" render={({ field }) => (
              <FormItem>
                <FormLabel>简介</FormLabel>
                <FormControl>
                  <Textarea placeholder="请输入简介" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="description_cn" render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Please enter product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}