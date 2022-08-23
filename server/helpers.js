const calculateCiro = (lastday, currentday) => {
    +currentday.kasadancikis +
        +currentday.kasafix +
        +currentday.finansbank +
        +currentday.harcama -
        lastday.kasafix;
};

export { calculateCiro };
