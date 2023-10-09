import { Model, Table, Column, DataType } from 'sequelize-typescript'

@Table({
  tableName: 'users',
  timestamps: false,
})
export class Users extends Model<Users> {
  @Column({
    field: 'user_id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  user_id?: number

  @Column({
    field: 'cognito_id',
    type: DataType.STRING(60),
  })
  cognito_id!: string

  @Column({
    field: 'token',
    type: DataType.STRING(255),
  })
  token!: string

  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  created_at!: string

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  updated_at!: string
}
