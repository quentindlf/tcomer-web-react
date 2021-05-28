export interface UnitModelBase {
    name: string,
    value: string,
    system: string,
    type: string
}

export interface UnitModel extends UnitModelBase {
    _id: string
}