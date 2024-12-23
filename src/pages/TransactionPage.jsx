import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
    Button,
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
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import AddTransaction from "../components/transaction/AddTransaction";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";

const TransactionPage = () => {
    const selector = useSelector((store) => store.theme);

    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await axiosInstance.get(
                "/customers?_embed=transactions"
            );
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
            key: "customerId",
            label: "Customer ID",
        },
        {
            key: "customerName",
            label: "Customer Name",
        },
        {
            key: "transactionHistory",
            label: "Transaction History",
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
                                Transaction List
                            </h4>
                            <AddTransaction fetchCustomers={fetchCustomers} />
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Table
                                removeWrapper
                                aria-label="Transaction table"
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
                                            <TableCell className="font-medium w-[30%] ml-4">
                                                {
                                                    <span className="ml-7">
                                                        {customer.id}
                                                    </span>
                                                }
                                            </TableCell>
                                            <TableCell className="font-medium w-[30%]">
                                                {customer.customerName}
                                                <p className="text-xs font-light">
                                                    {customer.transactions
                                                        .length === 0
                                                        ? "No transaction"
                                                        : customer.transactions
                                                              .length}
                                                    {customer.transactions
                                                        .length !== 0 &&
                                                        " Transaction(s)"}
                                                </p>
                                            </TableCell>
                                            <TableCell className="flex items-center font-medium gap-x-2">
                                                <Button
                                                    className="font-medium"
                                                    color="success"
                                                    variant="bordered"
                                                    as={Link}
                                                    to={`/transaction/${customer.id}`}
                                                >
                                                    View Transactions
                                                </Button>
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

export default TransactionPage;
