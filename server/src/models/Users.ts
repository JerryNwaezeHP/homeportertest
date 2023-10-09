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
}
