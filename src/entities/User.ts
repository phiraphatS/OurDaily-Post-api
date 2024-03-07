import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Like } from "./Like";

@Index("User_pkey", ["id"], { unique: true })
@Entity("User", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "ID" })
  id: number;

  @Column("character varying", { name: "AVATAR", nullable: true, length: 1000 })
  avatar: string | null;

  @Column("character varying", { name: "AVATAR_KEY", nullable: true, length: 255 })
  avatarKey: string | null;

  @Column("timestamp without time zone", { name: "AVATAR_EXPIRED_DATE" })
  avatarExpiredDate: Date;

  @Column("character varying", { name: "FULL_NAME", length: 255 })
  fullName: string;

  @Column("character varying", { name: "EMAIL", length: 255 })
  email: string;

  @Column("character varying", { name: "PHONE", length: 255 })
  phone: string;

  @Column("character varying", { name: "PASSWORD", length: 255 })
  password: string;

  @Column("character varying", { name: "GENDER", length: 255 })
  gender: string;

  @Column("character varying", { name: "AGE", length: 255 })
  age: string;

  @Column("character varying", { name: "ROLENAME", length: 255 })
  rolename: string;

  @Column("integer", { name: "IS_ACTIVE" })
  isActive: number;

  @Column("integer", { name: "IS_DELETED" })
  isDeleted: number;

  @Column("timestamp without time zone", { name: "CREATED_DATE" })
  createdDate: Date;

  @Column("timestamp without time zone", {
    name: "MODIFIED_DATE",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedDate: Date;

  @Column("integer", { name: "CREATED_BY" })
  createdBy: number;

  @Column("integer", { name: "MODIFIED_BY" })
  modifiedBy: number;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
