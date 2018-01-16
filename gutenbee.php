<?php
	/*
	 * Plugin Name: GutenBee
	 * Plugin URI: https://www.cssigniter.com/
	 * Description: Premium Blocks for WordPress
	 * Author: The CSSIgniter Team
	 * Author URI: https://www.cssigniter.com
	 * Version: 1.0.0
	 */

	add_action( 'enqueue_block_editor_assets', 'gutenbee_enqueue_editor_assets' );

	function gutenbee_enqueue_editor_assets() {
		wp_enqueue_script(
			'gutenbee',

			plugins_url( 'build/gutenbee.build.js', __FILE__ ),
			array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-utils', 'wp-i18n' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'build/gutenbee.build.js' )
		);

		wp_enqueue_style(
			'gutenbee-editor-css',
			plugins_url( 'build/gutenbee.editor.css', __FILE__ ),
			array( 'wp-edit-blocks' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'build/gutenbee.editor.css' )
		);
	}

	add_action( 'enqueue_block_assets', 'gutenbee_enqueue_block_assets' );

	function gutenbee_enqueue_block_assets() {
		wp_enqueue_style(
			'gutenbee-css',
			plugins_url( 'build/gutenbee.style.css', __FILE__ ),
			array( 'wp-blocks' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'build/gutenbee.style.css' )
		);
	}
