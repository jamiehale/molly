import * as J from '../../jlib.js';

const fromMobject = J.transform({
  id: J.prop('id'),
  key: J.prop('key'),
});

const toMobject = J.transform({
  id: J.prop('id'),
  key: J.prop('key'),
  createdAt: J.prop('created_at'),
  updatedAt: J.prop('updated_at'),
});

const createMobject = J.curry((mobjectStore, mobjectFileStore, key, hash) =>
  mobjectStore
    .create(fromMobject({ key }))
    .then((mobject) => mobjectFileStore.create({ mobject_id: mobject.id, hash }).then(toMobject)),
);

const readMobject = J.curry((mobjectStore, id) => mobjectStore.readSingle({ id }).then(toMobject));

const readMobjectByKey = J.curry((mobjectStore, key) => mobjectStore.readSingle({ key }).then(toMobject));

const mobjectExistsByKey = J.curry((mobjectStore, key) => mobjectStore.exists({ key }));

const updateMobjectByKey = J.curry((mobjectStore, key, fields = {}) =>
  mobjectStore.updateSingle({ key }, fields).then(toMobject),
);

const deleteMobject = J.curry((mobjectStore, id) => mobjectStore.deleteSingle({ id }));

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

const fromTag = J.transform({
  mobject_id: J.prop('mobjectId'),
  tag: J.prop('tag'),
  createdAt: J.prop('created_at'),
  updatedAt: J.prop('updated_at'),
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

export const createMobjectsRepo = ({ mobjectsStore, filesStore, mobjectFileStore, tagsStore, attributesStore }) => ({
  createMobject: createMobject(mobjectsStore, mobjectFileStore),
  readMobject: readMobject(mobjectsStore),
  readMobjectByKey: readMobjectByKey(mobjectsStore),
  mobjectExistsByKey: mobjectExistsByKey(mobjectsStore),
  updateMobjectByKey: updateMobjectByKey(mobjectsStore),
  deleteMobject: deleteMobject(mobjectsStore),

  readFile: readFile(filesStore),
  findOrCreateFile: findOrCreateFile(filesStore),

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
