import { Column } from "typeorm";
import { Base } from "./Base";

export abstract class AbstractTinyUrl extends Base {
  @Column("text")
  shortUrl: string;

  @Column("text")
  longUrl: string;
}
