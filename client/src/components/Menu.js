import Product from "./Product";

export default function Menu({ menu, order }) {
    return (
        <>
            {menu.map((product) => (
                <Product key={product.id} order={order} product={product} />
            ))}
        </>
    );
}
