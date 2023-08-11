"use client";
import axios from "axios";
import * as z from 'zod';
import {MessageSquare} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Heading} from "@/components/heading";
import {
    Form,
    FormControl,
    FormItem,
    FormField} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {formSchema} from "@/app/(dashboard)/(routes)/talk/constants";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {ChatCompletionRequestMessage} from "openai";

const TalkPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt:""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const userMessage: ChatCompletionRequestMessage = {
                role:'user',
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("api/talk",{
                messages: newMessages,
            });

            setMessages((current) => [...current, userMessage,response.data]);

            form.reset();

        } catch (error :any){
            // capitlism a pro model
            console.log('error');
        }finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title={"Let's Talk"}
                description={"Conversation Mode"}
                icon={MessageSquare}
                iconColor={"text-violet-500"}
                bgColor={"bg-violet-500/10"}
            />
            <div className={'px-4 lg:px-8'}>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className={'rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'}>
                                <FormField
                                    name='prompt'
                                    render={({field}) => (
                                        <FormItem className={'col-span-12 lg:col-span-10'}>
                                            <FormControl className={'m-0 p-0'}>
                                                <Input
                                                    className={'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'}
                                                    disabled={isLoading}
                                                    placeholder={'Am I a real boy?'}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            <Button
                                className={'col-span-12 lg-col-span-2 bg-violet-500 w-full'}
                                    disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className={'space-y-4 mt-4'}>
                    <div className={'flex flex-col-reverse gap-y-4'}>
                        {messages.map((message) => (
                            <div key ={message.content}>
                                {message.content}
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TalkPage;