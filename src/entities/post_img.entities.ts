import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entities";

@Entity()
export class PostImg {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column("varchar", { name: "IMG_URL", length: 500 })
  imgUrl: string;

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

  @Column("integer", { name: "POST_ID" })
  postId: number;

  @ManyToOne(
    () => Post,
    (post) => post.id,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "POST_ID", referencedColumnName: "id" }])
  post: Post;
}