"use client";

import {Montserrat} from "next/font/google";
import Image from "next/image";
import Link from "next/link"
import {useAuth} from "@clerk/nextjs";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";


const font = Montserrat ({
    weight:"600",
    subsets:["latin"]
});

export const LandingNavbar = () => {
    const {isSignedIn} = useAuth();

    return(
        <nav className={"p-4 bg-transparent flex items-center justify-between"}>
            <Link
                href={"/"}
                className={'flex items-center'}>
                <div className={"relative h-8 w-8 mr-4"}>
                    <Image
                        fill
                        alt={"Logo"}
                        src={"/logo.png"}/>
                    <h1 className={cn('text-2xl font-bold text-white',font.className)}>
                        S.A.M.A
                    </h1>
                </div>
            </Link>
            <div className={'flex items-center gap-x-2 '}>
                <Link href={isSignedIn? "/dashboard" : "/sign-up"}>
                    <Button
                        className={'col-span-12 lg-col-span-2 bg-violet-700 w-full'}>
                        Get Started
                    </Button>
                </Link>

            </div>

        </nav>
    )
};