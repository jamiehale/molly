import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import mime from 'mime';
import { routes } from '../resource-helpers.js';
import * as V from '../validation.js';
import * as J from '../jlib.js';
import { NotFoundError } from '../error.js';

const patchTagsBody = () => V.isArray();

const postTagBody = V.object({ tag: V.required() });

const receiveFile = (req, tmpFilename) =>
  new Promise((resolve, reject) => {
    const output = fs.createWriteStream(tmpFilename);
    output.on('open', () => {
      req.pipe(output);
    });
    output.on('error', reject);
    output.on('close', resolve);
  });

const hashFile = (tmpFilename) =>
  new Promise((resolve) => {
    const hashStream = crypto.createHash('sha1');
    const inputStream = fs.createReadStream(tmpFilename);
    inputStream.pipe(hashStream);
    inputStream.on('end', () => resolve(hashStream.digest('hex')));
  });

const objectPathFromHash = (hash, depth = 3) =>
  hash
    .match(/.{1,2}/g)
    .slice(0, depth)
    .join('/');

const storeTempFile = (config, req) => {
  const tmpFilename = path.join(config.tmpPath, `${crypto.randomBytes(16).toString('hex')}_mobject`);
  return receiveFile(req, tmpFilename)
    .then(() => hashFile(tmpFilename))
    .then((hash) => ({ hash, tmpFilename }));
};

const storeOrDeleteFile = async (config, tmpFilename, hash) => {
  const objectPath = path.join(config.basePath, objectPathFromHash(hash));
  const objectFilename = path.join(objectPath, hash);
  if (!fs.existsSync(objectFilename)) {
    fs.mkdirSync(objectPath, { recursive: true });
    fs.renameSync(tmpFilename, objectFilename);
  } else {
    fs.rmSync(tmpFilename);
  }
};

const getMobject = (config, mobjectsRepo) => (req, res, next) => {
  const key = req.params[0];
  mobjectsRepo
    .readMobjectByKey(key)
    .then((mobject) => {
      res.sendFile(path.join(config.basePath, objectPathFromHash(mobject.fileHash), mobject.fileHash), {
        headers: { 'Content-Type': mobject.mimeType },
      });
    })
    .catch(next);
};

const mimeType = (contentType, extension) => (contentType ? contentType : mime.getType(extension));

const putMobject = (config, mobjectsRepo) => (req, res, next) => {
  const key = req.params[0];
  return storeTempFile(config, req)
    .then(({ hash, tmpFilename }) =>
      mobjectsRepo
        .findOrCreateMobject(key, mimeType(req.get('Content-Type'), path.extname(key)))
        .then((mobject) =>
          mobjectsRepo
            .findOrCreateFile(hash)
            .then((file) =>
              storeOrDeleteFile(config, tmpFilename, hash).then(() =>
                mobjectsRepo.updateOrCreateMobjectFile(mobject.id, file.hash),
              ),
            ),
        ),
    )
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch(next);
};

const deleteMobject = (mobjectsRepo) => (req, res, next) => {
  const key = req.params[0];
  mobjectsRepo
    .mobjectExistsByKey(key)
    .then(J.throwIfFalse(() => new NotFoundError('Not found')))
    .then(() => mobjectsRepo.deleteMobject(key))
    .then(() => {
      res.status(204);
      res.send();
    })
    .catch(next);
};

const getMobjects = (mobjectsRepo) => (req, res, next) => {
  mobjectsRepo
    .readAllMobjects()
    .then((mobjects) => {
      res.json(mobjects);
    })
    .catch(next);
};

const getMobjectDetails = (mobjectsRepo) => (req, res, next) => {
  mobjectsRepo
    .readMobjectDetails(req.params.id)
    .then((mobject) =>
      mobjectsRepo.readAllMobjectTags(req.params.id).then((tags) =>
        mobjectsRepo.readAllMobjectAttributes(req.params.id).then((attributes) => {
          res.json({ ...mobject, tags, attributes });
        }),
      ),
    )
    .catch(next);
};

const postMobjectTag = (mobjectsRepo) => (req, res, next) => {
  const key = req.params[0];
  mobjectsRepo
    .readMobjectByKey(key)
    .then((mobject) =>
      postTagBody({
        scope: '',
        value: req.body,
      }).then(({ tag }) =>
        mobjectsRepo.createMobjectTag(mobject.id, tag).then(() => {
          res.status(201);
          res.send();
        }),
      ),
    )
    .catch(next);
};

const getMobjectTags = (mobjectsRepo) => (req, res, next) => {
  const key = req.params[0];
  mobjectsRepo
    .readMobjectByKey(key)
    .then((mobject) =>
      mobjectsRepo.readAllMobjectTags(mobject.id).then((tags) => {
        res.json(tags);
      }),
    )
    .catch(next);
};

const putMobjectTags = (mobjectsRepo) => (req, res, next) => {
  const key = req.params[0];
  mobjectsRepo
    .readMobjectByKey(key)
    .then((mobject) =>
      patchTagsBody()({ scope: '', value: req.body }).then((tags) =>
        mobjectsRepo.setMobjectTags(mobject.id, tags).then(() => {
          res.json(tags);
        }),
      ),
    )
    .catch(next);
};

const deleteMobjectTag = (mobjectsRepo) => (req, res, next) => {
  const key = req.params[0];
  const { tag } = req.params;
  mobjectsRepo
    .readMobjectByKey(key)
    .then((mobject) =>
      mobjectsRepo.deleteMobjectTag(mobject.id, tag).then(() => {
        res.status(204);
        res.send();
      }),
    )
    .catch(next);
};

const getMobjectAttributes = (mobjectsRepo) => (req, res, next) => {
  const key = req.params[0];
  mobjectsRepo
    .readMobjectByKey(key)
    .then((mobject) =>
      mobjectsRepo.readAllMobjectAttributes(mobject.id).then((attributes) => {
        res.json(attributes);
      }),
    )
    .catch(next);
};

export const mobjectRoutes = (config, { mobjectsRepo }) =>
  routes([
    (router) => {
      router.get('/q', getMobjects(mobjectsRepo));
    },
    (router) => {
      router.get('/m/:id', getMobjectDetails(mobjectsRepo));
    },
    (router) => {
      router.post('/o/(*)/-/tags', postMobjectTag(mobjectsRepo));
    },
    (router) => {
      router.get('/o/(*)/-/tags', getMobjectTags(mobjectsRepo));
    },
    (router) => {
      router.put('/o/(*)/-/tags', putMobjectTags(mobjectsRepo));
    },
    (router) => {
      router.delete('/o/(*)/-/tags/:tag', deleteMobjectTag(mobjectsRepo));
    },
    (router) => {
      router.get('/o/(*)/-/attributes', getMobjectAttributes(mobjectsRepo));
    },
    (router) => {
      router.get('/o/(*)', getMobject(config, mobjectsRepo));
    },
    (router) => {
      router.put('/o/(*)', putMobject(config, mobjectsRepo));
    },
    (router) => {
      router.delete('/o/(*)', deleteMobject(mobjectsRepo));
    },
  ]);
