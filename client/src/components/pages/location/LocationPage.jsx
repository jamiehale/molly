import PropTypes from 'prop-types';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';
import { Button } from '../../Button';
import { CustomToggle } from '../../CustomToggle';
import { useLocation } from '../../../hooks/location';
import { EditLocation } from './EditLocation';
import { Location } from './Location';

export const LocationPage = ({ params }) => {
  const { location, loadLocation } = useLocation(params.id);

  return (
    <Layout>
      {location && (
        <>
          <CustomToggle
            buttonText="Edit"
            renderOpen={(onClose) => (
              <div>
                <Typography>Editing</Typography>
                <EditLocation
                  location={location}
                  onUpdate={() => {
                    loadLocation().then(() => {
                      onClose();
                    });
                  }}
                  onCancel={onClose}
                />
              </div>
            )}
            renderClosed={(onOpen) => (
              <div>
                <Location location={location} />
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

LocationPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
