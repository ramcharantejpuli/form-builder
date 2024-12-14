import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Form } from "./Form";

@Entity()
export class Submission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Form)
  form: Form;

  @Column("jsonb")
  data: any;

  @CreateDateColumn()
  submittedAt: Date;
}
