import dayjs from 'dayjs';

function fmt (v) {
    return v.format('YYYY-MM-DD');
}

export function thisMonth_Start () {
    return fmt(dayjs().startOf('month'));
}

export function thisMonth_End () {
    return fmt(dayjs().endOf('month'));
}

export function thisMonthPlus1_Start () {
    return fmt(dayjs().add(1, 'M').startOf('month'));
}

export function thisMonthPlus1_End () {
    return fmt(dayjs().add(1, 'M').endOf('month'));
}

export function thisMonthPlus2_Start () {
    return fmt(dayjs().add(2, 'M').startOf('month'));
}

export function thisMonthPlus2_End () {
    return fmt(dayjs().add(2, 'M').endOf('month'));
}

export function thisMonthPlus12_End () {
    return fmt(dayjs().add(12, 'M').endOf('month'));
}
