"use client";
import {useState} from "react";
import Image from "next/image";
import axios from "axios";
import * as z from 'zod';
import {Download, ImageIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Heading} from "@/components/heading";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader"
import {
    Form,
    FormControl,
    FormItem,
    FormField} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {formSchema, amountOptions, resolutionOptions} from "@/app/(dashboard)/(routes)/paint/constants";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Select,SelectContent, SelectItem, SelectTrigger,SelectValue} from "@/components/ui/select";
import {Card, CardFooter} from "@/components/ui/card";


const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt:"",
            amount:"1",
            resolution:"512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            setImages([]);

            const response = await axios.post(".api/draw",values);

            const urls = response.data.map((image: {url: string}) => image.url );

            setImages(urls);
            form.reset();
        } catch (error :any){
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title={"Let's Draw"}
                description={"Art Mode"}
                icon={ImageIcon}
                iconColor={"text-pink-700"}
                bgColor={"bg-pink-700/10"}
            />
            <div className={'px-4 lg:px-8'}>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className={'rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'}>
                            <FormField
                                name='prompt'
                                render={({field}) => (
                                    <FormItem className={'col-span-12 lg:col-span-6'}>
                                        <FormControl className={'m-0 p-0'}>
                                            <Input
                                                className={'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'}
                                                disabled={isLoading}
                                                placeholder={'Snoop Dogg baking a cake with a velociraptor'}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className={'col-span-12 lg-col-span-2 bg-pink-700 w-full'}
                                disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                <div className={'space-y-4 mt-4'}>
                    {isLoading && (
                        <div className={"p-20"}>
                            <Loader/>
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty label={"Let's unleash our imaginations"}/>
                    ) }
                    <div
                    className={'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-8'}>
                        {images.map((src) => (
                        <Card
                        key={src}
                        className={'rounded-lg overflow-hidden'}
                        >
                            <div
                                className={'relative aspect-square'}>
                                <Image
                                alt={"Image"}
                                fill
                                src={src}
                                />
                            </div>
                            <CardFooter
                            className={'p-2'}>
                                <Button
                                    variant={"secondary"}
                                        className="w-full"
                                        onClick={()=> window.open(src)}
                                        >
                                    <Download className={'h-4 w-2 mr-2'}/>
                                </Button>
                                </CardFooter>
                            </Card>
                            ))};
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePage;