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

const AddCustomer = (props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const addCustomer = async (data) => {
        try {
            await axiosInstance.post("/customers", {
                customerName: data.customerName,
                address: data.address,
                phone: data.phone,
            });
            props.fetchCustomers();
            toast.success("Customer added successfully", {
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
        addCustomer(data);
    };

    return (
        <>
            <Button
                className="font-medium mr-2"
                color="primary"
                onPress={onOpen}
            >
                Add Customer
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
                                    <ModalHeader>New Customer</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            autoFocus
                                            isRequired
                                            isClearable
                                            label="Customer Name"
                                            placeholder="Enter the customer name"
                                            description="Either surname or fullname of customer"
                                            name="customerName"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            isRequired
                                            isClearable
                                            label="Address"
                                            placeholder="Enter the address"
                                            description="Enter the city of customer"
                                            name="address"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            isRequired
                                            isClearable
                                            label="Phone"
                                            placeholder="Enter the phone"
                                            description="Replace the country code prefix with 0 (number only)"
                                            name="phone"
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

export default AddCustomer;
