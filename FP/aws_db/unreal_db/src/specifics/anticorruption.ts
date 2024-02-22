import {guard} from "fp-ts-std/Function";
// other imports and code
import * as E from 'fp-ts/lib/Either';
import {
    LambdaEvent,
    RetrieveReservationRequest
} from "../../../../util/domain/types";
import {pipe} from "fp-ts/pipeable";

const toRetrieveRequest = (event: LambdaEvent): RetrieveReservationRequest => ({
    hotelId: event.queryStringParameters?.hotelId,
    userId: event.queryStringParameters?.userId,
    start: new Date(Date.parse(event.queryStringParameters?.start as string)),
});

const checkRetrieveRequest = (event: LambdaEvent) => {
    return event.queryStringParameters?.hotelId
    && event.queryStringParameters?.userId
    && event.queryStringParameters?.start ?
        E.right(event) :
        E.left('One or more empty fields. hotelId, userId and start are required.')
};

export const fromEventToRetrieveRequest = (event: LambdaEvent): E.Either<string, RetrieveReservationRequest> => {
    return pipe(
        checkRetrieveRequest(event),
        E.map(toRetrieveRequest),
    );
};

const checkRetrieveRequest = (event: LambdaEvent) => {
    const queryParamGuard = guard([
        [(e: LambdaEvent) => !e.queryStringParameters,
            () => `Missing query string params`],
        [(e: LambdaEvent) => !e.queryStringParameters.hotelId,
            () => `Missing hotel id`],
        [(e: LambdaEvent) => !e.queryStringParameters.userId,
            () => `Missing user id`],
        [(e: LambdaEvent) => !e.queryStringParameters.start,
            () => `Missing start`],
    ])(() => '');
    const message = queryParamGuard(event);

    return message ? E.left(message) : E.right(event);
};