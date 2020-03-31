import { __ } from 'wp.i18n';

import {
  OneColumn,
  ThreeColumnsEqual,
  ThreeColumnsWideCenter,
  TwoColumnsEqual,
  TwoColumnsOneThirdTwoThirds,
  TwoColumnsTwoThirdsOneThird,
} from './template-icons';

const variations = [
  {
    name: 'one-column',
    title: __('100'),
    description: __('One column'),
    icon: <OneColumn />,
    template: [
      [
        'gutenbee/column',
        { width: { desktop: 100, tablet: 100, mobile: 100 } },
      ],
    ],
    innerBlocks: [
      [
        'gutenbee/column',
        { width: { desktop: 100, tablet: 100, mobile: 100 } },
      ],
    ],
    isDefault: true,
    scope: ['block'],
  },
  {
    name: 'two-columns-half',
    title: __('50 / 50'),
    description: __('Two columns; equal split'),
    icon: <TwoColumnsEqual />,
    template: [
      ['gutenbee/column', { width: { desktop: 50, tablet: 100, mobile: 100 } }],
      ['gutenbee/column', { width: { desktop: 50, tablet: 100, mobile: 100 } }],
    ],
    innerBlocks: [
      ['gutenbee/column', { width: { desktop: 50, tablet: 100, mobile: 100 } }],
      ['gutenbee/column', { width: { desktop: 50, tablet: 100, mobile: 100 } }],
    ],
    scope: ['block'],
  },
  {
    name: 'two-columns-one-third-two-thirds',
    title: __('33 / 66'),
    description: __('Two columns; one-third, two-thirds split'),
    icon: <TwoColumnsOneThirdTwoThirds />,
    template: [
      [
        'gutenbee/column',
        { width: { desktop: 33.33, tablet: 100, mobile: 100 } },
      ],
      [
        'gutenbee/column',
        { width: { desktop: 66.66, tablet: 100, mobile: 100 } },
      ],
    ],
    innerBlocks: [
      [
        'gutenbee/column',
        { width: { desktop: 33.33, tablet: 100, mobile: 100 } },
      ],
      [
        'gutenbee/column',
        { width: { desktop: 66.66, tablet: 100, mobile: 100 } },
      ],
    ],
    scope: ['block'],
  },
  {
    name: 'two-columns-two-thirds-one-third',
    title: __('66 / 33'),
    description: __('Two columns; two-thirds, one-third split'),
    icon: <TwoColumnsTwoThirdsOneThird />,
    template: [
      [
        'gutenbee/column',
        { width: { desktop: 66.66, tablet: 100, mobile: 100 } },
      ],
      [
        'gutenbee/column',
        { width: { desktop: 33.33, tablet: 100, mobile: 100 } },
      ],
    ],
    innerBlocks: [
      [
        'gutenbee/column',
        { width: { desktop: 66.66, tablet: 100, mobile: 100 } },
      ],
      [
        'gutenbee/column',
        { width: { desktop: 33.33, tablet: 100, mobile: 100 } },
      ],
    ],
    scope: ['block'],
  },
  {
    name: 'three-columns-equal',
    title: __('33 / 33 / 33'),
    description: __('Three columns; equal split'),
    icon: <ThreeColumnsEqual />,
    template: [['gutenbee/column'], ['gutenbee/column'], ['gutenbee/column']],
    innerBlocks: [
      ['gutenbee/column'],
      ['gutenbee/column'],
      ['gutenbee/column'],
    ],
    scope: ['block'],
  },
  {
    name: 'three-columuns-wide-center',
    title: __('25 / 50 / 25'),
    description: __('Three columns; wide center column'),
    icon: <ThreeColumnsWideCenter />,
    template: [
      ['gutenbee/column', { width: { desktop: 25, tablet: 100, mobile: 100 } }],
      ['gutenbee/column', { width: { desktop: 50, tablet: 100, mobile: 100 } }],
      ['gutenbee/column', { width: { desktop: 25, tablet: 100, mobile: 100 } }],
    ],
    innerBlocks: [
      ['gutenbee/column', { width: { desktop: 25, tablet: 100, mobile: 100 } }],
      ['gutenbee/column', { width: { desktop: 50, tablet: 100, mobile: 100 } }],
      ['gutenbee/column', { width: { desktop: 25, tablet: 100, mobile: 100 } }],
    ],
    scope: ['block'],
  },
];

export default variations;
