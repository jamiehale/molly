import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import crypto from 'node:crypto';
import {
  routes,
  getSingleResource,
  getAllResources,
  postResource,
  patchResource,
  getAllChildResources,
  postChildResource,
} from '../resource-helpers.js';
import * as V from '../validation.js';
import * as J from '../jlib.js';
import { InternalError, NotFoundError, ParameterError } from '../error.js';

const query = () =>
  V.object({
    q: V.optional(V.isNotNull()),
  });

const postBody = () =>
  V.object({
    key: V.and(V.required(), V.isNotNull()),
    path: V.and(V.required(), V.isNotNull()),
  });

const patchTagsBody = () => V.isArray();

const patchBody = (validGenderFn) =>
  V.and(
    V.object({
      givenNames: V.optional(V.isNotNull()),
      surname: V.optional(V.isNotNull()),
      genderId: V.optional(V.and(V.isNotNull(), V.validResource(validGenderFn))),
    }),
    V.isNotEmpty(() => new ParameterError('No fields to update!')),
  );

const postChildBody = (validChildfn, validParentRoleFn) =>
  V.object({
    childId: V.and(V.required(), V.isNotNull(), V.validResource(validChildfn)),
    parentRoleId: V.and(V.required(), V.isNotNull(), V.validResource(validParentRoleFn)),
  });

const postParentBody = (validParentFn, validParentRoleFn) =>
  V.object({
    parentId: V.and(V.required(), V.isNotNull(), V.validResource(validParentFn)),
    parentRoleId: V.and(V.required(), V.isNotNull(), V.validResource(validParentRoleFn)),
  });

const toResult = J.pick(['id', 'givenNames', 'surname', 'genderId', 'genderTitle', 'creatorId']);

const toChildResult = J.pick([
  'id',
  'givenNames',
  'surname',
  'genderId',
  'creatorId',
  'parentRoleId',
  'parentRoleTitle',
]);

const toParentResult = J.pick([
  'id',
  'givenNames',
  'surname',
  'genderId',
  'creatorId',
  'parentRoleId',
  'parentRoleTitle',
]);

const postTagBody = V.object({ tag: V.required() });

const receiveFile = (tmpFilename) =>
  new Promise((resolve, reject) => {
    const output = fs.createWriteStream(tmpFilename);
    output.on('open', () => {
      req.pipe(output);
    });
    output.on('error', reject);
    output.on('close', resolve);
  });

const hashFile = (tmpFilename) => {
  const hashStream = crypto.createHash('sha1');
  const inputStream = fs.createReadStream(tmpFilename);
  inputStream.pipe(hashStream);
  return hashStream.digest('hex');
};

const objectPathFromHash = (hash) =>
  hash
    .match(/.{1,2}/g)
    .slice(0, 3)
    .join('/');

