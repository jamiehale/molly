import { Typography } from './Typography';
import { Layout } from './Layout';
import { ButtonToggle } from './ButtonToggle';
import { useLocations } from '../hooks/locations';
import { Locations } from './Locations';
import { NewLocation } from './NewLocation';

export const LocationsPage = () => {
  const { locations, reloadLocations } = useLocations();

  return (
    <Layout>
      <Typography as="title">Locations</Typography>
      <Locations locations={locations} />
      <ButtonToggle
        buttonText="Add Location"
        renderOpen={(onClose) => (
          <NewLocation
            onNewLocation={() => {
              reloadLocations();
              onClose();
            }}
          />
        )}
      />
    </Layout>
  );
};
