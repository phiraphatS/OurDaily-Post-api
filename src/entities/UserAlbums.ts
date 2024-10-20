import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { SharedAlbums } from "./SharedAlbums";
import { User } from "./User";

@Index("userAlbums_pkey", ["albumId", "userId"], { unique: true })
@Entity("userAlbums", { schema: "public" })
export class UserAlbums {
  @Column("integer", { primary: true, name: "USER_ID" })
  userId: number;

  @Column("integer", { primary: true, name: "ALBUM_ID" })
  albumId: number;

  @Column("character varying", { name: "ROLE", length: 50 })
  role: string;

  @Column("timestamp with time zone", {
    name: "JOINED_AT",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  joinedAt: Date | null;

  @ManyToOne(() => SharedAlbums, (sharedAlbums) => sharedAlbums.userAlbums)
  @JoinColumn([{ name: "ALBUM_ID", referencedColumnName: "id" }])
  album: SharedAlbums;

  @ManyToOne(() => User, (user) => user.userAlbums)
  @JoinColumn([{ name: "USER_ID", referencedColumnName: "id" }])
  user: User;
}
