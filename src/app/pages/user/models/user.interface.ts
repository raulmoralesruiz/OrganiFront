export interface UserInterface {
  _id?: {
    $oid: string
  }
  user_id?: string
  name: string
  email: string
  password: string
}