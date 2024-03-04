import PropTypes from 'prop-types';
import { Layout } from '../../Layout';
import { FlexColumn } from '../../FlexColumn';
import { Mobject } from './Mobject';
import { NewTag } from './NewTag';
import { useMobject } from '../../../hooks/mobject';
import { NewAttribute } from './NewAttribute';

export const MobjectPage = ({ params }) => {
  const { mobject, reloadMobject } = useMobject(params.id);

  return (
    <Layout>
      {mobject && (
        <>
          <FlexColumn>
            <Mobject
              mobject={mobject}
              onTagDeleted={() => {
                reloadMobject();
              }}
            />
          </FlexColumn>
          <NewTag
            keyValue={mobject.key}
            onNew={() => {
              reloadMobject();
            }}
            onCancel={() => undefined}
          />
          <NewAttribute
            keyValue={mobject.key}
            onNew={() => {
              reloadMobject();
            }}
          />
        </>
      )}
    </Layout>
  );
};

MobjectPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
