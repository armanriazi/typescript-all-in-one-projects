import { Request, Response, NextFunction } from "express";
import { IFlightController, IRes } from "../../global";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class FlightController {
    constructor() { }

    static async bookFlight(req: Request, res: Response, next: NextFunction) {
        try {
        }
        catch (error) {
        }
        finally {
        }
    }
static async bookFlight(req: Request, res: Response, next: NextFunction) {
    try {
        let {
            leavingAt,
            returningAt,
            country,
            state,
            destination,
            tripType,
            passengerSize,
            promoCode,
            amount,
            email,
            user_id,
        } = req.body;

        let bookedFlight = await prisma.flightBooking.create({
            data: {
                leavingAt: new Date(leavingAt).toISOString(),
                returningAt: new Date(returningAt).toISOString(),
                country,
                state,
                destination,
                tripType,
                passengerSize: Number(passengerSize),
                promoCode,
                amount: Number(amount),
                email,
                user_id: Number(user_id),
            },
        });


        let responseBody: IRes<typeof bookedFlight> = {
            data: bookedFlight,
            status: true,
            statusCode: 201,
            message: "Congratulations!, your flight is successfully booked.",
        };

        res.status(201).send(responseBody);

    } catch (error) {

        return res.status(501).send({
            status: "fail",
            message: "Sorry, we could not book your flight at this time",
        });
    } finally {
        await prisma.$disconnect();
    }
}

static async getFlightDtByUserId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let _id = Number(req.params.id);

    try {
        let foundFlight = await prisma.flightBooking.findMany({
            where: {
                user_id: _id,
            },
            include: {
                user: true,
            },
        });

        if (!foundFlight) throw new Error("This flight is not found");

        let resBody: IRes<typeof foundFlight> = {
            data: foundFlight,
            status: true,
            statusCode: 201,
            message: "Flight data found",
        };

        res.status(resBody.statusCode).send(resBody);
    } catch (e) {
        res.status(404).send({ message: (e as Error).message });
    }
}

static async cancelFlightById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        let _id = Number(req.params.id);
        await prisma.flightBooking.delete({
            where: {
                id: _id,
            },
        });

        res.send({
            message: "Flight deleted successfully",
        });
    } catch (e) {
        res.send({
            message: (e as Error).message,
        });
    }
}
}

export default {
    bookFlight: FlightController.bookFlight,
    getFlightDtByUserId: FlightController.getFlightDtByUserId,
    cancelFlightById: FlightController.cancelFlightById
} as IFlightController;