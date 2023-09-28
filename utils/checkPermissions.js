//check  user Permissions for
/**
 * The function checks if the request user has the necessary permissions to access a resource based on
 * their role and user ID.
 * @param requestUser - The `requestUser` parameter represents the user who is making the request to
 * perform an action on a resource. It contains information about the user, such as their role and id.
 * @param resourceUserId - The `resourceUserId` parameter represents the user ID of the resource being
 * accessed or modified.
 * @returns If the requestUser's role is 'admin' or if the requestUser's id is equal to the
 * resourceUserId converted to a string, then nothing is returned. Otherwise, an error is thrown with
 * the message 'You are not authorized to perform this action'.
 */

const checkPermissions = (requestUser, resourceUserId) => {
  console.log(requestUser)
  console.loh(resourceUserId)
  // console.log(typeof  resourcesUserId);
  //if  request role is  equal to  admin, proceed with the function

  if (requestUser.role === 'admin') return

  if (requestUser.id === resourceUserId.toString()) return
  throw new Error('You are not authorized to perform this action')
}

module.exports = checkPermissions
