"use client"
import * as z from "zod"
import http from '@/lib/request'
import { useForm } from "react-hook-form"
import { CollectionPorps } from "./page.d"
import { ProductImages } from "@/lib/types"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams, useRouter } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ProductImageUploader } from "@/components/product-image-uploader"
import { Form, FormItem, FormLabel, FormField, FormMessage, FormControl } from "@/components/ui/form"

export default function collectionCreation() {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const [newLogo, setNewLogo] = useState([] as ProductImages[]);
    const [newPicture, setNewPicture] = useState([] as ProductImages[]);
    const [newBanner, setNewBanner] = useState([] as ProductImages[]);
    const formSchema = z.object({
        type: z.coerce.number(),
        is_official: z.boolean(),
        fees_ratio: z.coerce.number(),
        twitter_url: z.string(),
        discord_url: z.string(),
        website_url: z.string(),
        contract_url: z.string(),
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
            twitter_url: '',
            discord_url: '',
            website_url: '',
            contract_url: '',
            collection_cn: '',
            collection_en: '',
            description_en: '',
            description_cn: '',
            is_official: false,
        },
    })

    useEffect(() => {
        const slug = searchParams.get('slug');
        if (slug) getCollectionDetail(slug);
    }, [])

    type Option = {
        label: string;
        value: string;
    };

    const options: Option[] = [
        { label: "NFT", value: '1' },
        { label: "COIN", value: '2' },
        { label: "GAME", value: '3' },
    ];

    const getCollectionDetail = async (slug: string) => {
        const { data } = await http.get(`/collection/collection-item/${slug}`);
        Object.entries(data.data).forEach(([name, value]: any) => form.setValue(name, value));
        const array = [] as ProductImages[];
        const array2 = [] as ProductImages[];
        const array3 = [] as ProductImages[];
        array.push({ id: '1', alt: 'logo', url: data.data.logo });
        array2.push({ id: '2', alt: 'picture', url: data.data.picture });
        array3.push({ id: '2', alt: 'picture', url: data.data.picture });
        setNewLogo(array);
        setNewPicture(array2);
        setNewBanner(array3);
    }

    const onSubmit = async (values: CollectionPorps) => {
        const postData = Object.assign(values, {
            logo: newLogo.map(item => item.url).join(''),
            picture: newPicture.map(item => item.url).join(''),
            banner: newBanner.map(item => item.url).join(''),
        })
        const id = searchParams.get('id');
        if (id) {
            const { data } = await http.post('/collection/edit', Object.assign(postData, { id: Number(id) }));
            if (data.code === 200) {
                toast({ title: "提示: 编辑成功" });
                router.back();
            }
        } else {
            const { data } = await http.post('/collection/create', postData);
            if (data.code === 200) {
                toast({ title: "提示: 创建成功" });
                router.back();
            }
        }
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
                                                <FormLabel className="font-normal">{option.label}</FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
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
                        <FormField control={form.control} name="is_official" render={({ field }) => (
                            <FormItem className="flex justify-between">
                                <FormLabel>IsOfficial</FormLabel>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="collection_en" render={({ field }) => (
                            <FormItem>
                                <FormLabel>集合</FormLabel>
                                <FormControl>
                                    <Input placeholder="请输入集合名称" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="collection_cn" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Collection</FormLabel>
                                <FormControl>
                                    <Input placeholder="Please enter collection name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="website_url" render={({ field }) => (
                            <FormItem>
                                <FormLabel>website</FormLabel>
                                <FormControl>
                                    <Input placeholder="Please enter website url" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="twitter_url" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Twitter</FormLabel>
                                <FormControl>
                                    <Input placeholder="Please enter Twitter url" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="discord_url" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Discord</FormLabel>
                                <FormControl>
                                    <Input placeholder="Please enter Discord url" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="contract_url" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contract</FormLabel>
                                <FormControl>
                                    <Input placeholder="Please enter Contract url" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="fees_ratio" render={({ field }) => (
                            <FormItem>
                                <FormLabel>费率比列</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Please enter collection name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="logo" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logo</FormLabel>
                                <FormControl>
                                    <ProductImageUploader
                                        type="single"
                                        newImages={newLogo}
                                        setNewImages={setNewLogo} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="picture" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Picture</FormLabel>
                                <FormControl>
                                    <ProductImageUploader
                                        type="single"
                                        newImages={newPicture}
                                        className="w-[20rem] h-[20rem]"
                                        setNewImages={setNewPicture} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="picture" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Banner</FormLabel>
                                <FormControl>
                                    <ProductImageUploader
                                        type="single"
                                        newImages={newBanner}
                                        className="w-[52.5rem]"
                                        setNewImages={setNewBanner} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description_en" render={({ field }) => (
                            <FormItem>
                                <FormLabel>简介</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="请输入简介" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description_cn" render={({ field }) => (
                            <FormItem>
                                <FormLabel>description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Please enter product description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}