import {LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";

interface HeadingProps {
    title:string;
    description: string;
    icon: LucideIcon;
    iconColor?: string
    bgColor?: string;
}

export const Heading = ({
    title,
        description,
        icon: Icon,
        IconColor,
        bgColor
}: HeadingProps) =>{
    return (
        <div className={'px-4 lg:px-8 flex items-center gap-x-3 mb-8'}>
            <div className={cn('p-2 w-fit rounded-md',bgColor)}>
                <Icon className={cn('w-10 h-10', IconColor)}/>
            </div>
                <div>
                    <h2 className={'text-3xl font-bold'}>
                    {title}
                    </h2>
                    <p className={'text-sm text-muted-background'}>
                        {description}
                    </p>
                </div>
        </div>
    );
};
