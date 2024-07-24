<?php
/**
 * Plugin Name: GutenBee
 * Plugin URI: https://www.cssigniter.com/plugins/gutenbee/
 * Description: Premium Blocks for WordPress
 * Author: The CSSIgniter Team
 * Author URI: https://www.cssigniter.com
 * Version: 2.18.0
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
	define( 'GUTENBEE_PLUGIN_VERSION', '2.18.0' );
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

add_action( 'enqueue_block_assets', 'gutenbee_enqueue_editor_assets' );
function gutenbee_enqueue_editor_assets() {
	if ( ! is_admin() ) {
		return;
	}

	wp_enqueue_script( 'gutenbee', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.build.js', array(
		'wp-components',
		'wp-blocks',
		'wp-element',
		'wp-block-editor',
		'wp-data',
		'wp-date',
		'wp-i18n',
		'wp-compose',
		'wp-keycodes',
		'wp-html-entities',
		'wp-server-side-render',
		'lodash',
		'react',
		'react-dom',
		'jquery',
	), GUTENBEE_PLUGIN_VERSION, true );

	wp_localize_script( 'gutenbee', '__GUTENBEE_SETTINGS__', array_merge( gutenbee_get_settings(), array(
		'plugin' => array(
			'settings' => array(
				'active_animation-controls' => gutenbee_get_settings()['active_animation-controls'],
			),
		),
		'blocks' => array(
			'post_types' => array(
				'excluded_post_types' => apply_filters( 'gutenbee_block_post_types_excluded_post_types', array(
					'attachment',
					'wp_block',
					'elementor_library',
					'wp_template',
					'maxslider_slider',
					'ignition-gsection',
					'nav_menu_item',
					'wp_template_part',
					'wp_navigation',
				) ),
			),
		),
	) ) );

	wp_enqueue_style( 'gutenbee-editor', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.build.css', array(
		'wp-edit-blocks',
	), GUTENBEE_PLUGIN_VERSION );
}

add_action( 'wp_enqueue_scripts', 'gutenbee_enqueue_frontend_block_assets' );
function gutenbee_enqueue_frontend_block_assets() {
	$gutenbee_settings = gutenbee_get_settings();
	$maps_api_key      = $gutenbee_settings['google_maps_api_key'];

	$enqueue_css      = false;
	$enqueue_js       = false;
	$enqueue_maps_api = false;

	foreach ( gutenbee_get_blocks_info() as $block_name => $block_info ) {
		if ( has_block( $block_name ) || gutenbee_has_block_in_reusable( $block_name ) ) {
			if ( ! $enqueue_css && $block_info['enqueue_css'] ) {
				$enqueue_css = true;
			}
			if ( ! $enqueue_js && $block_info['enqueue_js'] ) {
				$enqueue_js = true;
			}
			if ( 'gutenbee/google-maps' === $block_name ) {
				$enqueue_maps_api = true;
			}
		}
	}

	if ( $maps_api_key && apply_filters( 'gutenbee_enqueue_google_maps_api', $enqueue_maps_api ) ) {
		wp_enqueue_script( 'gutenbee-google-maps', 'https://maps.googleapis.com/maps/api/js?key=' . $maps_api_key, array(), GUTENBEE_PLUGIN_VERSION, true );
	}

	if ( apply_filters( 'gutenbee_enqueue_frontend_styles', $enqueue_css ) ) {
		wp_enqueue_style( 'gutenbee', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.scripts.css', array(), GUTENBEE_PLUGIN_VERSION );
	}

	if ( apply_filters( 'gutenbee_enqueue_frontend_scripts', $enqueue_js ) ) {
		wp_enqueue_script( 'gutenbee-scripts', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.scripts.js', array(
			'jquery',
		), GUTENBEE_PLUGIN_VERSION, true );

		wp_localize_script( 'gutenbee-scripts', 'gutenbeeStrings', apply_filters( 'gutenbee_strings', array(
			'image_comparison_before_label' => esc_html__( 'Before', 'gutenbee' ),
			'image_comparison_after_label'  => esc_html__( 'After', 'gutenbee' ),
		) ) );
	}

	if ( $gutenbee_settings['active_animation-controls'] ) {
		wp_enqueue_style( 'gutenbee-animations', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.animations.css', array(), GUTENBEE_PLUGIN_VERSION );
		wp_enqueue_script( 'gutenbee-animations', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/build/gutenbee.animations.js', array(), GUTENBEE_PLUGIN_VERSION, true );
	}
}

add_action( 'admin_enqueue_scripts', 'gutenbee_admin_assets' );

function gutenbee_admin_assets() {
	wp_enqueue_style( 'gutenbee-admin-styles', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/assets/css/admin.css', array(
		'wp-color-picker',
	), GUTENBEE_PLUGIN_VERSION );
	wp_enqueue_script( 'gutenbee-admin-scripts', untrailingslashit( GUTENBEE_PLUGIN_DIR_URL ) . '/assets/js/admin.js', array(
		'wp-color-picker',
	), GUTENBEE_PLUGIN_VERSION, true );
}

// GutenBee's block category
global $wp_version;

// TODO: Remove the 'block_categories' filter when WordPress reaches 5.9
if ( version_compare( $wp_version, '5.8', '<' ) ) {
	add_filter( 'block_categories', 'gutenbee_block_categories', 10, 2 );
} else {
	add_filter( 'block_categories_all', 'gutenbee_block_categories', 10, 2 );
}
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
		'banner'            => __( 'Banner Block', 'gutenbee' ),
		'buttons'           => __( 'Button Block', 'gutenbee' ),
		'container'         => __( 'Container Block', 'gutenbee' ),
		'countdown'         => __( 'Countdown Block', 'gutenbee' ),
		'countup'           => __( 'Countup Block', 'gutenbee' ),
		'divider'           => __( 'Divider Block', 'gutenbee' ),
		'food-menu'         => __( 'Food Menu Block', 'gutenbee' ),
		'heading'           => __( 'Heading Block', 'gutenbee' ),
		'icon'              => __( 'Icon Block', 'gutenbee' ),
		'iconbox'           => __( 'Icon Box Block', 'gutenbee' ),
		'icon-list'         => __( 'Icon List Block', 'gutenbee' ),
		'image'             => __( 'Image Block', 'gutenbee' ),
		'imagebox'          => __( 'Image Box Block', 'gutenbee' ),
		'image-comparison'  => __( 'Image Comparison Block', 'gutenbee' ),
		'justified-gallery' => __( 'Justified Gallery Block', 'gutenbee' ),
		'paragraph'         => __( 'Paragraph Block', 'gutenbee' ),
		'post-types'        => __( 'Post Types Block', 'gutenbee' ),
		'progress-bar'      => __( 'Progress Bar Block', 'gutenbee' ),
		'review'            => __( 'Review Block', 'gutenbee' ),
		'spacer'            => __( 'Spacer Block', 'gutenbee' ),
		'slideshow'         => __( 'Slideshow Block', 'gutenbee' ),
		'tab-slider'        => __( 'Tab Slider Block', 'gutenbee' ),
		'tabs'              => __( 'Tabs Block', 'gutenbee' ),
		'testimonial'       => __( 'Testimonial Block', 'gutenbee' ),
		'video'             => __( 'Video Block', 'gutenbee' ),
		'video-embed'       => __( 'Video Embed Block', 'gutenbee' ),
//			'lottie'            => __( 'Lottie Player Block', 'gutenbee' ),
	);
}

/**
 * Returns a list of blocks and information about them.
 *
 * @return array
 */
