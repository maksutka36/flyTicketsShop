

export class TripStartbar{
    constructor(
        public to: string,
        public typeTrip: string,
        public price: number,
        public date: string,
        public timeTo: string,
        public timeFrom: string,
        public company: string,
        public imgCompany: string,
        public img:string,
        public wideImg: string,
        ){}
}


export class miniTrip{
    constructor(
        public from: string,
        public to: string,
        public typeTrip: string,
        public price: number,
        public date: string,
        public timeTo: string,
        public timeFrom: string,
        public company: string,
        public imgCompany: string,
        ){}
}

export class Airports{
    constructor(
        public nameTrip:string,
        public lat:number,
        public lng:number,
        public title:string
        ){}
}

export class UserData{
    constructor(
        public name: string,
        public email: string,
        public password: string
    ){}
}


