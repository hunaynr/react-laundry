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

const EditCustomer = (props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const editCustomer = async (data) => {
        try {
            await axiosInstance.put(`/customers/${props.customer.id}`, {
                customerName: data.customerName,
                address: data.address,
                phone: data.phone,
            });
            props.fetchCustomers();
            toast.success("Customer has successfully been updated", {
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
        editCustomer(data);
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
                                    <ModalHeader>Edit Customer</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            isRequired
                                            isClearable
                                            label="Customer Name"
                                            placeholder="Enter the new customer name"
                                            description="Either surname or fullname of customer"
                                            name="customerName"
                                            defaultValue={
                                                props.customer.customerName
                                            }
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            isRequired
                                            isClearable
                                            label="Address"
                                            placeholder="Enter the new address"
                                            description="Enter the new city of customer"
                                            name="address"
                                            defaultValue={
                                                props.customer.address
                                            }
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            isRequired
                                            isClearable
                                            label="Phone"
                                            placeholder="Enter the new phone"
                                            description="Replace the country code prefix with 0 (number only)"
                                            name="phone"
                                            type="number"
                                            defaultValue={props.customer.phone}
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

export default EditCustomer;
