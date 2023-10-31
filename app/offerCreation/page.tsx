"use client"
import * as z from "zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ProductImages } from "@/lib/types"
import { ReloadIcon } from "@radix-ui/react-icons"
import { zodResolver } from "@hookform/resolvers/zod"

import http from "@/lib/request"
import { duration } from "@/lib/utils"
import { CollectionPorps } from "./index.d"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button, buttonVariants } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ProductImageUploader } from "@/components/product-image-uploader"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OfferCreation() {
  const router = useRouter();
  const [terms, setTerms] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedType, setSelectedType] = useState<number>()
  const [newImages, setNewImages] = useState([] as ProductImages[])
  const [isDesignated, setIsDesignated] = useState<boolean | undefined>(false)
  const [collectionList, setCollectionList] = useState<CollectionPorps[]>([])
  const [selectedCollection, setSelectedCollection] = useState<CollectionPorps>()

  const FormSchema = z.object({
    images: z.string(),
    release_period: z.boolean(),
    security_deposit: z.boolean(),
    price: z.coerce.number().min(0),
    title: z.string().nonempty('Title is required.'),
    description: z.string().nonempty('Description is required.'),
    stock: z.coerce.number({ required_error: 'stock is required.' }).min(0),
    duration: z.string({ required_error: "Please select an email to display." }),
    collection_id: z.string({ required_error: "Please select an email to display." }),
    offer_type: z.coerce.number().refine((val) => selectedType === 3 ? val : true, 'Product type is required.'),
    buyer_password: z.string().refine(value => isDesignated ? typeof value === "string" && value.trim().length !== 0 : true, "Password is required"),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      offer_type: 0,
      price: undefined,
      stock: undefined,
      title: '',
      images: '',
      duration: '30',
      description: '',
      buyer_password: '',
      release_period: false,
      security_deposit: false,
    },
  })

  useEffect(() => {
    getCollectionList()
  }, [])

  const classify = [
    {
      id: "1",
      title: "ITEMS",
      amount: 888,
    },
    {
      id: "2",
      title: "CURRENCY",
      amount: 888,
    },
    {
      id: "3",
      title: "ACCOUNTS",
      amount: 888,
    },
    {
      id: "4",
      title: "POWER LEVELING",
      amount: 888,
    },
  ]

  const getCollectionList = async () => {
    const { data } = await http.get("/collection/collection-list")
    setCollectionList(data.data)
  }

  const handleValueChange = (val: string) => {
    form.setValue('collection_id', val, { shouldValidate: true })
    const selectedItem = collectionList.find((item) => item.id === parseInt(val))
    if (selectedItem) {
      setSelectedType(selectedItem.type)
      setSelectedCollection(selectedItem)
    }
  }

  const switchChange = (val: boolean | undefined) => {
    setIsDesignated(val)
  }

  const onSubmit = async (data: any) => {
    if (!terms) {
      toast({ title: "提示", description: '请阅读和同意卖方交付协议' });
      return
    }
    setLoading(true)
    const res = await http.post("/offer/create-offer", Object.assign(data, {
      images: newImages.map(item => item.url).join(','),
      is_designated: isDesignated,
      duration: Number(data.duration),
      delivery: Number(data.delivery),
      collection_id: Number(data.collection_id),
    })).finally(() => setLoading(false))

    sessionStorage.setItem('redirect:success', JSON.stringify({
      offerId: res.data.data,
      collection: selectedCollection?.slug,
    }))

    router.push("/createSuccess");
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6 text-center">Create an Offer - Sale Offer Listing</h1>
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6 mb-8">
            <FormField
              name="collection_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection</FormLabel>
                  <Select
                  defaultValue={field.value}
                  onValueChange={(value) => handleValueChange(value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {collectionList && collectionList.map((item: any) => (
                        <SelectItem
                          key={item.id}
                          className="px-2"
                          value={String(item.id)}>
                          <div className="flex items-center space-x-2">
                            <img className="w-[2rem] h-[2rem] rounded-md" src={item.logo}/>
                            <p>{item.collection_cn}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedType && selectedType === 3 && (
              <FormField
                name="offer_type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                      <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-4 gap-4">
                        {classify &&
                          classify.map((item) => (
                            <FormItem key={item.id}>
                              <FormControl>
                                <Label
                                  htmlFor={item.id}
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                  <RadioGroupItem
                                    value={item.id}
                                    id={item.id}
                                    className="sr-only"
                                  />
                                  <div className="text-3xl font-semibold">
                                    {item.amount}
                                  </div>
                                  <div className="leading-7">{item.title}</div>
                                </Label>
                              </FormControl>
                            </FormItem>
                          ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="bg-border h-[1px] w-full !my-10 text-center">
              <div className="relative inline-block bg-background px-2 top-[-12px]">
                Diablo 4 - Items
              </div>
            </div>
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please enter product title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input className="w-[30rem]" min={0} step="0.01" type="number" placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input className="w-[30rem]" min={0} type="number" placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Please enter product description" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="images"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ProductImageUploader
                    newImages={newImages}
                    setNewImages={setNewImages}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="bg-border h-[1px] w-full !my-10 text-center">
              <div className="relative inline-block bg-background px-2 top-[-12px]">Trading Options</div>
            </div>
            <FormField
              name="duration"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer Duration</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product expiration date" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      { duration && Object.keys(duration).map((item: any) => (
                        <SelectItem value={item}>{ duration[item] }</SelectItem>
                      )) }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            name="buyer_password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="block">
                <FormLabel className="flex items-center justify-between">
                  <span>Designated Buyer</span>
                  <Switch onCheckedChange={switchChange} checked={isDesignated}/>
                </FormLabel>
                <FormControl>
                  {isDesignated && (<Input {...field} type="password" placeholder="Please set a purchase password"/>)}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField
            name="security_deposit"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex justify-between">
                <FormLabel className="flex items-center justify-between">
                  <span>Security Deposit</span>
                </FormLabel>
                <FormControl>
                  <Switch onCheckedChange={field.onChange} checked={field.value}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField
            name="release_period"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex justify-between">
                <FormLabel className="flex items-center justify-between">
                  <span>Delayed Release Period</span>
                </FormLabel>
                <FormControl>
                  <Switch onCheckedChange={field.onChange} checked={field.value}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <p className="flex items-center justify-center text-sm">
              <Checkbox checked={terms} onCheckedChange={ (val: boolean) => {setTerms(val)} } className="mx-1" id="terms1" />I have read and agree to follow the{" "}
              <Link
              href={"#"}
              rel="noreferrer"
              className="font-semibold text-orange-500 mx-1">
              Secure Seller Delivery Agreement
              </Link>
            </p>
            <Button className="w-full" disabled={loading} type="submit">
            { loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> }
              CREATE NEW OFFER</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
