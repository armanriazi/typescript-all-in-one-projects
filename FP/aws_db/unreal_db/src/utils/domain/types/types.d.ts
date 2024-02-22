type QueryStringParams = {
    hotelId?: string,
    userId?: string,
    start?: string,
}

export type LambdaEvent = {
    queryStringParameters?: QueryStringParams,
    body?: string,
}

export type Reservation = {
    hotelId: string,
    userId: string,
    start: Date,
    end: Date,
    timestamp: Date,
    price: number,
};