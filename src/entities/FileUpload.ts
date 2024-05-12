import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FileUpload_pkey", ["id"], { unique: true })
@Entity("FileUpload", { schema: "public" })
export class FileUpload {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "signed_url", nullable: true })
  signedUrl: string | null;

  @Column("character varying", {
    name: "originale_name",
    nullable: true,
    length: 255,
  })
  originaleName: string | null;

  @Column("character varying", {
    name: "mime_type",
    nullable: true,
    length: 50,
  })
  mimeType: string | null;

  @Column("bigint", { name: "file_size", nullable: true })
  fileSize: string | null;

  @Column("character varying", { name: "file_key", length: 255 })
  fileKey: string;

  @Column("boolean", { name: "is_actived", default: () => "true" })
  isActived: boolean;

  @Column("boolean", { name: "is_deleted", default: () => "false" })
  isDeleted: boolean;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("integer", { name: "created_by", default: () => "0" })
  createdBy: number;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @Column("integer", { name: "updated_by", nullable: true, default: () => "0" })
  updatedBy: number | null;
}
