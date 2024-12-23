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
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import AddProduct from "../components/product/AddProduct";
import EditProduct from "../components/product/EditProduct";
import DeleteProduct from "../components/product/DeleteProduct";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductPage = () => {
    const selector = useSelector((store) => store.theme);

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get("/products");
            setProducts(response.data);
        } catch (err) {
            toast.error("Server error, please wait a moment", {
                position: "top-center",
            });
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const columns = [
        {
            key: "productName",
            label: "Product Name",
        },
        {
            key: "unit",
            label: "Unit",
        },
        {
            key: "price",
            label: "Price",
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
                                Product List
                            </h4>
                            <AddProduct fetchProducts={fetchProducts} />
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Table
                                removeWrapper
                                aria-label="Product table"
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
                                    {products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium w-[30%]">
                                                {product.productName}
                                            </TableCell>
                                            <TableCell className="font-medium w-[21%]">
                                                {product.unit}
                                            </TableCell>
                                            <TableCell className="font-medium w-[21%]">
                                                {product.price}
                                            </TableCell>
                                            <TableCell className="flex font-medium gap-x-2">
                                                <EditProduct
                                                    product={product}
                                                    fetchProducts={
                                                        fetchProducts
                                                    }
                                                />
                                                <DeleteProduct
                                                    product={product}
                                                    fetchProducts={
                                                        fetchProducts
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

export default ProductPage;
