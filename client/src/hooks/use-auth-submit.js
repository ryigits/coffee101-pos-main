import { useState } from "react";

export default function useAuthSubmit(url, values) {
    const [error, setError] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (!data.success && data.message) {
                    setError(data.message);
                } else {
                    // basarili
                }
            })
            .catch((err) => {
                console.log("Trouble reaching the server");
                setError(err);
            });
    };

    return [error, onSubmit];
}
