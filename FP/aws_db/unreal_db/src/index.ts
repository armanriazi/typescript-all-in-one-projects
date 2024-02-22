import {LambdaEvent} from "../../../util/domain/types";
import * as TE from 'fp-ts/lib/TaskEither';
import * as T from 'fp-ts/lib/Task';
import {LambdaEvent} from "../../../util/domain/types";
import {fromEventToRetrieveRequest} from "./specifics/anticorruption";
import {pipe} from "fp-ts/pipeable";
import {retrieve} from "./specifics/database";
import {badRequestResponse, okResponse} from "../../../util/common/responses";

export const handler = async (event: LambdaEvent) => {
    console.log(event);
    return pipe(
        fromEventToRetrieveRequest(event),
        TE.fromEither,
        TE.chain(retrieve),
        TE.map(res => okResponse(JSON.stringify(res))),
        TE.getOrElse((err) => T.of(badRequestResponse(err)))
    )();
};
export const handler = async (event: LambdaEvent) => {
    return {
        statusCode: 200,
    }
};