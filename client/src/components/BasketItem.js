export default function BasketItem({item,product}) {
    return (
        <>
            <div className="text-white text-xl font-light bg-zinc-400 p-1">
                {product.title} X {item.amount} 
            </div>
        </>
    );
};
