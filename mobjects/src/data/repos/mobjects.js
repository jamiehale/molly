import * as J from '../../jlib.js';

const fromMobject = J.transform({
  id: J.prop('id'),
  key: J.prop('key'),
});

const toMobject = J.transform({
  id: J.prop('id'),
  key: J.prop('key'),
  mimeType: J.prop('mimetype'),
  createdAt: J.prop('created_at'),
  updatedAt: J.prop('updated_at'),
});

const toMobjectDetails = J.transform({
  id: J.prop('id'),
  key: J.prop('key'),
  mimeType: J.prop('mimetype'),
  createdAt: J.prop('created_at'),
  updatedAt: J.prop('updated_at'),
  fileHash: J.prop('file_hash'),
  fileCreatedAt: J.prop('file_created_at'),
  fileUpdatedAt: J.prop('file_updated_at'),
});

const createMobject = J.curry((mobjectStore, mobjectFileStore, key, hash) =>
  mobjectStore
    .create(fromMobject({ key }))
    .then((mobject) => mobjectFileStore.create({ mobject_id: mobject.id, hash }).then(toMobject)),
);

const readAllMobjects = (mobjectDetailsStore) => () => mobjectDetailsStore.readAll({}).then(J.map(toMobjectDetails));

const readMobject = J.curry((mobjectStore, id) => mobjectStore.readSingle({ id }).then(toMobject));

const readMobjectDetails = J.curry((mobjectDetailsStore, id) =>
  mobjectDetailsStore.readSingle({ id }).then(toMobjectDetails),
);

const readMobjectByKey = J.curry((mobjectDetailsStore, key) =>
  mobjectDetailsStore.readSingle({ key }).then(toMobjectDetails),
);

const findOrCreateMobject = J.curry((mobjectStore, key, mimeType) =>
  mobjectStore.exists({ key }).then((exists) => {
    if (exists) {
      return mobjectStore
        .updateSingle({ key }, { mime_type: mimeType })
        .then(() => mobjectStore.readSingle({ key }).then(toMobject));
    }
    return mobjectStore.create({ key, mimetype: mimeType }).then(toMobject);
  }),
);

const mobjectExistsByKey = J.curry((mobjectStore, key) => mobjectStore.exists({ key }));

const updateMobjectByKey = J.curry((mobjectStore, key, fields = {}) =>
  mobjectStore.updateSingle({ key }, fields).then(toMobject),
);

const deleteMobject = J.curry((mobjectStore, key) => mobjectStore.deleteSingle({ key }));

const toFile = J.transform({
  hash: J.prop('hash'),
  createdAt: J.prop('created_at'),
  updatedAt: J.prop('updated_at'),
});

const readFile = J.curry((filesStore, id) => filesStore.readSingle({ mobject_id: id }).then(toFile));

const findOrCreateFile = J.curry((filesStore, hash) =>
  filesStore.exists({ hash }).then((exists) => {
    if (exists) {
      return filesStore.readSingle({ hash }).then(toFile);
    }
    return filesStore.create({ hash }).then(toFile);
  }),
);

const updateOrCreateMobjectFile = J.curry((knexStore, mobjectFileStore, mobjectId, hash) =>
  mobjectFileStore.exists({ mobject_id: mobjectId, file_hash: hash, replaced_at: null }).then((exists) => {
    if (!exists) {
      return knexStore('mobject_files')
        .where({ mobject_id: mobjectId })
        .whereNot({ file_hash: hash })
        .whereNull('replaced_at')
        .update({
          replaced_at: knexStore.fn.now(),
        })
        .then(() => mobjectFileStore.create({ mobject_id: mobjectId, file_hash: hash }));
    }
  }),
);

const fromTag = J.transform({
  mobject_id: J.prop('mobjectId'),
  tag: J.prop('tag'),
});

const createMobjectTag = J.curry((tagsStore, mobjectId, tag) => tagsStore.create(fromTag({ mobjectId, tag })));

const readAllMobjectTags = J.curry((tagsStore, mobjectId) =>
  tagsStore.readAll({ mobject_id: mobjectId }).then(J.map(J.prop('tag'))),
);

const deleteMobjectTag = J.curry((tagsStore, mobjectId, tag) => tagsStore.deleteSingle({ mobject_id: mobjectId, tag }));

const toAttribute = J.transform({
  name: J.prop('attribute_name'),
  value: J.prop('attribute_value'),
  createdAt: J.prop('created_at'),
  updatedAt: J.prop('updated_at'),
});

const readAllMobjectAttributes = J.curry((attributesStore, mobjectId) =>
  attributesStore.readAll({ mobject_id: mobjectId }).then(J.map(toAttribute)),
);

export const createMobjectsRepo = ({
  knexStore,
  mobjectsStore,
  filesStore,
  mobjectDetailsStore,
  mobjectFilesStore,
  tagsStore,
  attributesStore,
}) => ({
  createMobject: createMobject(mobjectsStore, mobjectFilesStore),
  readAllMobjects: readAllMobjects(mobjectDetailsStore),
  readMobject: readMobject(mobjectsStore),
  readMobjectByKey: readMobjectByKey(mobjectDetailsStore),
  readMobjectDetails: readMobjectDetails(mobjectDetailsStore),
  findOrCreateMobject: findOrCreateMobject(mobjectsStore),
  mobjectExistsByKey: mobjectExistsByKey(mobjectsStore),
  updateMobjectByKey: updateMobjectByKey(mobjectsStore),
  deleteMobject: deleteMobject(mobjectsStore),

  readFile: readFile(filesStore),
  findOrCreateFile: findOrCreateFile(filesStore),

  updateOrCreateMobjectFile: updateOrCreateMobjectFile(knexStore, mobjectFilesStore),

  createMobjectTag: createMobjectTag(tagsStore),
  readAllMobjectTags: readAllMobjectTags(tagsStore),
  deleteMobjectTag: deleteMobjectTag(tagsStore),
  readAllMobjectAttributes: readAllMobjectAttributes(attributesStore),
  // readAllLocations: readAllResources(
  //   locationsStore,
  //   J.compose(J.filterEmptyProps, fromModel),
  //   toModel,
  // ),
  // updateLocation: updateResource(locationsStore, fromModel, toModel),
  // updateAllLocations: updateAllResources(locationsStore, fromModel, toModel),
  // del: del(db, table),
});
