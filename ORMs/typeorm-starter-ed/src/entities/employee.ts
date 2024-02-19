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
}


export default Employee
