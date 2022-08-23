const moneyFormat = (money) => {
    return money.toLocaleString() + " TL";
};

const cleanDate = (date) => {
    return new Date(date).toString().slice(0, 24);
};

export { moneyFormat, cleanDate };
