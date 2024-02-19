import { Request, Response, NextFunction } from "express";

export interface IFlightController {
    bookFlight: (req: Request, res: Response, next: NextFunction) => void
    getFlightDtByUserId: (req: Request, res: Response, next: NextFunction) => void
    cancelFlightById:(req: Request, res: Response, next: NextFunction) => void

}

export interface IUserController {
    registerUser: (req: Request, res: Response, next: NextFunction) => void
    getUserDtById: (req: Request, res: Response, next: NextFunction) => void
}


export interface IRes<T> {
    data: T
    status: boolean
    statusCode:number
    message?: string
}