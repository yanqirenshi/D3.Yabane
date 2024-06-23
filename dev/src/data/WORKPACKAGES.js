import dayjs from 'dayjs';

import * as u from './uitls.js';

const term = (start, end) => {
    return {
        from: start,
        to:   end,
    };
};

const WORKPACKAGES = [
    {
        id: 1000,
        parent: 10,
        name: 'Task 1000',
        // 2023-09
        plan: term(u.thisMonth_Start(), u.thisMonthPlus12_End()),
        result: term(u.thisMonth_Start(), u.thisMonth_End()),
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
        // 2023-10
        plan: term(u.thisMonthPlus1_Start(), u.thisMonthPlus1_End()),
        result: term(u.thisMonthPlus1_Start(), null),
        progress: 95,
        url: 'https://www.google.com/',
    },
    {
        id: 2000,
        parent: 20,
        name: 'Task 2000',
        // 2023-11
        plan: term(u.thisMonthPlus2_Start(), u.thisMonthPlus2_End()),
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

export default WORKPACKAGES;
