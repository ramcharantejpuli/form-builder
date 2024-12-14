import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { FormSubmission } from './FormSubmission';
import { User } from './User';

@Entity('forms')
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column('jsonb')
  fields!: any[];

  @Column({ unique: true })
  shareableLink!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column('jsonb', { nullable: true })
  settings?: {
    allowMultipleSubmissions?: boolean;
    requireAuthentication?: boolean;
    notifyOnSubmission?: boolean;
    submitButtonText?: string;
    successMessage?: string;
  };

  @ManyToOne(() => User, user => user.forms)
  user!: User;

  @Column()
  userId!: string;

  @OneToMany(() => FormSubmission, submission => submission.form)
  submissions!: FormSubmission[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
