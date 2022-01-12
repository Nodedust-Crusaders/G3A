const checkAuthenticationStatus = (context) => {
  if (!context.user)
    return {
      message: "You have to be authenticated to access this resource",
    };

  return null;
};

const checkAuthorizationStatus = async (context, permission) => {
  loggedMessage = checkAuthenticationStatus(context);
  if (loggedMessage) return loggedMessage;

  if (!(await context.user.can(permission)))
    return {
      message: "You are not authorized to perform this operation",
    };

  return null;
};

module.exports = { checkAuthenticationStatus, checkAuthorizationStatus };
