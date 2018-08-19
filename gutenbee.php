<?php
/*
 * Plugin Name: GutenBee
 * Description: Premium Blocks for WordPress
 * Author: The CSSIgniter Team
 * Author URI: https://www.cssigniter.com/
 * Version: 2.0.0
 */

if ( ! defined( 'GUTENBEE_PLUGIN_VERSION' ) ) {
	define( 'GUTENBEE_PLUGIN_VERSION', '1.0.0' );
}

if ( ! defined( 'GUTENBEE_PLUGIN_DIR' ) ) {
	define( 'GUTENBEE_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'GUTENBEE_PLUGIN_DIR_URL' ) ) {
	define( 'GUTENBEE_PLUGIN_DIR_URL', plugin_dir_url( __FILE__ ) );
}

add_action( 'enqueue_block_editor_assets', 'gutenbee_enqueue_editor_assets' );

function gutenbee_enqueue_editor_assets() {
	wp_enqueue_script( 'gutenbee', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.build.js', array(
		'wp-components',
		'wp-blocks',
		'wp-element',
		'wp-data',
		'wp-date',
		'wp-i18n',
		'wp-compose',
		'wp-keycodes',
		'wp-html-entities',
	), GUTENBEE_PLUGIN_VERSION );

	// TODO: Remove this once we find a way to get options from within Gutenberg
	$maps_api_key = get_option('google_maps_api_key');
	if ($maps_api_key) {
		wp_localize_script( 'gutenbee', 'mapsApiKey', $maps_api_key );
	}

	wp_enqueue_style( 'gutenbee-editor', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.build.css', array(
		'wp-edit-blocks',
	), GUTENBEE_PLUGIN_VERSION );
}

add_action( 'wp_enqueue_scripts', 'gutenbee_enqueue_frontend_block_assets' );

function gutenbee_enqueue_frontend_block_assets() {
	// TODO sanitize?
	$maps_api_key = get_option('google_maps_api_key');

	wp_enqueue_style( 'gutenbee', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.scripts.css', array(), GUTENBEE_PLUGIN_VERSION );

	if ($maps_api_key) {
		wp_enqueue_script( 'gutenbee-google-maps', 'https://maps.googleapis.com/maps/api/js?key=' . $maps_api_key );
	}

	wp_enqueue_script( 'gutenbee-scripts', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.scripts.js', array(
		'jquery',
	), GUTENBEE_PLUGIN_VERSION );
}

// Dynamic block partials
// require_once dirname( __FILE__ ) . '/src/blocks/index.php';

// GutenBee's block category
add_filter( 'block_categories', function( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'gutenbee',
				'title' => __( 'GutenBee', 'gutenbee' ),
			),
		)
	);
}, 10, 2 );

// Settings Page
require_once dirname( __FILE__ ) . '/options.php';
