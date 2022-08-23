import { Button, Modal, Alert } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetBasket } from "../redux/orderSlice";

export default function Pay({ order }) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    const onClick = () => {
        setShow(true);
    };
    const onClose = () => {
        setShow(false);
    };

    const onPay = (type) => {
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
            .then((result) => {
                setSuccess(true);
                console.log(result);
                setTimeout(() => {
                    setShow(false);
                    setSuccess(false);
                    dispatch(resetBasket());
                }, 500);
            });
    };

    return (
        <>
            <div className="items-center">
                <Button
                    disabled={order.total === 0}
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
                                You need to pay $ {order.total}
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
                                <div className="ml-28 mt-4">
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
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