export const mobjectRoutes = (config, { mobjectsRepo }) =>
  routes([
    (router) => {
      router.post('/o/(*)/-/tags', (req, res, next) => {
        const key = req.params[0];
        mobjectsRepo
          .mobjectExists(key)
          .then(J.throwIfFalse(() => new NotFoundError('Not found')))
          .then(() =>
            postTagBody({
              scope: '',
              value: req.body,
            }).then(({ tag }) =>
              mobjectsRepo.createMobjectTag(key, tag).then(() => {
                res.status(201);
                res.send();
              }),
            ),
          )
          .catch(next);
      });
    },
    (router) => {
      router.get('/o/(*)/-/tags', (req, res, next) => {
        const key = req.params[0];
        mobjectsRepo
          .mobjectExists(key)
          .then(J.throwIfFalse(() => new NotFoundError('Not found')))
          .then(() =>
            mobjectsRepo.readAllMobjectTags(key).then((tags) => {
              res.json(tags);
            }),
          )
          .catch(next);
      });
    },
    (router) => {
      router.put('/o/(*)/-/tags', (req, res, next) => {
        const key = req.params[0];
        mobjectsRepo
          .mobjectExists(key)
          .then(J.throwIfFalse(() => new NotFoundError('Not found')))
          .then(() => patchTagsBody()({ scope: '', value: req.body }))
          .then((tags) =>
            mobjectsRepo.setMobjectTags(key, tags).then(() => {
              res.json(tags);
            }),
          )
          .catch(next);
      });
    },
    (router) => {
      router.delete('/o/(*)/-/tags/:tag', (req, res, next) => {
        const key = req.params[0];
        const { tag } = req.params;
        mobjectsRepo
          .mobjectExists(key)
          .then(J.throwIfFalse(() => new NotFoundError('Not found')))
          .then(() =>
            mobjectsRepo.deleteMobjectTag(key, tag).then(() => {
              res.status(204);
              res.send();
            }),
          )
          .catch(next);
      });
    },
    (router) => {
      router.get('/o/(*)/-/attributes', (req, res, next) => {
        const key = req.params[0];
        mobjectsRepo
          .mobjectExists(key)
          .then(J.throwIfFalse(() => new NotFoundError('Not found')))
          .then(() =>
            mobjectsRepo.readAllMobjectAttributes(key).then((attributes) => {
              res.json(attributes);
            }),
          )
          .catch(next);
      });
    },
    (router) => {
      router.get('/o/(*)', (req, res, next) => {
        const key = req.params[0];
        mobjectsRepo
          .readMobject(key)
          .then((o) => {
            res.sendFile(path.join(config.basePath, o.path));
          })
          .catch(next);
      });
    },
    (router) => {
      router.put('/o/(*)', (req, res, next) => {
        const key = req.params[0];
        const basename = path.basename(key);
        const extension = path.extname(basename);
        const tmpFilename = path.join(config.tmpPath, `${crypto.randomBytes(16).toString('hex')}_${basename}`);
        fsPromises
          .mkdir(config.tmpPath, { recursive: true })
          .then(receiveFile(tmpFilename))
          .then(hashFile(tmpFilename))
          .then((hash) => mobjectsRepo.findOrCreateFile(hash))
          .then((file) => {
            const objectPath = path.join(config.basePath, objectPathFromHash(file.hash));
            const objectFilename = path.join(objectPath, `${file.hash}.${extension}`);
            fsPromises.exists(objectFilename).then((exists) => {
              if (!exists) {
                return fsPromises
                  .mkdir(objectPath, { recursive: true })
                  .then(() => fsPromises.rename(tmpFilename, objectFilename));
              }
            });
          })
          .then(() => mobjectsRepo.mobjectExists(key))
          .then((exists) => {
            if (exists) {
              mobjectsRepo.updateMobject(key, {}).then(() => {
                res.status(204);
                res.send();
              });
            } else {
              mobjectsRepo.createMobject(key, key).then(() => {
                res.status(201);
                res.send();
              });
            }
          })
          .catch(next);
      });
    },
    (router) => {
      router.delete('/o/(*)', (req, res, next) => {
        const key = req.params[0];
        mobjectsRepo
          .mobjectExists(key)
          .then(J.throwIfFalse(() => new NotFoundError('Not found')))
          .then(() => mobjectsRepo.deleteMobject(key).then(() => fsPromises.rm(path.join(config.basePath, key))))
          .then(() => {
            res.status(204);
            res.send();
          })
          .catch(next);
      });
    },
    (router) => {
      router.post('/o', (req, res, next) => {
        postBody()({ scope: '', value: req.body })
          .then(({ key, path }) => {
            mobjectsRepo.mobjectExists(key).then((exists) => {
              if (exists) {
                throw new ParameterError(`Mobject with key ${key} exists`);
              }
              mobjectsRepo.createMobject(key, path).then((mobject) => {
                res.json(mobject);
              });
            });
          })
          .catch(next);
      });
    },
  ]);
