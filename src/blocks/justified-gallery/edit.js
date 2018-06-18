import { Component } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  ToggleControl,
  RangeControl,
  SelectControl,
  PanelBody,
} from 'wp.components';
import {
  InspectorControls,
} from 'wp.editor';
import startCase from 'lodash.startcase';

import Gallery from '../../components/gallery/Gallery';
import { LAST_ROW } from './constants';
import { capitalizeSentence } from '../../util/text';

class JustifiedGalleryEdit extends Component {
  static propTypes = {
    attributes: PropTypes.shape({
      rowHeight: PropTypes.number,
      margins: PropTypes.number,
      lastRow: PropTypes.oneOf(Object.values(LAST_ROW)),
      randomize: PropTypes.bool,
    }),
    isSelected: PropTypes.bool.isRequired,
    className: PropTypes.string,
    setAttributes: PropTypes.func.isRequired,
  };

  render() {
    const {
      attributes,
      isSelected,
      className,
      setAttributes,
    } = this.props;
    const {
      rowHeight,
      margins,
      lastRow,
      randomize,
    } = attributes;

    return (
      <Gallery
        className={className}
        attributes={attributes}
        isSelected={isSelected}
        setAttributes={setAttributes}
        label={__('Justified Gallery')}
      >
        {isSelected && (
          <InspectorControls>
            <PanelBody title={__('Gallery Settings')}>
              <RangeControl
                label={__('Row Height')}
                min={0}
                max={600}
                value={rowHeight}
                onChange={value => setAttributes({ rowHeight: value })}
                step={5}
              />

              <RangeControl
                label={__('Margins')}
                min={0}
                max={50}
                value={margins}
                onChange={value => setAttributes({ margins: value })}
                step={1}
              />

              <SelectControl
                label={__('Last Row')}
                value={lastRow}
                options={Object.keys(LAST_ROW).map(key => ({
                  value: LAST_ROW[key],
                  label: capitalizeSentence(startCase(key)),
                }))}
                onChange={value => setAttributes({ lastRow: value })}
              />

              <ToggleControl
                label={__('Randomize')}
                checked={randomize}
                onChange={value => setAttributes({ randomize: value })}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </Gallery>
    );
  }
}

export default JustifiedGalleryEdit;
