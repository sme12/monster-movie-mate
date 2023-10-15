export enum Rate {
    Any,
    VeryBad,
    OKeish,
    Masterpiece,
}

export enum Period {
    Any,
    Old,
    Eighties,
    Modern,
}

export interface Filters {
    rate: Rate;
    period: Period;
}
