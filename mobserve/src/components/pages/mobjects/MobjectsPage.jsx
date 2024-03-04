import { useMobjects } from '../../../hooks/mobjects';
import { Mobjects } from './Mobjects';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';

export const MobjectsPage = () => {
  const { mobjects } = useMobjects();

  return (
    <Layout>
      <Typography as="title">Mobjects</Typography>
      <Mobjects mobjects={mobjects} />
    </Layout>
  );
};
