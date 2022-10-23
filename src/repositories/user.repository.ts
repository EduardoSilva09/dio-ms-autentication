import db from '../db'
import User from '../Models/user.model'

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `
    SELECT 
        uuid, 
        username
    FROM 
        application_user
    `
    const res = await db.query<User>(query)

    return res.rows || []
  }

  async findById(uuid: string): Promise<User> {
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
  }
}

export default new UserRepository()
