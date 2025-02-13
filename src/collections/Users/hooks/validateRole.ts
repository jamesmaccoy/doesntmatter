import { CollectionBeforeValidateHook } from 'payload'

export const validateRole: CollectionBeforeValidateHook = async ({ data, req: { user } }) => {
  if (!user) {
    throw new Error('You must be logged in to create a user')
  }

  if (user.role?.includes('admin')) return data

  if (
    user.role?.includes('assure') &&
    data?.role?.length === 1 &&
    data.role?.includes('beneficiary')
  )
    return data

  throw new Error('You do not have permission to create a user with that role')
}
