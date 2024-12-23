import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import Sidebar from "../components/Sidebar";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TransactionHistoryPage = () => {
    const selector = useSelector((store) => store.theme);

    const [customers, setCustomers] = useState([]);
    const params = useParams();

    const fetchEmbeddedCustomers = async () => {
        try {
            const response = await axiosInstance.get(
                `/transactions?customerId=${params.id}&_embed=customer&_embed=product`
            );

            const transactionData = response.data.map((transaction) => ({
                customerId: transaction.customer.id,
                transactionId: transaction.id,
                customerName: transaction.customer.customerName,
                productName: transaction.product.productName,
                quantity: transaction.quantity,
                price: transaction.product.price * transaction.quantity,
                date: transaction.date,
                unit: transaction.product.unit,
            }));

            setCustomers(transactionData);
        } catch (err) {
            toast.error("Server error, please wait a moment", {
                position: "top-center",
            });
        }
    };

    useEffect(() => {
        fetchEmbeddedCustomers();
    }, []);

    const columns = [
        {
            key: "transactionId",
            label: "Transaction ID",
        },
        {
            key: "transactionDate",
            label: "Transaction Date",
        },
        {
            key: "service",
            label: "Service",
        },
        {
            key: "qty",
            label: "Qty",
        },
        {
            key: "grandTotal",
            label: "Grand Total",
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
                                {customers.map(
                                    (customer) => customer.customerName
                                )[0] === undefined
                                    ? "No Transaction History"
                                    : "Transaction History of "}
                                {
                                    customers.map(
                                        (customer) => customer.customerName
                                    )[0]
                                }
                            </h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2 mt-3">
                            <Table
                                removeWrapper
                                aria-label="Transaction History table"
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
                                            className={`bg-white font-bold text-small text-black text-center duration-700 ${
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
                                    {customers.map((customer, idx) => (
                                        <TableRow key={customer.transactionId}>
                                            <TableCell className="font-medium w-[20%] text-center">
                                                {idx % 2 == 0 ? (
                                                    <span className="py-1 px-8 rounded-full bg-emerald-500">
                                                        {customer.transactionId}
                                                    </span>
                                                ) : (
                                                    <span className="py-1 px-8 rounded-full bg-red-400">
                                                        {customer.transactionId}
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium w-[20%] text-center">
                                                {customer.date}
                                            </TableCell>
                                            <TableCell className="font-medium w-[20%] text-center">
                                                {customer.productName}
                                            </TableCell>
                                            <TableCell className="font-medium w-[20%] text-center">
                                                {customer.quantity}{" "}
                                                {customer.unit}
                                                {
                                                    <span className="text-xs font-normal">
                                                        {" "}
                                                        {"(s)"}
                                                    </span>
                                                }
                                            </TableCell>
                                            <TableCell className="font-medium w-[20%] text-center">
                                                {customer.price}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                        <CardFooter className="flex justify-end">
                            <Button
                                color="primary"
                                className="font-medium mr-4 mt-1 -mb-1"
                                as={Link}
                                to={`/transaction`}
                            >
                                Back
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <Footer selector={selector} />
            </div>
        </div>
    );
};

export default TransactionHistoryPage;
