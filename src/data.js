var graph_data = [
    {code: '1', name: 'www.yahoo.co.jp',
     start: new Date('2017-10-01'), end: new Date('2017-10-12'),
     uri: 'https://www.yahoo.co.jp/',
     detail: []},
    {code: '2', name: 'www.google.co.jp',
     start: new Date('2017-10-01'), end: new Date('2017-10-23'),
     uri: 'https://www.google.co.jp/',
     detail: []},
    {code: '3', name: 'www.amazon.co.jp',
     start: new Date('2017-10-03'), end: new Date('2017-11-04'),
     uri: 'https://www.amazon.co.jp/',
     detail: []},
    {code: '4', name: 'www.facebook.com',
     start: new Date('2017-10-04'), end: new Date('2017-11-17'),
     uri: 'https://www.facebook.com/',
     detail: []},
    {code: '5', name: 'www.facebook.com',
     start: new Date('2017-10-05'), end: new Date('2017-11-30'),
     uri: 'https://twitter.com/',
     detail: []},
];


var graph_data_new = [
    {
        code: '1', name: 'www.yahoo.co.jp',
        start: new Date('2018-08-01'), end: new Date('2018-08-12'),
        uri: 'https://www.yahoo.co.jp/',
        children: []
    },
    {
        code: '2', name: 'www.google.co.jp',
        start: new Date('2018-08-01'), end: new Date('2018-08-23'),
        uri: 'https://www.google.co.jp/',
        children: [
            {
                code: '10', name: 'www.facebook.com',
                start: new Date('2018-08-04'), end: new Date('2018-11-17'),
                uri: 'https://www.facebook.com/',
                children: []
            },
            {
                code: '11', name: 'www.facebook.com',
                start: new Date('2018-08-05'), end: new Date('2018-11-30'),
                uri: 'https://twitter.com/',
                children: []
            }
        ]
    },
    {
        code: '3', name: 'www.amazon.co.jp',
        start: new Date('2018-08-03'), end: new Date('2018-11-04'),
        uri: 'https://www.amazon.co.jp/',
        children: []
    },
    {
        code: '4', name: 'www.facebook.com',
        start: new Date('2018-08-04'), end: new Date('2018-11-17'),
        uri: 'https://www.facebook.com/',
        children: []
    },
    {
        code: '5', name: 'www.facebook.com',
        start: new Date('2018-08-05'), end: new Date('2018-11-30'),
        uri: 'https://twitter.com/',
        children: []
    },
];
