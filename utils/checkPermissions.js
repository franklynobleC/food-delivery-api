//check  user Permissions for

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
