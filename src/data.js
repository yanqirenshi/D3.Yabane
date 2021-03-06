var yabane_data = [
    {
        _class: 'WBS',
        _id: 1,
        code: '1',
        name: 'www.yahoo.co.jp',
        uri: 'https://www.yahoo.co.jp/',
        schedule: {
            start: moment().add(-1, 'h').toDate(),
            end: moment().add(1, 'h').toDate(),
        },
        children: [],
    },
    {
        _class: 'WBS',
        _id: 2,
        code: '2',
        name: 'www.google.co.jp',
        uri: 'https://www.google.co.jp/',
        children: [
            {
                _class: 'WORKPACKAGE',
                _id: 10,
                code: '10',
                name: 'www.facebook.com',
                uri: 'https://www.facebook.com/',
                schedule: {
                    start: moment().add(-1, 'h').toDate(),
                    end: moment().add(1, 'h').toDate(),
                },
                children: [],
            },
            {
                _class: 'WORKPACKAGE',
                _id: 11,
                code: '11',
                name: 'www.facebook.com',
                uri: 'https://twitter.com/',
                schedule: {
                    start: moment().add(2, 'h').toDate(),
                    end: moment().add(4, 'h').toDate(),
                },
                children: [],
            }
        ]
    },
    {
        _class: 'WORKPACKAGE',
        _id: 3,
        code: '3',
        name: 'www.amazon.co.jp',
        uri: 'https://www.amazon.co.jp/',
        schedule: {
            start: moment().add(5, 'h').toDate(),
            end: moment().add(6, 'h').toDate(),
        },
        children: [],
    },
    {
        _class: 'WORKPACKAGE',
        _id: 4,
        code: '4',
        name: 'www.facebook.com',
        uri: 'https://www.facebook.com/',
        schedule: {
            start: moment().add(7, 'h').toDate(),
            end: moment().add(10, 'h').toDate(),
        },
        children: [],
    },
    {
        _class: 'WORKPACKAGE',
        _id: 5,
        code: '5',
        name: 'www.facebook.com',
        uri: 'https://twitter.com/',
        schedule: {
            start: moment().add(11, 'h').toDate(),
            end: moment().add(12, 'h').toDate(),
        },
        children: [],
    },
];
