export interface Scores {
    "math"?: number,
    "eng"?: number,
    "art"?: number
}

export default class Student {
    private readonly _id: number;
    private _name: string;
    private _password: string;
    private _scores: Scores

    constructor(id: number, name: string, password: string, scores: Scores) {
        this._id = id;
        this._name = name;
        this._password = password;
        this._scores = scores;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get scores(): Scores {
        return this._scores;
    }

    set scores(value: Scores) {
        this._scores = value;
    }

    get id(): number {
        return this._id;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
}