function gutenbee_get_blocks_info() {
	return array(
		'gutenbee/accordion'         => array(
			'label'       => __( 'Accordion Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/banner'            => array(
			'label'       => __( 'Banner Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/button'            => array(
			'label'       => __( 'Button Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/buttons'           => array(
			'label'       => __( 'Buttons Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/container'         => array(
			'label'       => __( 'Container Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/column'            => array(
			'label'       => __( 'Column Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/countdown'         => array(
			'label'       => __( 'Countdown Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/countup'           => array(
			'label'       => __( 'Countup Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/divider'           => array(
			'label'       => __( 'Divider Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/google-maps'       => array(
			'label'       => __( 'Google Map Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/heading'           => array(
			'label'       => __( 'Heading Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/icon'              => array(
			'label'       => __( 'Icon Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/iconbox'           => array(
			'label'       => __( 'Icon Box Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/icon-list'         => array(
			'label'       => __( 'Icon List Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/image'             => array(
			'label'       => __( 'Image Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/imagebox'          => array(
			'label'       => __( 'Image Box Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/image-comparison'  => array(
			'label'       => __( 'Image Comparison Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/justified-gallery' => array(
			'label'       => __( 'Justified Gallery Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
//		'gutenbee/lottie'            => array(
//			'label'       => __( 'Lottie Player Block', 'gutenbee' ),
//			'enqueue_js'  => false,
//			'enqueue_css' => false,
//		),
		'gutenbee/paragraph'         => array(
			'label'       => __( 'Paragraph Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/post-types'        => array(
			'label'       => __( 'Post Types Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/progress-bar'      => array(
			'label'       => __( 'Progress Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/review'      => array(
			'label'       => __( 'Review Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/slideshow'         => array(
			'label'       => __( 'Slideshow Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/spacer'            => array(
			'label'       => __( 'Spacer Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
//		'gutenbee/tab-slider'    => array(
//			'label'       => __( 'Tab Slider Block', 'gutenbee' ),
//			'enqueue_js'  => true,
//			'enqueue_css' => true,
//		),
		'gutenbee/tabs'              => array(
			'label'       => __( 'Tabs Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/testimonial'       => array(
			'label'       => __( 'Testimonial Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/video'             => array(
			'label'       => __( 'Video Block', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
		'gutenbee/video-embed'       => array(
			'label'       => __( 'Video Embed Block', 'gutenbee' ),
			'enqueue_js'  => true,
			'enqueue_css' => true,
		),
		'gutenbee/food-menu'         => array(
			'label'       => __( 'Food Menu', 'gutenbee' ),
			'enqueue_js'  => false,
			'enqueue_css' => true,
		),
	);
}

/**
 * Returns the plugin's settings array.
 *
 * @return array
 */
function gutenbee_get_settings() {
	$settings         = get_option( 'gutenbee_settings' );
	$general_settings = get_option( 'gutenbee_general_settings' );

	if ( $settings && $general_settings ) {
		$settings = array_merge( $settings, $general_settings );
	} elseif ( $general_settings ) {
		$settings = $general_settings;
	}

	$settings = gutenbee_validate_settings( $settings );

	/**
	 * Filters the plugin's settings values.
	 *
	 * @since 2.6.2
	 *
	 * @param array $settings
	 *
	 * @hooked ignition_module_accommodation_add_cpt_to_array - 10
	 */
	$settings = apply_filters( 'gutenbee_settings', $settings );

	return $settings;
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
		'active_google-maps'        => 1,
		'google_maps_api_key'       => '',
		'active_high-contrast'      => 0,
		'high-contrast-color'       => '#ffff00',
		'active_editor-width'       => 0,
		'editor-width-value'        => 680,
		'active_animation-controls' => 1,
	);

	foreach ( gutenbee_get_setting_block_names() as $id => $name ) {
		$defaults[ 'active_' . $id ] = 1;
	}

	$settings = wp_parse_args( $settings, $defaults );

	$settings['theme_supports']['post-types'] = gutenbee_block_post_types_get_theme_support();
	$settings['theme_supports']['container']  = gutenbee_block_container_get_theme_support();

	return $settings;
}

/**
 * Returns the appropriate page(d) query variable to use in custom loops (needed for pagination).
 *
 * @uses get_query_var()
 *
 * @param int $default_return The default page number to return, if no query vars are set.
 *
 * @return int The appropriate paged value if found, else 0.
 */
function gutenbee_get_page_var( $default_return = 0 ) {
	$paged = get_query_var( 'paged', false );
	$page  = get_query_var( 'page', false );

	if ( false === $paged && false === $page ) {
		return $default_return;
	}

	return max( $paged, $page );
}


/**
 * Returns the HTML classes needed depending on the number of columns passed.
 *
 * @param int   $columns    Number of columns.
 * @param array $attributes Optional. Array of block attributes.
 *
 * @return mixed|void
 */
function gutenbee_get_columns_classes( $columns, $attributes = array() ) {
	switch ( intval( $columns ) ) {
		case 1:
			$classes = 'columns-1';
			break;
		case 2:
			$classes = 'columns-2';
			break;
		case 3:
			$classes = 'columns-3';
			break;
		case 4:
		default:
			$classes = 'columns-4';
			break;
	}

	return apply_filters( 'gutenbee_get_columns_classes', $classes, (int) $columns, $attributes );
}

function gutenbee_get_template_part( $block, $slug, $name = '', $args = array() ) {
	$templates = array();
	$name      = (string) $name;
	if ( '' !== $name ) {
		$templates[] = "{$slug}-{$name}.php";
	}

	$templates[] = "{$slug}.php";

	$located = gutenbee_locate_template( $block, $templates, $args );

	if ( ! empty( $located ) ) {
		include $located;
	}
}

function gutenbee_locate_template( $block, $templates, $args ) {
	$plugin_path = plugin_dir_path( __FILE__ );

	// The templates path in the plugin, i.e. defaults/fallback. E.g. src/blocks/post-types/templates/
	$default_path = trailingslashit( trailingslashit( $plugin_path ) . "inc/blocks/{$block}/templates" );

	// The templates path in the theme. E.g. gutenbee/
	$theme_path = apply_filters( 'gutenbee_locate_template_theme_path', "gutenbee/{$block}", $block );
	$theme_path = trailingslashit( $theme_path );

	$theme_templates = array();
	foreach ( $templates as $template ) {
		$theme_templates[] = $theme_path . $template;
	}

	// Try to find a theme-overridden template.
	$located = locate_template( $theme_templates, false );

	$located = apply_filters( 'gutenbee_locate_template', $located, $block, $theme_templates, $templates, $theme_path, $default_path, $args );

	if ( empty( $located ) ) {
		// Nope. Try the plugin templates instead.
		foreach ( $templates as $template ) {
			if ( file_exists( $default_path . $template ) ) {
				$located = $default_path . $template;
				break;
			}
		}
	}

	return $located;
}

/**
 * Checks the content for existence of blocks by $block_name inside reusable blocks.
 *
 * @link https://github.com/WordPress/gutenberg/issues/18272#issuecomment-566179633
 *
 * @param string    $block_name
 * @param int|false $id Optional. Post ID. Defaults to the ID of the global $post object.
 *
 * @return bool
 */
function gutenbee_has_block_in_reusable( $block_name, $id = false ) {
	$id = ( ! $id ) ? get_the_ID() : $id;
	if ( $id ) {
		if ( has_block( 'core/block', $id ) ) {
			// Check for reusable blocks
			$content = get_post_field( 'post_content', $id );
			$blocks  = parse_blocks( $content );

			if ( ! is_array( $blocks ) || empty( $blocks ) ) {
				return false;
			}

			foreach ( $blocks as $block ) {
				if ( 'core/block' === $block['blockName'] && ! empty( $block['attrs']['ref'] ) ) {
					if ( has_block( $block_name, $block['attrs']['ref'] ) ) {
						return true;
					}
				}
			}
		}
	}

	return false;
}

// TODO think what to do here enabling JSON uploads
add_filter( 'wp_check_filetype_and_ext', 'gutenbee_file_and_ext_json', 10, 4 );
function gutenbee_file_and_ext_json( $types, $file, $filename, $mimes ) {
	if ( false !== strpos( $filename, '.json' ) ) {
		$types['ext']  = 'json';
		$types['type'] = 'application/json';
	}
	return $types;
}

add_filter( 'upload_mimes', 'gutenbee_mime_types' );
function gutenbee_mime_types( $mimes ) {
	$mimes['json'] = 'application/json';
	return $mimes;
}

add_filter( 'plugin_action_links_gutenbee/gutenbee.php', 'gutenbee_settings_link' );
function gutenbee_settings_link( $links ) {
	$action_links = array(
		'settings' => '<a href="' . admin_url( 'admin.php?page=gutenbee' ) . '" aria-label="' . esc_attr__( 'View GutenBee settings', 'gutenbee' ) . '">' . esc_html__( 'Settings', 'gutenbee' ) . '</a>',
	);

	return array_merge( $action_links, $links );
}

add_filter( 'excerpt_allowed_blocks', 'gutenbee_filter_excerpt_allowed_blocks' );
function gutenbee_filter_excerpt_allowed_blocks( $allowed_blocks ) {
	$allowed_blocks = array_merge( $allowed_blocks, array( 'gutenbee/paragraph' ) );

	return $allowed_blocks;
}

require_once untrailingslashit( dirname( __FILE__ ) ) . '/inc/options.php';
require_once untrailingslashit( dirname( __FILE__ ) ) . '/inc/blocks/container/block.php';
require_once untrailingslashit( dirname( __FILE__ ) ) . '/inc/blocks/post-types/block.php';
