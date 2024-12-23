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

const EditProduct = (props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const editProduct = async (data) => {
        try {
            await axiosInstance.put(`/products/${props.product.id}`, {
                productName: data.productName,
                unit: data.unit,
                price: data.price,
            });
            props.fetchProducts();
            toast.success("Product has successfully been updated", {
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
        editProduct(data);
    };

    return (
        <>
            <Button
                className="font-medium"
                color="success"
                variant="bordered"
                onPress={onOpen}
            >
                Edit
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
                                    <ModalHeader>Edit Product</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            isRequired
                                            isClearable
                                            label="Product Name"
                                            placeholder="Enter the new product name"
                                            description="No product description needed"
                                            name="productName"
                                            defaultValue={
                                                props.product.productName
                                            }
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            isRequired
                                            isClearable
                                            label="Unit"
                                            placeholder="Enter the new unit"
                                            description="Enter the new unit of product"
                                            name="unit"
                                            defaultValue={props.product.unit}
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            isRequired
                                            isClearable
                                            label="Price"
                                            placeholder="Enter the new price"
                                            description="Enter the new price per unit of product (number only)"
                                            name="price"
                                            type="number"
                                            defaultValue={props.product.price}
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

export default EditProduct;
