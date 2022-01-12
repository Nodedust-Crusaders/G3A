const checkAuthenticationStatus = (context) => {
  if (!context.user)
    return {
      message: "You have to me authenticated to access this resource",
    };

  return null;
};

const checkAuthorizationStatus = async (context, permission) => {
  loggedMessage = checkLoggedIn(context);
  if (loggedMessage) return loggedMessage;

  if (!(await context.user.can(permission)))
    return {
      message: "You have to me authenticated to access this resource",
    };

  return null;
};
