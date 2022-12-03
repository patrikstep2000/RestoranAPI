export interface FiltersProps{
    [index: string]: {filter:string, dbColumn:string[]}
}

export const RestaurantFilters: FiltersProps={
    CITY:{
        filter:'City',
        dbColumn:[
            'c.Name'
        ]
    },
    TAG:{
        filter:'Tag',
        dbColumn:[
            't.Name',
        ]
    }
}