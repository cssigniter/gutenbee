import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { RangeControl, SelectControl, CheckboxControl } from 'wp.components';
import { __ } from 'wp.i18n';
import classNames from 'classnames';

import { capitalizeSentence } from '../../../util/text';

const propTypes = {
  className: PropTypes.string,
  attributes: PropTypes.shape({
    type: PropTypes.string,
    duration: PropTypes.number,
    delay: PropTypes.number,
    easing: PropTypes.string,
  }).isRequired,
  setAttributes: PropTypes.func.isRequired,
};

const ANIMATION_TYPE = {
  FADE: 'fade',
  SLIDE_UP: 'slide-up',
  SLIDE_DOWN: 'slide-down',
  SLIDE_LEFT: 'slide-left',
  SLIDE_RIGHT: 'slide-right',
  ZOOM_IN: 'zoom-in',
  ZOOM_OUT: 'zoom-out',
  FLIP_UP: 'flip-up',
  FLIP_DOWN: 'flip-down',
  FLIP_LEFT: 'flip-left',
  FLIP_RIGHT: 'flip-right',
};

const easings = [
  'linear',

  'ease-in',
  'ease-out',

  'ease-in-sine',
  'ease-out-sine',
  'ease-in-out-sine',

  'ease-in-quad',
  'ease-out-quad',
  'ease-in-out-quad',

  'ease-in-cubic',
  'ease-out-cubic',
  'ease-in-out-cubic',

  'ease-in-quart',
  'ease-out-quart',
  'ease-in-out-quart',

  'ease-in-quint',
  'ease-out-quint',
  'ease-in-out-quint',

  'ease-in-expo',
  'ease-out-expo',
  'ease-in-out-expo',

  'ease-in-circ',
  'ease-out-circ',
  'ease-in-out-circ',

  'ease-in-back',
  'ease-out-back',
  'ease-in-out-back',
];

const AnimationControls = ({ className, attributes, setAttributes }) => {
  const { type, duration, delay, easing, repeat, desktopOnly } =
    attributes ?? {};

  return (
    <div className={classNames('gutenbee-animation-controls', className)}>
      <SelectControl
        label={__('Animation type')}
        value={type}
        onChange={value => {
          setAttributes({
            animation: {
              ...attributes,
              type: value,
            },
          });
        }}
        options={[
          {
            value: '',
            label: __('None'),
          },
          ...Object.values(ANIMATION_TYPE).map(value => ({
            value,
            label: capitalizeSentence(value.split('-').join(' ')),
          })),
        ]}
      />

      {!!type && (
        <Fragment>
          <RangeControl
            label={__('Duration (seconds)')}
            value={duration}
            initialPosition={0.7}
            onChange={value => {
              setAttributes({
                animation: {
                  ...attributes,
                  duration: value,
                },
              });
            }}
            step={0.1}
            min={0.2}
            max={2}
          />

          <RangeControl
            label={__('Delay (seconds)')}
            value={delay}
            initialPosition={0}
            onChange={value => {
              setAttributes({
                animation: {
                  ...attributes,
                  delay: value,
                },
              });
            }}
            step={0.1}
            min={0}
            max={1}
          />

          <SelectControl
            label={__('Easing')}
            value={easing}
            onChange={value => {
              setAttributes({
                animation: {
                  ...attributes,
                  easing: value,
                },
              });
            }}
            options={[
              {
                value: '',
                label: __('Default (Ease In Out)'),
              },
              ...easings.map(value => ({
                value,
                label: capitalizeSentence(value.split('-').join(' ')),
              })),
            ]}
          />

          <CheckboxControl
            label={__('Repeat animation')}
            value="on"
            checked={repeat}
            help={__(
              'Repeat the animation for this block every time it enters the viewport.',
            )}
            onChange={value => {
              setAttributes({
                animation: {
                  ...attributes,
                  repeat: value,
                },
              });
            }}
          />

          <CheckboxControl
            label={__('Desktop only')}
            value="on"
            checked={desktopOnly}
            help={__(
              'Disable on mobile, show this animation on largers viewports only.',
            )}
            onChange={value => {
              setAttributes({
                animation: {
                  ...attributes,
                  desktopOnly: value,
                },
              });
            }}
          />
        </Fragment>
      )}
    </div>
  );
};

AnimationControls.propTypes = propTypes;

export default AnimationControls;
