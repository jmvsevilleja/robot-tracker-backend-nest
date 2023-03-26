import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  role: string;
}
