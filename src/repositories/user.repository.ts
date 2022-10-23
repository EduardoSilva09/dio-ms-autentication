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
}

export default new UserRepository()
