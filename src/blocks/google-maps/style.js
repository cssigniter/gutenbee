import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const GoogleMapsStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, height } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-google-maps.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-google-maps.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={height}
        rule=".wp-block-gutenbee-google-maps.[root] { height: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

GoogleMapsStyle.propTypes = propTypes;

export default GoogleMapsStyle;
