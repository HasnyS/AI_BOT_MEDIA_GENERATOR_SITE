import navbar from "@/components/navbar";
import sidebar from "@/components/sidebar";

import(navbar)
const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className={"h-full relative"}>
            <div className={"hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900"}>
                <sidebar />
            </div>
            <main className={"md:pl-72"}>
                <navbar></navbar>
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;