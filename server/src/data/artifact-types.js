const artifactTypeFromRecord = (record) => ({
  id: record.id,
  title: record.title,
});

const artifactTypesFromRecords = (records) =>
  records.map(artifactTypeFromRecord);

export const readAllArtifactTypes = (db) =>
  db('artifact_types').select('*').then(artifactTypesFromRecords);
