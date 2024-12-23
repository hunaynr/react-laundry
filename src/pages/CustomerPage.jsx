import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import {
    Card,
    CardBody,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import AddCustomer from "../components/customer/AddCustomer";
import EditCustomer from "../components/customer/EditCustomer";
import DeleteCustomer from "../components/customer/DeleteCustomer";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CustomerPage = () => {
    const selector = useSelector((store) => store.theme);

    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await axiosInstance.get("/customers");
            setCustomers(response.data);
        } catch (err) {
            toast.error("Server error, please wait a moment", {
                position: "top-center",
            });
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const columns = [
        {
            key: "customerName",
            label: "Customer Name",
        },
        {
            key: "address",
            label: "Address",
        },
        {
            key: "phone",
            label: "Phone",
        },
        {
            key: "manage",
            label: "Manage",
        },
    ];

    return (
        <div className="flex">
            <Sidebar />
            <div
                className={`text-2xl font-semibold flex-1 h-screen duration-700 ${
                    selector.isLight ? "bg-white" : "bg-[#222]"
                }`}
            >
                <Header selector={selector} />
                <div className="p-7 mt-1">
                    <Card
                        className={`py-4 duration-700 ${
                            selector.isLight ? "bg-white" : "bg-[#222]"
                        }`}
                    >
                        <CardHeader
                            className={`pb-0 pt-2 px-4 flex-row items-start justify-between duration-700 ${
                                selector.isLight ? "bg-white" : "bg-[#222]"
                            }`}
                        >
                            <h4
                                className={`font-bold text-large duration-700 ${
                                    selector.isLight
                                        ? "bg-white"
                                        : "bg-[#222] text-white"
                                }`}
                            >
                                Customer List
                            </h4>
                            <AddCustomer fetchCustomers={fetchCustomers} />
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Table
                                removeWrapper
                                aria-label="Customer table"
                                className={`duration-700 ${
                                    selector.isLight
                                        ? "bg-white"
                                        : "bg-[#222] text-white"
                                }`}
                            >
                                <TableHeader>
                                    {columns.map((column) => (
                                        <TableColumn
                                            key={column.key}
                                            className={`bg-white font-bold text-small text-black duration-700 ${
                                                selector.isLight
                                                    ? "bg-white"
                                                    : "bg-[#222] text-white"
                                            }`}
                                        >
                                            {column.label}
                                        </TableColumn>
                                    ))}
                                </TableHeader>
                                <TableBody emptyContent={"No rows to display."}>
                                    {customers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell className="font-medium w-[25%]">
                                                {customer.customerName}
                                            </TableCell>
                                            <TableCell className="font-medium w-[25%]">
                                                {customer.address}
                                            </TableCell>
                                            <TableCell className="font-medium w-[25%]">
                                                {customer.phone}
                                            </TableCell>
                                            <TableCell className="flex font-medium gap-x-2">
                                                <EditCustomer
                                                    customer={customer}
                                                    fetchCustomers={
                                                        fetchCustomers
                                                    }
                                                />
                                                <DeleteCustomer
                                                    customer={customer}
                                                    fetchCustomers={
                                                        fetchCustomers
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
                <Footer selector={selector} />
            </div>
        </div>
    );
};

export default CustomerPage;
