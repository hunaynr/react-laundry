import {
    Button,
    Form,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { axiosInstance } from "../../lib/axios";
import { toast } from "sonner";

const AddProduct = (props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const addProduct = async (data) => {
        try {
            await axiosInstance.post("/products", {
                productName: data.productName,
                unit: data.unit,
                price: data.price,
            });
            props.fetchProducts();
            toast.success("Product added successfully", {
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
        const data = Object.fromEntries(new FormData(event.target));
        addProduct(data);
    };

    return (
        <>
            <Button
                className="font-medium mr-2"
                color="primary"
                onPress={onOpen}
            >
                Add Product
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
                                    <ModalHeader>New Product</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            autoFocus
                                            isRequired
                                            isClearable
                                            label="Product Name"
                                            placeholder="Enter the product name"
                                            description="No product description needed"
                                            name="productName"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            isRequired
                                            isClearable
                                            label="Unit"
                                            placeholder="Enter the unit"
                                            description="Enter the unit of product"
                                            name="unit"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            isRequired
                                            isClearable
                                            label="Price"
                                            placeholder="Enter the price"
                                            description="Enter the price per unit of product (number only)"
                                            name="price"
                                            type="number"
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

export default AddProduct;
