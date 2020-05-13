const monthArray = [
    {
        "month": "January",
        "numberOfDays": 31,
        "offset": 3,
    },
    {
        "month": "February",
        "numberOfDays": 29,
        "offset": 6,
    },
    {
        "month": "March",
        "numberOfDays": 31,
        "offset": 0,
    },
    {
        "month": "April",
        "numberOfDays": 30,
        "offset": 3,
    },
    {
        "month": "May",
        "numberOfDays": 31,
        "offset": 5,
    },
    {
        "month": "June",
        "numberOfDays": 30,
        "offset": 1,
    },
    {
        "month": "July",
        "numberOfDays": 31,
        "offset": 3,
    },
    {
        "month": "August",
        "numberOfDays": 31,
        "offset": 6,
    },
    {
        "month": "September",
        "numberOfDays": 30,
        "offset": 2,
    },
    {
        "month":"October",
        "numberOfDays": 31,
        "offset": 4,
    },
    {
        "month": "November",
        "numberOfDays": 30,
        "offset": 0,
    },
    {
        "month": "December",
        "numberOfDays": 31,
        "offset": 2,
    },
];

export default monthArray;

// const getOffset = (prevMonth) => {
        //     if (prevMonth === undefined) {
        //         return 3
        //     }
        //     const rawOffset = offset + (prevMonth.numberOfDays - 28)
        //     if (rawOffset > 6) {
        //         setOffset(rawOffset -7);
        //         return rawOffset - 7;
        //     } else {
        //         setOffset(rawOffset);
        //         return rawOffset;
        //     }
        // }