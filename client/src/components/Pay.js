import { Button, Modal, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetBasket } from "../redux/orderSlice";

export default function Pay({ order }) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const onClick = () => {
        setShow(true);
    };
    const onClose = () => {
        setShow(false);
    };
    const onPay = (type) => {
        setLoading(true);
        const paidOrder = { ...order, payment: type };
        fetch("/api/order/createOrder", {
            method: "POST",
            body: JSON.stringify(paidOrder),
            headers: {
                // ***
                "Content-Type": "application/json", // ***
            },
        })
            .then((data) => data.json())
            .then(() => {
                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    setShow(false);
                    setSuccess(false);
                    dispatch(resetBasket());
                }, 1000);
            });
    };

    return (
        <>
            <div className="items-center">
                <Button
                    disabled={order.items.length === 0}
                    size="lg"
                    color="success"
                    onClick={onClick}
                >
                    Pay
                </Button>
                <Modal show={show} onClose={onClose}>
                    <Modal.Header>Total Payment </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                You need to pay {order.total}
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="flex flex-wrap">
                            <div className="ml-40">
                                <Button
                                    color="warning"
                                    onClick={() => onPay("cash")}
                                >
                                    Cash
                                </Button>
                            </div>
                            <div className="ml-40">
                                <Button
                                    color="purple"
                                    onClick={() => onPay("credit")}
                                >
                                    Credit Card
                                </Button>
                            </div>
                            {success && (
                                <div className=" mt-4 w-full">
                                    <Alert withBorderAccent={true} color="info">
                                        <span>
                                            <span className="font-medium">
                                                Successfull
                                            </span>
                                            <br></br>
                                            Order has been recorded !
                                        </span>
                                    </Alert>
                                </div>
                            )}
                            {loading && (
                                <div className="w-full mt-4">
                                    <Alert
                                        withBorderAccent={true}
                                        color="warning"
                                    >
                                        <span>
                                            <Spinner
                                                color="warning"
                                                size="md"
                                            />
                                            <span className="font-medium">
                                                Please wait.....
                                            </span>
                                        </span>
                                    </Alert>
                                </div>
                            )}
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
