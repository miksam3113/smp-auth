import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class UsersEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  created_at: Date;
}
