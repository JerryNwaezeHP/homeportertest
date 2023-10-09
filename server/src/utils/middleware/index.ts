export const ErrorHandler = (err, _req, res, _next) => {
  if (!err) {
    return res.sendStatus(500);
  }
  const error: any = {
    message: err.message || 'Internal Server Error.',
  };
  error.stack = err.stack;
  if (err.errors) {
    error.errors = {};
    const { errors } = err;
    for (const type in errors) {
      if (type in errors) {
        error.errors[type] = errors[type].message;
      }
    }
  }
  res.status(err.status || 500).json(error);
};

export const AccessControl = (_req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, PATCH, DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Max-Age', '3600');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, pragma'
  );
  next();
};
