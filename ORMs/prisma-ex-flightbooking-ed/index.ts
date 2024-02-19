import { Request, Response, Express } from "express";
import { PrismaClient, Employee, Prisma } from "@prisma/client";
const express = require('express');
require('dotenv'). config();

const prisma = new PrismaClient();

const app: Express = express();

const port: number|string = process.env.PORT || 3289;

app.use(express.json());
app.use(express.urlencoded());

// ****************************** CRUD******************************//

app.post("/create-employee", async (req: Request, res: Response) => {
  
  try {

    let { email, name } = req.body;

    await prisma.employee.create({
      data: {
        email,
        name
      },
    });

    let foundEmployees = await prisma.employee.findMany();

    console.table(foundEmployees);

    res.send(foundEmployees);

  } 
  
  catch (e) {
    console.error((e as Error).message);

    res.status(501).send((e as Error).message)
  }
  
});

app.get('/', async (req: Request, res: Response) => {
  try {

    let foundEmployees = await prisma.employee.findMany();

    console.table(foundEmployees);

    res.send(foundEmployees);
  }

  catch(e) {
    console.error((e as Error).message);

    res.status(501).send((e as Error).message)
  }
})

app.delete("/del", async (req: Request, res: Response) => {
  
  let { userId } = req.body;

  try {
    let result: Employee = await prisma.employee.delete({
      where: {
        id: userId,
      },
    });

    res.send({ message: "Data successfully deleted", data: result });
  } 
  catch (e) {
    console.error((e as Error).message);
    res.status(501).send({ error: (e as Error).message });
  }
});

app.put("/single/update", async (req: Request, res: Response) => {
  
  let { new_email, userId } = req.body;

  try {
    
      let result: Employee = await prisma.employee.update({
            where: {
              id: userId,
            },
            data: {
              email: new_email,
            },
          });

      res.send({ message: "Data successfully updated", data: result });
  } 
  catch (e) {
      console.error((e as Error).message);

      res.status(501).send({ error: (e as Error).message });
  }
});

app.put("/all/update", async (req: Request, res: Response) => {
  
  let { name, email } = req.body;

  try {
    
       
      let result: Prisma.BatchPayload= await prisma.employee.updateMany({
            where: {
              name,
            },
            data: {
              email
            },
          });

      res.send({ message: "Data successfully updated", data: result });
  } 
  catch (e) {
      console.error((e as Error).message);

      res.status(501).send({ error: (e as Error).message });
  }
});


// ***************************************

app.post('/company/create-account', async (req: Request, res: Response) => {
  try {
      let company_data = req.body

       // save company data
      let companyAccount = await prisma.company.create({
          data: company_data,
      });

      res.send({
          data: companyAccount,
          status: true,
          statusCode: 201
      })
  } catch (e) {
      res.status(501).send({ error: (e as Error).message })
  }
});

app.post('/company/create-employee', async (req: Request, res: Response) => {
  try {
      let { company_id, employeeDto } = req.body
      let foundCompany: Company | null = await prisma.company.findUnique({
          where: {
              id: Number(company_id),
          },
      });

      if (!foundCompany) throw new Error(
          `Sorry! we can't find any company with this mail ${company_id}`
      );

      // create employee
      let savedEmployee: Employee = await prisma.employee.create({
          data: {
              ...employeeDto,
              companyId: foundCompany.id,
          },
      });

      res.send({
          data: savedEmployee,
          status: true,
          statusCode: 201
      })

  }

  catch (e) {
      res.status(501).send({ error: (e as Error).message })
  }
});

app.get("/employee/:id", async (req: Request, res: Response) => {

  try {

      let { id } = req.params

      // Query(:::READ) related table
      let foundEmployees: Employee | null = await prisma.employee.findUnique({
          where: {
              id: Number(id),
          },
          include: {
              company: true,
          },
      });

      console.table(foundEmployees);

      res.send(foundEmployees);
  }

  catch (e) {
      res.status(501).send({ error: (e as Error).message })
  }
});



// ***************************************
app.listen(port, (): void => {
  console.log(`Successfully connected to db:::-> `, process.env.DATABASE_URL)

  console.log(`App is live on:::: -> ${process.env.EDU_LIVE_VM_URL} 🔥`);
});
