import * as J from '../../jlib.js';

const fromMobject = J.transform({
  id: J.prop('id'),
  path: J.prop('path'),
});

const toMobject = J.transform({
  id: J.prop('id'),
  key: J.prop('key'),
  createdAt: J.prop('created_at'),
  updatedAt: J.prop('updated_at'),
});

const createMobject = J.curry((mobjectStore, id, path) =>
  mobjectStore.create(fromMobject({ id, path })).then(toMobject),
);

const readMobject = J.curry((mobjectStore, id) => mobjectStore.readSingle({ id }).then(toMobject));

const mobjectExists = J.curry((mobjectStore, id) => mobjectStore.exists({ id }));

const updateMobject = J.curry((mobjectStore, id, fields) => mobjectStore.updateSingle({ id }, fields).then(toMobject));

const deleteMobject = J.curry((mobjectStore, id) => mobjectStore.deleteSingle({ id }));

const toFile = J.transform({
  hash: J.prop('hash'),
  createdAt: J.prop('created_at'),
  updatedAt: J.prop('updated_at'),
});

const findOrCreateFile = J.curry((filesStore, hash) =>
  filesStore.fileExists(hash).then((exists) => {
    if (exists) {
      return filesStore.readSingle(hash).then(toFile);
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

export const createMobjectsRepo = ({ mobjectsStore, filesStore, tagsStore, attributesStore }) => ({
  createMobject: createMobject(mobjectsStore),
  readMobject: readMobject(mobjectsStore),
  mobjectExists: mobjectExists(mobjectsStore),
  updateMobject: updateMobject(mobjectsStore),
  deleteMobject: deleteMobject(mobjectsStore),
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
