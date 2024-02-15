import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { PostImg } from "./PostImg";

@Index("Post_pkey", ["id"], { unique: true })
@Entity("Post", { schema: "public" })
export class Post {
  @PrimaryGeneratedColumn({ type: "integer", name: "ID" })
  id: number;

  @Column("character varying", { name: "CONTENT_TEXT", length: 1500 })
  contentText: string;

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

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => PostImg, (postImg) => postImg.post)
  postImgs: PostImg[];
}
