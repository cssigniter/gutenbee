<?php

/**
 * Renders the `gutenbee/latest-post-types` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string The block's output.
 */
function render_block_gutenbee_latest_post_types( $attributes ) {
	$recent_posts = wp_get_recent_posts( array(
		'post_type'   => $attributes['postType'],
		'numberposts' => $attributes['postsToShow'],
		'post_status' => 'publish',
		'order'       => $attributes['order'],
		'orderby'     => $attributes['orderBy'],
	) );

	$list_items_markup = '';

	foreach ( $recent_posts as $post ) {
		$post_id = $post['ID'];

		$title = get_the_title( $post_id );
		if ( ! $title ) {
			$title = __( '(Untitled)', 'gutenbee' );
		}
		$list_items_markup .= sprintf(
			'<li><a href="%1$s">%2$s</a>',
			esc_url( get_permalink( $post_id ) ),
			esc_html( $title )
		);

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-latest-posts__post-date">%2$s</time>',
				esc_attr( get_the_date( 'c', $post_id ) ),
				esc_html( get_the_date( '', $post_id ) )
			);
		}

		$list_items_markup .= "</li>\n";
	}

	$class = "wp-block-latest-post-types";

	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	$block_content = sprintf(
		'<ul class="%1$s">%2$s</ul>',
		esc_attr( $class ),
		$list_items_markup
	);

	return $block_content;
}

/**
 * Registers the `gutenbee/latest-post-types` block on server.
 */
function register_block_gutenbee_latest_post_types() {
	register_block_type( 'gutenbee/latest-post-types', array(
		'attributes' => array(
			'postType' => array(
				'type' => 'string',
				'default' => 'page',
			),
			'className' => array(
				'type' => 'string',
			),
			'postsToShow' => array(
				'type'    => 'number',
				'default' => 5,
			),
			'order' => array(
				'type'    => 'string',
				'default' => 'desc',
			),
			'orderBy' => array(
				'type'    => 'string',
				'default' => 'date',
			),
			'displayPostDate' => array(
				'type'    => 'boolean',
				'default' => 'false',
			),
		),
		'render_callback' => 'render_block_gutenbee_latest_post_types',
	) );
}

add_action( 'init', 'register_block_gutenbee_latest_post_types' );
