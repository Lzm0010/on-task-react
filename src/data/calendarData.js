const monthArray = [
    {
        "month": "January",
        "abbr": "Jan",
        "numberOfDays": 31,
        "offset": 3,
    },
    {
        "month": "February",
        "abbr": "Feb",
        "numberOfDays": 29,
        "offset": 6,
    },
    {
        "month": "March",
        "abbr": "Mar",
        "numberOfDays": 31,
        "offset": 0,
    },
    {
        "month": "April",
        "abbr": "Apr",
        "numberOfDays": 30,
        "offset": 3,
    },
    {
        "month": "May",
        "abbr": "May",
        "numberOfDays": 31,
        "offset": 5,
    },
    {
        "month": "June",
        "abbr": "Jun",
        "numberOfDays": 30,
        "offset": 1,
    },
    {
        "month": "July",
        "abbr": "Jul",
        "numberOfDays": 31,
        "offset": 3,
    },
    {
        "month": "August",
        "abbr": "Aug",
        "numberOfDays": 31,
        "offset": 6,
    },
    {
        "month": "September",
        "abbr": "Sep",
        "numberOfDays": 30,
        "offset": 2,
    },
    {
        "month":"October",
        "abbr": "Oct",
        "numberOfDays": 31,
        "offset": 4,
    },
    {
        "month": "November",
        "abbr": "Nov",
        "numberOfDays": 30,
        "offset": 0,
    },
    {
        "month": "December",
        "abbr": "Dec",
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