import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Form } from './Form';

@Entity('form_submissions')
export class FormSubmission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Form, form => form.submissions)
  @JoinColumn({ name: 'formId' })
  form!: Form;

  @Column()
  formId!: string;

  @Column('jsonb')
  data!: Record<string, any>;

  @Column({ nullable: true })
  submittedBy?: string;

  @Column({ 
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  })
  status!: 'pending' | 'approved' | 'rejected';

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  submittedAt!: Date;
}
