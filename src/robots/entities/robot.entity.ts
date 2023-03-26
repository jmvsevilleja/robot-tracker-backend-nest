import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class Robot {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  purpose: string;

  @Column()
  userId: string;
}
