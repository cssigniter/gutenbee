import { __ } from 'wp.i18n';

export const buttonSizeTemplates = [
  {
    name: __('Large', 'gutenbee'),
    attributes: {
      fontSize: {
        desktop: 16,
        tablet: '',
        mobile: '',
      },
      blockPadding: {
        desktop: {
          top: 16,
          right: 32,
          bottom: 16,
          left: 32,
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
    },
  },
  {
    name: __('Medium', 'gutenbee'),
    attributes: {
      fontSize: {
        desktop: 15,
        tablet: '',
        mobile: '',
      },
      blockPadding: {
        desktop: {
          top: 14,
          right: 28,
          bottom: 14,
          left: 28,
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
    },
  },
  {
    name: __('Small', 'gutenbee'),
    attributes: {
      fontSize: {
        desktop: 14,
        tablet: '',
        mobile: '',
      },
      blockPadding: {
        desktop: {
          top: 8,
          right: 18,
          bottom: 8,
          left: 18,
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
    },
  },
  {
    name: __('Extra Small', 'gutenbee'),
    attributes: {
      fontSize: {
        desktop: 12,
        tablet: '',
        mobile: '',
      },
      blockPadding: {
        desktop: {
          top: 6,
          right: 14,
          bottom: 6,
          left: 14,
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
    },
  },
];

export const buttonStyleTemplates = [
  {
    name: __('Normal', 'gutenbee'),
    attributes: {
      borderStyle: 'none',
      backgroundColor: '#000000',
      textColor: '#FFFFFF',
    },
  },
  {
    name: __('Outline', 'gutenbee'),
    attributes: {
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#000000',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      textColor: '#000000',
    },
  },
];
