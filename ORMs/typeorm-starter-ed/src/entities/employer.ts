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
  employee?: Employee[];
}


export default Employer
