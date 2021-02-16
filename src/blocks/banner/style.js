import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const BannerStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    bannerHeight,
    blockPadding,
    blockMargin,
    verticalContentAlignment,
    horizontalContentAlignment,
    backgroundImage,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={bannerHeight}
        rule=".wp-block-gutenbee-banner.[root] { height: %s; }"
        unit="px"
        edgeCase={{
          edge: -1,
          value: '100vh',
        }}
      />
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-banner.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-banner.[root] > .wp-block-gutenbee-banner-inner { padding: %s; }"
        unit="px"
      />
      <Rule
        value={verticalContentAlignment}
        rule=".wp-block-gutenbee-banner.[root] { align-items: %s; }"
      />
      <Rule
        value={horizontalContentAlignment}
        rule=".wp-block-gutenbee-banner.[root] { justify-content: %s; }"
      />
      <Rule
        value={backgroundImage}
        rule=".wp-block-gutenbee-banner.[root] > .wp-block-gutenbee-banner-background { %s }"
      />
      {children}
    </StyleSheet>
  );
};

BannerStyle.propTypes = propTypes;

export default BannerStyle;
