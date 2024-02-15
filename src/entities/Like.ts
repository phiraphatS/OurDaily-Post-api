import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Index("Like_pkey", ["id"], { unique: true })
@Entity("Like", { schema: "public" })
export class Like {
  @PrimaryGeneratedColumn({ type: "integer", name: "ID" })
  id: number;

  @Column("timestamp without time zone", {
    name: "CREATED_AT",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("integer", { name: "IS_ACTIVE", default: () => "1" })
  isActive: number;

  @Column("integer", { name: "IS_DELETED", default: () => "0" })
  isDeleted: number;

  @Column("timestamp without time zone", {
    name: "MODIFIED_AT",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "POST_ID", referencedColumnName: "id" }])
  post: Post;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "USER_ID", referencedColumnName: "id" }])
  user: User;
}
