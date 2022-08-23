import { Label, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useStatefulFields from "../hooks/use-stateful-fields";
import useAuthSubmit from "../hooks/use-auth-submit";
export default function EndOfTheDay() {
    const [values, onFormInputChange] = useStatefulFields();
    const [error, onFormSubmit] = useAuthSubmit("/endoftheday", values);

    const [selectedDay, setSelectedDay] = useState(new Date());
    const footer = selectedDay ? (
        <p className="text-blue-500">
            You selected {format(selectedDay, "P")}.
        </p>
    ) : (
        <p className="text-rose-500">Please pick a day.</p>
    );

    return (
        <>
            <div className="grid grid-cols-2 gap-8 h-2/3">
                <div>
                    <DayPicker
                        mode="single"
                        selected={selectedDay}
                        onSelect={setSelectedDay}
                        footer={footer}
                    />
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
                            <Label htmlFor="cikisyapan" value="Who" />
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
                    <Button onChange={onFormSubmit} type="submit">
                        Submit
                    </Button>
                </form>
                {error && <p>FILL ALL LINES</p>}
            </div>
        </>
    );
}
