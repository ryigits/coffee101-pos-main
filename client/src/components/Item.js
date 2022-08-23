export default function Item({ item }) {
    return (
        <>
            <div className="text-green-500 flex-row p-1">
                {item.title} X {item.amount}
            </div>
        </>
    );
}
