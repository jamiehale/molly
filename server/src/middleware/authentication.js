export const authenticated =
  ({ apiKeysRepo }) =>
  async (req, res, next) => {
    const authorization = req.get('Authorization');
    if (authorization) {
      if (authorization.startsWith('ApiKey')) {
        const [_ignore, secret] = authorization.split(' ');
        if (secret) {
          try {
            const apiKey = await apiKeysRepo.readApiKeyBySecret(secret);
            if (apiKey) {
              res.locals.userId = apiKey.userId;
              next();
            } else {
              next(new HttpError('No such user'));
            }
          } catch (e) {
            next(e);
          }
        } else {
          next(new Error('Invalid ApiKey'));
        }
      } else {
        next(new Error('Invalid authorization method'));
      }
    } else {
      next();
    }
  };
