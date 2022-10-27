import db from '../db'
import { DatabaseError } from '../Models/errors/database.error.model'
import User from '../Models/user.model'

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    try {
      const query = `
      SELECT 
          uuid, 
          username
      FROM 
          application_user
      `
      const res = await db.query<User>(query)

      return res.rows || []
    } catch (error) {
      console.log(error)
      throw new DatabaseError('Erro na consulta de usuários',error)
    }
  }

  async findById(uuid: string): Promise<User> {
    try {
      const query = `
      SELECT 
          uuid, 
          username
      FROM 
          application_user
      WHERE 
          uuid = $1
      `
      const values = [uuid]

      const { rows } = await db.query<User>(query, values)
      const [user] = rows

      return user
    } catch (error) {
      console.log(error)
      throw new DatabaseError('Erro na consulta de usuário por ID', error)
    }
  }

  async create(user: User): Promise<string> {
    try {
      const query = `
      INSERT INTO application_user 
       (
          username, 
          password
       )
      VALUES ($1, crypt($2, $3))
      RETURNING uuid
      `
      const values = [user.username, user.password, process.env.SALT_KEY]

      const { rows } = await db.query<{ uuid: string }>(query, values)
      const [newUser] = rows

      return newUser.uuid
    } catch (error) {
      console.log(error)
      throw new DatabaseError('Erro ao gravar registro do usuário', error)
    }
  }

  async update(user: User): Promise<void> {
    try {
      const query = `
      UPDATE application_user 
      SET
          username = $1, 
          password = crypt($2, $3)
      WHERE
          uuid = $4
      `
      const values = [
        user.username,
        user.password,
        process.env.SALT_KEY,
        user.uuid,
      ]

      await db.query(query, values)
    } catch (error) {
      console.log(error)
      throw new DatabaseError('Erro ao atualizar registro do usuário', error)
    }
  }

  async remove(uuid: string): Promise<void> {
    try {
      const query = `
      DELETE 
      FROM
         application_user 
      WHERE
          uuid = $1
      `
      const values = [uuid]

      await db.query(query, values)
    } catch (error) {
      console.log(error)
      throw new DatabaseError('Erro ao excluir registro do usuário', error)
    }
  }
}

export default new UserRepository()
