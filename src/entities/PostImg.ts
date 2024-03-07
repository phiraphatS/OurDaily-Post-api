import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";

@Index("PostImg_pkey", ["id"], { unique: true })
@Entity("PostImg", { schema: "public" })
export class PostImg {
  @PrimaryGeneratedColumn({ type: "integer", name: "ID" })
  id: number;

  @Column("character varying", { name: "IMG_URL", length: 500 })
  imgUrl: string;

  @Column("character varying", { name: "KEY", length: 255 })
  key: string;

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

  @ManyToOne(() => Post, (post) => post.postImgs, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "POST_ID", referencedColumnName: "id" }])
  post: Post;
}
