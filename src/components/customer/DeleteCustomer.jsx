import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { axiosInstance } from "../../lib/axios";
import { toast } from "sonner";

const DeleteCustomer = (props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const deleteCustomer = async () => {
        try {
            await axiosInstance.delete(`/customers/${props.customer.id}`);
            props.fetchCustomers();
            toast.success("Customer successfully deleted", {
                position: "top-center",
            });
        } catch (err) {
            toast.error("Server error, please wait a moment", {
                position: "top-center",
            });
        }
    };

    return (
        <>
            <Button
                className="font-medium"
                color="danger"
                variant="bordered"
                onPress={onOpen}
            >
                Delete
            </Button>
            <Modal
                isOpen={isOpen}
                placement="top-center"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <div className="w-full flex flex-col">
                                <ModalHeader className="text-red-500">
                                    Delete Customer
                                </ModalHeader>
                                <ModalBody>
                                    <span>
                                        {`Are you sure you want to delete this `}
                                        {
                                            <span className="font-bold">
                                                {props.customer.customerName}
                                            </span>
                                        }
                                        {` customer?`}
                                    </span>
                                    <span className="text-sm">
                                        This action is irreversible!
                                    </span>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="secondary"
                                        variant="flat"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        color="danger"
                                        onPress={deleteCustomer}
                                        type="button"
                                    >
                                        Yes
                                    </Button>
                                </ModalFooter>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteCustomer;
