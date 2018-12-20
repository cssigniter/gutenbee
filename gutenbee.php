<?php
/**
 * Plugin Name: GutenBee
 * Plugin URI: https://www.cssigniter.com/plugins/gutenbee/
 * Description: Premium Blocks for WordPress
 * Author: The CSSIgniter Team
 * Author URI: https://www.cssigniter.com
 * Version: 2.0.9
 * Text Domain: gutenbee
 * Domain Path: languages
 *
 * GutenBee is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * GutenBee is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with GutenBee. If not, see <http://www.gnu.org/licenses/>.
 *
 */

	if ( ! defined( 'GUTENBEE_PLUGIN_VERSION' ) ) {
		define( 'GUTENBEE_PLUGIN_VERSION', '2.0.9' );
	}

	if ( ! defined( 'GUTENBEE_PLUGIN_DIR' ) ) {
		define( 'GUTENBEE_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
	}

	if ( ! defined( 'GUTENBEE_PLUGIN_DIR_URL' ) ) {
		define( 'GUTENBEE_PLUGIN_DIR_URL', plugin_dir_url( __FILE__ ) );
	}

	add_action( 'init', 'gutenbee_init' );
	function gutenbee_init() {
		load_plugin_textdomain( 'gutenbee', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	}

	add_action( 'enqueue_block_editor_assets', 'gutenbee_enqueue_editor_assets' );

	function gutenbee_enqueue_editor_assets() {
		wp_enqueue_script( 'gutenbee', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.build.js', array(
			'wp-components',
			'wp-blocks',
			'wp-element',
			'wp-editor',
			'wp-data',
			'wp-date',
			'wp-i18n',
			'wp-compose',
			'wp-keycodes',
			'wp-html-entities',
		), GUTENBEE_PLUGIN_VERSION );

		$gutenbee_settings = get_option( 'gutenbee_settings' );
		$gutenbee_settings = gutenbee_validate_settings( $gutenbee_settings );
		wp_localize_script( 'gutenbee', '__GUTENBEE_SETTINGS__', $gutenbee_settings );

		wp_enqueue_style( 'gutenbee-editor', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.build.css', array(
			'wp-edit-blocks',
		), GUTENBEE_PLUGIN_VERSION );
	}

	add_action( 'wp_enqueue_scripts', 'gutenbee_enqueue_frontend_block_assets' );

	function gutenbee_enqueue_frontend_block_assets() {
		$gutenbee_settings = get_option( 'gutenbee_settings' );
		$gutenbee_settings = gutenbee_validate_settings( $gutenbee_settings );
		$maps_api_key      = $gutenbee_settings['google_maps_api_key'];

		wp_enqueue_style( 'gutenbee', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.scripts.css', array(), GUTENBEE_PLUGIN_VERSION );

		if ( $maps_api_key ) {
			wp_enqueue_script( 'gutenbee-google-maps', 'https://maps.googleapis.com/maps/api/js?key=' . $maps_api_key, array(), GUTENBEE_PLUGIN_VERSION, true );
		}

		wp_enqueue_script( 'gutenbee-scripts', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.scripts.js', array(
			'jquery',
		), GUTENBEE_PLUGIN_VERSION, true );
	}

	add_action( 'admin_enqueue_scripts', 'gutenbee_admin_styles' );

	function gutenbee_admin_styles() {
		wp_enqueue_style( 'gutenbee-admin-styles', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/assets/css/admin.css', array(), GUTENBEE_PLUGIN_VERSION );
	}

	// GutenBee's block category
	add_filter( 'block_categories', 'gutenbee_block_categories', 10, 2 );
	function gutenbee_block_categories( $categories, $post ) {
		return array_merge( $categories, array(
			array(
				'slug'  => 'gutenbee',
				'title' => __( 'GutenBee', 'gutenbee' ),
			),
		) );
	}

	/**
	 * Returns a list of settings names and their corresponding labels.
	 * Note that the list may not contain all blocks. E.g. google-maps
	 *
	 * @return array
	 */
	function gutenbee_get_setting_block_names() {
		// Setting keys here for each block MUST be the same slugs
		// used in the block's registration definition (check each block's
		// index.js file, after `gutenbee/XYZ`, XYZ is the block's key).
		return array(
			'accordion'         => __( 'Accordion Block', 'gutenbee' ),
			'countdown'         => __( 'Countdown Block', 'gutenbee' ),
			'countup'           => __( 'Countup Block', 'gutenbee' ),
			'divider'           => __( 'Divider Block', 'gutenbee' ),
			'icon'              => __( 'Icon Block', 'gutenbee' ),
			'iconbox'           => __( 'Icon Box Block', 'gutenbee' ),
			'imagebox'          => __( 'Image Box Block', 'gutenbee' ),
			'image-comparison'  => __( 'Image Comparison Block', 'gutenbee' ),
			'justified-gallery' => __( 'Justified Gallery Block', 'gutenbee' ),
			'progress-bar'      => __( 'Progress Bar Block', 'gutenbee' ),
			'slideshow'         => __( 'Slideshow Block', 'gutenbee' ),
			'tabs'              => __( 'Tabs Block', 'gutenbee' ),
		);
	}

	/**
	 * Makes sure there are no undefined indexes in the settings array.
	 * Use before using a setting value. Eleminates the need for isset() before using.
	 *
	 * @param $settings
	 *
	 * @return array
	 */
	function gutenbee_validate_settings( $settings ) {
		$defaults = array(
			'active_google-maps'  => 1,
			'google_maps_api_key' => '',
		);
		foreach ( gutenbee_get_setting_block_names() as $id => $name ) {
			$defaults[ 'active_' . $id ] = 1;
		}

		$settings = wp_parse_args( $settings, $defaults );

		return $settings;
	}

	// Settings Page
	require_once dirname( __FILE__ ) . '/inc/options.php';
