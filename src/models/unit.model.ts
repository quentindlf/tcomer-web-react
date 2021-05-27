export interface UnitModelBase {
    name: string,
    value: string
}

export interface UnitModel extends UnitModelBase {
    _id: string
}