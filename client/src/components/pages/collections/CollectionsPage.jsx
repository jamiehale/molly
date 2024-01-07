import { useCollections } from '../../../hooks/collections';
import { NewCollection } from './NewCollection';
import { Collections } from './Collections';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';
import { ButtonToggle } from '../../ButtonToggle';

export const CollectionsPage = () => {
  const { collections, loadCollections } = useCollections();

  return (
    <Layout>
      <Typography as="title">Collections</Typography>
      <Collections collections={collections} />
      <ButtonToggle
        buttonText="Add Collection"
        renderOpen={(onClose) => (
          <NewCollection
            onNew={() => {
              loadCollections().then(() => {
                onClose();
              });
            }}
            onCancel={onClose}
          />
        )}
      />
    </Layout>
  );
};
