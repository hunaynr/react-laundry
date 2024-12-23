import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { toast } from "sonner";
import {
    Button,
    Form,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure,
} from "@nextui-org/react";

const AddTransaction = (props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [customers, setCustomers] = useState([]);
    const [customerValue, setCustomerValue] = useState(0);

    const [products, setProducts] = useState([]);
    const [productValue, setProductValue] = useState(0);

    const [unit, setUnit] = useState("Kg");
    const [price, setPrice] = useState(0);

    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    const date = new Date();
    const transactionDate = `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDate()}`;

    const handleCustomerSelectionChange = (event) => {
        setCustomerValue(event.target.value);
    };

    const handleProductSelectionChange = (event) => {
        setProductValue(event.target.value);
        const product = products.find(
            (product) => product.id === event.target.value
        );
        setUnit(product.unit);
        setPrice(Number(product.price));
    };

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

    const addTransaction = async (data) => {
        try {
            await axiosInstance.post("/transactions", {
                customerId: data.customerId,
                productId: data.productId,
                date: data.date,
                quantity: data.quantity,
            });
            props.fetchCustomers();
            toast.success("Transaction added successfully", {
                position: "top-center",
            });
        } catch (err) {
            toast.error("Server error, please wait a moment", {
                position: "top-center",
            });
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            customerId: customerValue,
            productId: productValue,
            date: transactionDate,
            quantity: quantity,
        };
        addTransaction(data);
    };

    useEffect(() => {
        fetchCustomers();
        fetchProducts();
    }, []);

    useEffect(() => {
        setTotal(price * quantity);
    }, [productValue, quantity]);

    return (
        <>
            <Button
                className="font-medium mr-2"
                color="primary"
                onPress={onOpen}
            >
                Add Transaction
            </Button>
            <Modal
                isOpen={isOpen}
                placement="top-center"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <Form onSubmit={onSubmit}>
                                <div className="w-full flex flex-col">
                                    <ModalHeader>New Transaction</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            isReadOnly
                                            label="Date of Transaction"
                                            value={transactionDate}
                                            description="Date of transaction taken"
                                            name="date"
                                            labelPlacement="outside"
                                        />
                                        <Select
                                            isRequired
                                            label="Customer Name"
                                            placeholder="Select customer name"
                                            description="Select registered customer name"
                                            selectedKeys={[customerValue]}
                                            variant="flat"
                                            labelPlacement="outside"
                                            onChange={
                                                handleCustomerSelectionChange
                                            }
                                        >
                                            {customers.map((customer) => (
                                                <SelectItem key={customer.id}>
                                                    {customer.customerName}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Select
                                            isRequired
                                            label="Service Type"
                                            placeholder="Select service type"
                                            description="Select available service type"
                                            selectedKeys={[productValue]}
                                            variant="flat"
                                            labelPlacement="outside"
                                            disallowEmptySelection={true}
                                            onChange={
                                                handleProductSelectionChange
                                            }
                                        >
                                            {products.map((product) => (
                                                <SelectItem key={product.id}>
                                                    {product.productName}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Input
                                            isRequired
                                            isClearable
                                            label={`Qty (${unit})`}
                                            placeholder="Enter the quantity"
                                            description="Only number is allowed"
                                            name="qty"
                                            type="number"
                                            value={quantity}
                                            labelPlacement="outside"
                                            onValueChange={setQuantity}
                                        />
                                        <Input
                                            isReadOnly
                                            label="Total"
                                            placeholder="0"
                                            description="Automatically calculated"
                                            name="total"
                                            type="number"
                                            defaultValue={`${Number(0)}`}
                                            value={total}
                                            labelPlacement="outside"
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="danger"
                                            variant="flat"
                                            onPress={onClose}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            color="primary"
                                            onPress={onClose}
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </ModalFooter>
                                </div>
                            </Form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddTransaction;
