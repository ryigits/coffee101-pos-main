import { Label, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useStatefulFields from "../hooks/use-stateful-fields";
import { useNavigate } from "react-router-dom";
import LastEndOfTheDay from "./LastEndOfTheDay";

export default function EndOfTheDay() {
    const [values, onFormInputChange] = useStatefulFields();
    let navigate = useNavigate();
    const onFormSubmit = async (e) => {
        e.preventDefault();
        await fetch("/api/endoftheday/end", {
            method: "POST",
            body: JSON.stringify({ time: selectedDay, ...values }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((data) => data.json());
        navigate("/");
    };
    // eslint-disable-next-line no-unused-vars
    const [selectedDay, setSelectedDay] = useState(
        new Date(new Date().valueOf() - 1000 * 60 * 60 * 2)
    ); // select day from two hours ago

    return (
        <>
            <div className="grid grid-cols-2 gap-8 h-2/3">
                <div>
                    <DayPicker
                        mode="single"
                        required
                        selected={selectedDay}
                    />
                    <LastEndOfTheDay/>
                </div>
                <form className="flex flex-col gap-2">
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
                            cikisyapantype="number"
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
                    <Button onClick={(e) => onFormSubmit(e)} type="submit">
                        Submit
                    </Button>
                </form>
                {/* {error && <p>FILL ALL LINES</p>} */}
            </div>
        </>
    );
}
