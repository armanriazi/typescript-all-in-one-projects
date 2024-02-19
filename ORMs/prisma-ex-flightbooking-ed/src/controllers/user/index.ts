import { Request, Response, NextFunction } from "express";
import { IRes } from "../../global";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();


class UserController {
    constructor() { }
static async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        let { name, nationality, national_id, maritalStatus, sex, age } =
            req.body;

        console.log("working!!", nationality);
        let userFlightReg = await prisma.user.create({
            data: {
                name,
                nationality,
                national_id,
                maritalStatus,
                sex,
                age,
            },
        });

        console.log(userFlightReg);

        let responseBody: IRes<User> = {
            data: userFlightReg,
            status: true,
            statusCode: 201,
            message: "User details saved.",
        };

        res.status(201).send(responseBody);
    } catch (e) {
        res.status(501).send({ message: (e as Error).message });
    }
}


static async getUsertDtById(req: Request, res: Response, next: NextFunction) {
    try {
        let userId: number = Number(req.params.id);

        let foundUser: User | null = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!foundUser)
            throw new Error("This user is not found or not registered.");

        let resBody: IRes<User> = {
            message: "User successfully found",
            status: true,
            statusCode: 200,
            data: foundUser,
        };

        return res.status(resBody.statusCode).send(resBody);
    } catch (e) {
        res.status(404).send({ message: (e as Error).message });
    }
}
}

export default {
    registerUser: UserController.registerUser,
    getUsertDtById: UserController.getUsertDtById,
};
