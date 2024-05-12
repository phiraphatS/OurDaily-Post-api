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

  @Column("character varying", { name: "KEY", nullable: true, length: 255 })
  key: string | null;

  @Column("timestamp without time zone", {
    name: "IMG_URL_EXPIRED_DATE",
    nullable: true,
  })
  imgUrlExpiredDate: Date | null;

  @ManyToOne(() => Post, (post) => post.postImgs, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "POST_ID", referencedColumnName: "id" }])
  post: Post;
}
