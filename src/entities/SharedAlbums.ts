import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { UserAlbums } from "./UserAlbums";

@Index("sharedalbums_GOOGLE_ALBUM_ID_key", ["googleAlbumId"], { unique: true })
@Index("sharedalbums_pkey", ["id"], { unique: true })
@Index("sharedalbums_SHARE_TOKEN_key", ["shareToken"], { unique: true })
@Entity("sharedAlbums", { schema: "public" })
export class SharedAlbums {
  @PrimaryGeneratedColumn({ type: "integer", name: "ID" })
  id: number;

  @Column("character varying", {
    name: "GOOGLE_ALBUM_ID",
    unique: true,
    length: 255,
  })
  googleAlbumId: string;

  @Column("character varying", { name: "TITLE", length: 255 })
  title: string;

  @Column("character varying", {
    name: "SHARE_TOKEN",
    unique: true,
    length: 255,
  })
  shareToken: string;

  @Column("text", { name: "SHAREABLE_URL" })
  shareableUrl: string;

  @Column("timestamp with time zone", {
    name: "CREATED_AT",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp with time zone", {
    name: "UPDATED_AT",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.sharedAlbums)
  @JoinColumn([{ name: "CREATED_BY", referencedColumnName: "id" }])
  createdBy: User;

  @OneToMany(() => UserAlbums, (userAlbums) => userAlbums.album)
  userAlbums: UserAlbums[];
}
