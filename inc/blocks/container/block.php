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
