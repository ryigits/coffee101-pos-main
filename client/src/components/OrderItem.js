import Item from "./Item";

export default function OrderItem({ items }) {
    return (
        <>
            {items.map((item) => (
                <div key={item.id}><Item item={item} /></div>
            ))}
        </>
    );
}
