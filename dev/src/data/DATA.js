import dayjs from 'dayjs';

const term = (start, end) => {
    return {
        from: start,
        to:   end,
    };
};

function wbs () {
    return [
        { id: 10, name: 'WBS 10' },
        { id: 20, name: 'WBS 20' },
        { id: 30, name: 'WBS 30' },
        { id: 40, name: 'WBS 40' },
        { id: 50, name: 'WBS 50' },
        { id: 60, name: 'WBS 60' },
        { id: 70, name: 'WBS 70' },
        { id: 80, name: 'WBS 80' },
        { id: 90, name: 'WBS 90', parent: 10 },
        { id: 99, name: 'WBS 99', parent: 30  },
    ];
}

function workpackages () {
    return [
        {
            id: 1000,
            parent: 10,
            name: 'Task 1000',
            plan: term('2023-09-01', '2024-09-30'),
            result: term('2023-09-01', '2024-09-30'),
            progress: 50,
            style: {
                plan: { background: '#89c3eb'},
                result: { background: '#eaf4fc'},
                progress: {background: '#a0d8ef'},
            },
        },
        {
            id: 1001,
            parent: 10,
            name: 'Task 1001',
            plan: term('2023-10-01', '2023-10-31'),
            result: term('2023-10-05', null),
            progress: 95,
            url: 'https://www.google.com/',
        },
        {
            id: 2000,
            parent: 20,
            name: 'Task 2000',
            plan: term('2023-11-01', '2023-11-30'),
            result: term('2023-10-29', '2023-11-25'),
        },
        {
            id: 3000,
            parent: 30,
            name: 'Task 3000',
            plan: term('2023-11-15', '2024-01-31')
        },
        {
            id: 4000,
            parent: 40,
            name: 'Task 4000',
            plan: term('2024-01-01', '2024-04-15')
        },
        {
            id: 4001,
            parent: 40,
            name: 'Task 4001',
            plan: term('2024-01-01', '2024-04-15')
        },
        {
            id: 5000,
            parent: 50,
            name: 'Task 5000',
            plan: term('2024-04-01', '2024-05-31')
        },
        {
            id: 5001,
            parent: 50,
            name: 'Task 5001',
            plan: term('2024-04-01', '2024-05-31')
        },
        {
            id: 6000,
            parent: 60,
            name: 'Task 6000',
            plan: term('2024-06-01', '2024-07-31')
        },
        {
            id: 6001,
            parent: 60,
            name: 'Task 6001',
            plan: term('2024-06-01', '2024-07-31')
        },
        {
            id: 7000,
            parent: 70,
            name: 'Task 7000',
            plan: term('2024-06-01', '2024-07-31')
        },
        {
            id: 8000,
            parent: 80,
            name: 'Task 8000',
            plan: term('2024-06-01', '2024-07-31')
        },
        {
            id: 8001,
            parent: 80,
            name: 'Task 8001',
            plan: term('2024-06-01', '2024-07-31')
        },
        {
            id: 8800,
            parent: 80,
            name: 'Task 8800',
            plan: term('2024-08-01', '2024-08-31')
        },
        {
            id: 8801,
            parent: 80,
            name: 'Task 8801',
            plan: term('2024-08-01', '2024-08-31')
        },
        {
            id: 9000,
            parent: 90,
            name: 'Task 9000',
            plan: term('2023-09-01', '2023-09-30')
        },
        {
            id: 9001,
            parent: 90,
            name: 'Task 9001',
            plan: term('2023-10-01', '2023-12-31')
        },
        {
            id: 9002,
            parent: 90,
            name: 'Task 9002',
            plan: term('2024-01-01', '2024-01-31')
        },
        {
            id: 9003,
            parent: 90,
            name: 'Task 9003',
            plan: term('2024-02-01', '2024-04-30')
        },
        {
            id: 9004,
            parent: 90,
            name: 'Task 9004',
            plan: term('2024-02-01', '2024-07-12')
        },
        {
            id: 9005,
            parent: 90,
            name: 'Task 9005',
            plan: term('2024-07-13', '2024-11-12')
        },
        {
            id: 9006,
            parent: 90,
            name: 'Task 9006',
            plan: term('2024-02-01', '2024-05-31')
        },
        {
            id: 9007,
            parent: 90,
            name: 'Task 9007',
            plan: term('2024-09-06', '2024-11-12')
        },
        {
            id: 9008,
            parent: 90,
            name: 'Task 9008',
            plan: term('2024-10-18', '2024-11-23')
        },
        {
            id: 9900,
            parent: 99,
            name: 'Task 9900',
            plan: term('2023-09-01', '2024-07-31')
        },
    ];
}

const DATA = {
    scale: {
        // y(years), Q(quarters), M(months), w(weeks), d(days)
        // h(hours), m(minutes), s(seconds), ms(milliseconds)
        // cycle: 'M',
        cycle: 'w',
        w: 222,
        start: null,
        end: null,
    },
    wbs: wbs(),
    workpackages: workpackages(),
    style: {
        stage: {
            padding: 22,
            background: '#f8f8f8',
        },
        head: {
            h: 111,
            cell: {
                size: { w:0, h:0 },
                color: '#333',
                background: '#fafafa',
            },
            background: '#fff',
            // #546a7b border
            // #747a81 font
        },
        body: {
            row: {
                padding: 33,
                background: 'rgba(255,255,255,0.5)',
            },
            chart: {
                h: 111,
                padding: 11,
                background: '#e0ebaf',
                label: {
                    h: 122,
                    margin: { bottom:10 },
                },
                plan: {
                    h: 111,
                    background: '#e0ebaf',
                },
                result: {
                    h: 111,
                    shift: 22,
                    background: '#eeeeee',
                },
                progress: {
                    h: 111,
                    background: '#f00',
                },
            },
            background: '#fff',
            // #516f79 line
        },
        foot: {
            h: 33,
            background: '#fff',
        },
    }
};

export default DATA;
