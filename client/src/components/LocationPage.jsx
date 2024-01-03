import PropTypes from 'prop-types';
import { Typography } from './Typography';
import { Layout } from './Layout';
import { Button } from './Button';
import { CustomToggle } from './CustomToggle';
import { useEffect } from 'react';
import { useLocation } from '../hooks/location';
import { EditLocation } from './EditLocation';

export const LocationPage = ({ params }) => {
  const { location, reload: reloadLocation } = useLocation(params.id);

  useEffect(reloadLocation, [reloadLocation]);

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
                  onUpdateLocation={() => {
                    reloadLocation();
                    onClose();
                  }}
                />
                <Button type="button" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            )}
            renderClosed={(onOpen) => (
              <div>
                <Typography as="title">Location: {location.value}</Typography>
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
