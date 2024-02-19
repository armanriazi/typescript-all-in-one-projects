# TypeORM 

[typeorm-starter-ed](./typeorm-starter-ed/README.md)
[typeorm-cc](./typeorm-cc/README.md)

---

## Setup

```bash
pnpm install --save typeorm dotenv @nestjs/typeorm pg

```

 docker-compose.yml:

 ```yaml
version: '3.7'
services:
    postgres:
        image: postgres
        restart: always
        container_name: educative_db
        env_file: 
          - .env
        environment:
          - POSTGRES_USER=$POSTGRES_USER
          - POSTGRES_PASSWORD=$POSTGRES_PASSWORD
          - POSTGRES_DB=$POSTGRES_DATABASE 
        logging:
          options:
            max-size: 10m
            max-file: "3"
        ports:
          - '$POSTGRES_PORT:$POSTGRES_PORT_DOCKER'
        volumes: 
          - ./postgres-data:/var/lib/postgresql/data
          # copy the sql script to create tables
          - ./sql/create_tables.sql:/docker-entrypoint-initdb.d/create_tables.sql
 ```

 Next, create a .env file with the given values.

 ```js
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=myDb
POSTGRES_PORT_DOCKER=5432
POSTGRES_PORT=5432
DATABASE_URL=postgres://user:password@localhost:5432/myDb
 ```

 ```bash
 docker-compose -f "docker-compose.yml" up -d --build
 ```

Next, in the app.module.ts, we’ll be doing the following:

- [x] Add configuration to connect with our Docker database container.
- [x] Import our entities to create a corresponding table in the database.

## app.module.ts

- [x] url: This points to the database url—for example, postgres://user:password@localhost:5432/myDb.
- [x] ssl: This key is optional since some databases require server verification. For this lesson, we can always toggle this value between true and false or remove it entirely if necessary—for example, if a bug arises.
- [x] type: This specifies the type of database we intend to use. For this lesson, we’re using PostgreSQL.
- [x] entities: This is an array of the entities that we created.
- [x] synchronize: Always set this value as false. When set to true, two things might happen—new updates may be patched, or the entire database may be dropped before it’s updated. This will be disastrous for a staging or production environment. So, always set the synchronize value to false. When we make an update by adding or removing columns in an entity, creating or deleting entities, or updating a column name or value, we should run a migration explicitly rather than performing an auto-migration (that is, using synchronize: true).

## Migration

```json
"scripts": {
    "migrate:generate": "./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:generate -d data-source.ts ./src/migrations/$npm_config_name",
    "migrate:revert": "./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:revert -d data-source.ts",
    "migrate:run": "./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run -d data-source.ts"
  }
```

Next, at the root directory, create a data-source.ts file. This file defines the database configurations and related information. Update the file with the code below:

```ts
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "company_db",
    synchronize: false,
    logging: true,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/*-migrations.ts"],
})
```

```bash
pnpm migrate:generate && pnpm migrate:run
```

## Relationships

One-to-one

A one-to-one relationship is one in which an entity uniquely maps to another. A good example is a relationship that exists between a person and their fingerprint.

In TypeORM, we can achieve this using the @OneToOne decorator. Below, we define two tables with a few properties for both FingerPrint and Person classes. We use the @OneToOne decorator to specify the relationship between them.

We’re also using the @JoinColumn decorator. This specifies which table we want to include the foreign key. Keep in mind that only one of the tables should include the foreign key.

```ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from "typeorm"
import { Person } from "./Person"

@Entity()
export class FingerPrint {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    hash: string

    @OneToOne(() => Person)
    @JoinColumn()
    Person: Person
}

export default FingerPrint
```

Person Table

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column()
    sex: string
}
```

One-to-many

A one-to-many or many-to-one relationship is a relationship in which many records in an entity or table map to one record in another entity or table, or vice versa. This is achieved using a foreign key in one of the tables that maps uniquely to the other table.

Let’s create two entities in TypeORM—employees, and employer. As you may guess, this relationship is a many-to-one since many employees can belong to one employer. In the src folder, create a folder called entities with two files, employee.ts and employer.ts.

```ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar'})
  name: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email: string;
 
}
export default Employee

```

Employer table or entity

```ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar'})
  name: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

 
}
export default Employer
```

We now have two tables or entities. Next, we’ll create a relationship between them. To achieve this, we’ll import the @oneToMany and @ManyToOne decorators from the typeorm module. Also, we’ll import @JoinColumn to specify which of the tables the join column with a foreign key will be placed on.

Below, we import these decorators as well as the entity class with which we want to create a relationship:

```ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Employer from './employer';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar'})
  name: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email: string;
 
  @ManyToOne(() => Employer, (employer) => employer.employee)
  @JoinColumn()
  employer?: Employer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
export default Employee

```

Employer entity

```ts
import { Column, CreateDateColumn, Entity,  OneToMany,  PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Employee from './employee';

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar'})
  name: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
 
  @OneToMany(() => Employee, (employee) => employee.employer)
  employee: Employee[];
}
export default Employer

```

Many-to-many

In a many-to-many relationship, multiple records or entities in a table map to multiple records in another table. A good example is a relationship that exists between authors and books since a book may have multiple authors and an author may have written multiple books.

In TypeORM, we use the @ManyToMany and @JoinTable decorators to define this relationship. Below is an example:

```ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm"
import { Book } from "./Book"

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar"})
    name: string

    @ManyToMany(() => Book, (book) => book.authors, {
        cascade: true,
    })
    @JoinTable()
    books: Book[]
}
```

Book entity

```ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm"
import { Author } from "./Author"

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar"})
    name: string

    @ManyToMany(() => Author, (author) => author.books, {
        cascade: true,
    })
    @JoinTable()
    authors: Author[]
}
```

---

`CRUD operations Ref.To project` typeorm-starter-ed
`Integrate the app with the database: Ref.To project` typeorm-starter-ed