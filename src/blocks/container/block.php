<?php
	/**
	 * Container block
	 */

	function gutenbee_block_container_get_theme_support_defaults() {
		return array(
			'themeGrid' => false,
		);
	}

	/**
	 * Returns whether the active theme supports a specific feature.
	 *
	 * @param string $feature The feature name you wish to check support for. Pass an empty string to return an array of all features.
	 *
	 * @return mixed The support state for the passed feature. Array of all features if $feature is empty.
	 */
	function gutenbee_block_container_get_theme_support( $feature = '' ) {
		$support = get_theme_support( 'block/gutenbee/container' );
		if ( ! is_array( $support ) ) {
			return $support;
		}

		$support = $support[0];

		$support = wp_parse_args( $support, gutenbee_block_container_get_theme_support_defaults() );

		if ( empty( $feature ) ) {
			return $support;
		} elseif ( array_key_exists( $feature, $support ) ) {
			return $support[ $feature ];
		}

		return false;
	}

	add_action( 'init', 'gutenbee_block_container_init' );
	/**
	 * Initializes the CPT block.
	 */
	function gutenbee_block_container_init() {
		register_block_type( 'gutenbee/container', array(
			'attributes'      => array(
				'postType'        => array(
					'type'    => 'string',
					'default' => 'post',
				),
				'taxonomySlug'    => array(
					'type'    => 'string',
					'default' => '',
				),
				'termId'          => array(
					'type'    => 'string',
					'default' => '',
				),
				'authorId'        => array(
					'type'    => 'string',
					'default' => '',
				),
				'postsPerPage'    => array(
					'type'    => 'number',
					'default' => 3,
				),
				'pagination'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'offset'          => array(
					'type'    => 'number',
					'default' => 0,
				),
				'orderBy'         => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'order'           => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'excludedPostIds' => array(
					'type'    => 'array',
					'items'   => array(
						'type' => 'number',
					),
					'default' => array(),
				),
				'columns'         => array(
					'type'    => 'number',
					'default' => 3,
				),
				'gridEffect'      => array(
					'type'    => 'string',
					'default' => 'none',
				),
				'gridSpacing'     => array(
					'type'    => 'string',
					'default' => 'gutters',
				),
				'masonry'         => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'categoryFilters' => array(
					'type'    => 'boolean',
					'default' => false,
				),
			),
			'render_callback' => 'gutenbee_block_post_types_render_callback',
		) );
	}

