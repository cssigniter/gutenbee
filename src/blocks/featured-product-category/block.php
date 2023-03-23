<?php
add_action( 'init', 'gutenbee_create_block_featured_product_category_block_init' );
function gutenbee_create_block_featured_product_category_block_init() {
	register_block_type(
		'gutenbee/featured-product-category',
		array(
			'attributes'      => array(
				'uniqueId'           => array(
					'type'    => 'string',
					'default' => '',
				),
				'categoryId'        => array(
					'type' => 'integer',
				),
				'numberColumns'      => array(
					'type'    => 'integer',
					'default' => 3,
				),
				'numberProducts'     => array(
					'type'    => 'integer',
					'default' => 3,
				),
				'handpickedProducts' => array(
					'type'    => 'array',
					'default' => array(),
				),
				'showCat'            => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showRating'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showPrice'          => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showStock'          => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showButton'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'layout'             => array(
					'type'    => 'string',
					'default' => 'grid',
				),
			),
			'render_callback' => 'gutenbee_featured_product_category',
		)
	);
}

function gutenbee_featured_product_category( $attributes, $content, $block ) {
	return 'Placeholding!';
}
