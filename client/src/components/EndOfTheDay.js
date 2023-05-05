import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useStatefulFields from "../hooks/use-stateful-fields";
import { useNavigate } from "react-router-dom";
import LastEndOfTheDay from "./LastEndOfTheDay";

export default function EndOfTheDay() {
    const [values, onFormInputChange] = useStatefulFields();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isOdtu, setIsOdtu] = useState(false);
    const [alreadyEnd, setAlreadyEnd] = useState(false);
    let navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [selectedDay, setSelectedDay] = useState(
        new Date(new Date().valueOf() - 1000 * 60 * 60 * 2) // 2 saatlik tolerans
    );

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/endoftheday/end", {
            method: "POST",
            body: JSON.stringify({ time: new Date(), ...values }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((data) => data.json())
            .then(() => {
                setSuccess(true);
            });
        setTimeout(() => navigate("/"), 3000);
    };

    const compareDates = (d1, d2) => {
        let date1 = new Date(d1).getDay();
        let date2 = new Date(d2).getDay();
        if (date1 === date2) {
            return true;
        }
    };

    useEffect(() => {
        fetch("/api/endoftheday/last")
            .then((data) => data.json())
            .then((last) => {
                if (last.location === "odtu") {
                    setIsOdtu(true);
                }
                if (
                    compareDates(
                        last.createdAt,
                        new Date(new Date().valueOf() - 1000 * 60 * 60 * 2)
                    )
                ) {
                    setAlreadyEnd(true);
                }
            });
    }, []);

    return (
        <>
            <div className="grid grid-cols-2 gap-8 h-2/3">
                <div>
                    <DayPicker mode="single" selected={selectedDay} />
                    <LastEndOfTheDay />
                    {alreadyEnd && (
                        <div className="w-full mt-4">
                            <Alert withBorderAccent={true} color="warning">
                                <span>
                                    <span className="font-normal">
                                        Gunsonu daha once alinmistir. Hata var
                                        ise whatsapptan bildirin.
                                    </span>
                                </span>
                            </Alert>
                        </div>
                    )}
                    {loading && (
                        <div className="w-full mt-4">
                            <Alert withBorderAccent={true} color="warning">
                                <span>
                                    <Spinner color="warning" size="md" />
                                    <span className="font-medium">
                                        Please wait.....
                                    </span>
                                </span>
                            </Alert>
                        </div>
                    )}
                    {success && (
                        <div className=" mt-4 w-full">
                            <Alert withBorderAccent={true} color="info">
                                <span>
                                    <span className="font-medium">
                                        Successfull
                                    </span>
                                    <br></br>
                                    EndofTheDay has been successfully recorded !
                                </span>
                            </Alert>
                        </div>
                    )}
                </div>
                <form className="flex flex-col gap-2">
                    {isOdtu && (
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="ziraatbank"
                                    value="Ziraatbank Credit"
                                />
                            </div>
                            <TextInput
                                id="ziraatbank"
                                name="ziraatbank"
                                type="number"
                                onChange={onFormInputChange}
                                required={true}
                            />
                        </div>
                    )}

                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="finansbank"
                                value="Finansbank Credit"
                            />
                        </div>
                        <TextInput
                            id="finansbank"
                            name="finansbank"
                            type="number"
                            onChange={onFormInputChange}
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="kasadancikis"
                                value="Cash Money Out"
                            />
                        </div>
                        <TextInput
                            id="kasadancikis"
                            name="kasadancikis"
                            type="number"
                            required={true}
                            onChange={onFormInputChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="cikisyapan" value="Whom" />
                        </div>
                        <TextInput
                            id="cikisyapan"
                            name="cikisyapan"
                            type="text"
                            placeholder="Your Name"
                            required={true}
                            onChange={onFormInputChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="harcama" value="Daily Expense" />
                        </div>
                        <TextInput
                            id="harcama"
                            name="harcama"
                            type="number"
                            required={true}
                            onChange={onFormInputChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="kasafix" value="Cash Fix" />
                        </div>
                        <TextInput
                            id="kasafix"
                            name="kasafix"
                            type="number"
                            required={true}
                            onChange={onFormInputChange}
                        />
                    </div>
                    <Button
                        disabled={loading || alreadyEnd}
                        onClick={(e) => onFormSubmit(e)}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
                {/* {error && <p>FILL ALL LINES</p>} */}
            </div>
        </>
    );
}
