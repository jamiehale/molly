import PropTypes from 'prop-types';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';
import { Button } from '../../Button';
import { CustomToggle } from '../../CustomToggle';
import { useCollection } from '../../../hooks/collection';
import { EditCollection } from './EditCollection';
import { Collection } from './Collection';
import { Link } from '../../Router';

export const CollectionPage = ({ params }) => {
  const { collection, loadCollection } = useCollection(params.id);

  return (
    <Layout>
      <Link to="/collections">&lt;&lt;</Link>
      {collection && (
        <>
          <CustomToggle
            buttonText="Edit"
            renderOpen={(onClose) => (
              <div>
                <Typography>Editing</Typography>
                <EditCollection
                  collection={collection}
                  onUpdate={() => {
                    loadCollection().then(() => {
                      onClose();
                    });
                  }}
                  onCancel={onClose}
                />
              </div>
            )}
            renderClosed={(onOpen) => (
              <div>
                <Collection collection={collection} />
                <Button type="button" onClick={onOpen}>
                  Edit
                </Button>
              </div>
            )}
          />
        </>
      )}
    </Layout>
  );
};

CollectionPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
