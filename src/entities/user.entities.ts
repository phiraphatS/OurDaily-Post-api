import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column("varchar", { name: "AVATAR", length: 1000, nullable: true })
  avatar: string;

  @Column("varchar", { name: "FULL_NAME", length: 255 })
  fullname: string;

  @Column("varchar", { name: "EMAIL", length: 255 })
  email: string;

  @Column("varchar", { name: "PHONE", length: 255 })
  phone: string;

  @Column("varchar", { name: "PASSWORD", length: 255 })
  password: string;

  @Column("varchar", { name: "GENDER", length: 255 })
  gender: string;

  @Column("varchar", { name: "AGE", length: 255 })
  age: string;

  @Column("varchar", { name: "ROLENAME", length: 255 })
  roleName: string;

  @Column("integer", { name: "IS_ACTIVE" })
  isActive: number;

  @Column("integer", { name: "IS_DELETED" })
  isDeleted: number;

  @Column({ type: 'datetime', name: 'CREATED_DATE' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'MODIFIED_DATE' })
  modifiedDate: Date;

  @Column("integer", { name: "CREATED_BY" })
  createdBy: number;

  @Column("integer", { name: "MODIFIED_BY" })
  modifiedBy: number;
}