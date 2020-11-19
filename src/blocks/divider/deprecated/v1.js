import {
  getDefaultBackgroundImageValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';

const BORDER_STYLES = {
  SOLID: 'solid',
  DOTTED: 'dotted',
  DASHED: 'dashed',
  DOUBLE: 'double',
};

const Divider = ({ className, height, style, weight, width, align, color }) => (
  <div
    key="divider"
    className={`${className} align-${align}`}
    style={{
      height,
    }}
  >
    <div
      className={`${className}-inner`}
      style={{
        borderTopStyle: style,
        borderTopWidth: weight,
        borderTopColor: color,
        width: `${width}%`,
      }}
    />
  </div>
);

const v1 = {
  attributes: {
    style: {
      type: 'string',
      default: BORDER_STYLES.SOLID,
    },
    weight: {
      type: 'number',
      default: 1,
    },
    width: {
      type: 'number',
      default: 100,
    },
    height: {
      type: 'number',
      default: 10,
    },
    align: {
      type: 'string',
      default: 'center',
    },
    color: {
      type: 'string',
      default: '#000000',
    },
  },
  migrate(attributes) {
    return {
      ...attributes,
      uniqueId: undefined,
      backgroundColor: undefined,
      backgroundImage: getDefaultBackgroundImageValue(),
      blockMargin: getDefaultSpacingValue(),
      blockPadding: getDefaultSpacingValue(),
    };
  },
  save({ className, attributes }) {
    return <Divider className={className} {...attributes} />;
  },
};

export default v1;
