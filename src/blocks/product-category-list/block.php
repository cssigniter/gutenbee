<?php
add_action( 'init', 'gutenbee_create_block_product_category_list_block_init' );
function gutenbee_create_block_product_category_list_block_init() {
	register_block_type(
		'gutenbee/product-category-list',
		array(
			'attributes'      => array(
				'uniqueId'        => array(
					'type'    => 'string',
					'default' => '',
				),
				'numberColumns'   => array(
					'type'    => 'integer',
					'default' => 3,
				),
				'showTitle'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showCount'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'buttonContent'   => array(
					'type'    => 'string',
					'default' => __( 'All products', 'gutenbee' ),
				),
				'buttonLink'      => array(
					'type'    => 'string',
					'default' => '',
				),
				'buttonAlignment' => array(
					'type'    => 'string',
					'default' => 'left',
				),
				'layout'          => array(
					'type'    => 'string',
					'default' => 'grid',
				),
				'items'           => array(
					'type'    => 'array',
					'default' => array(),
				),
			),
			'render_callback' => 'gutenbee_product_category_list',
		)
	);
}

function gutenbee_product_category_list( $attributes, $content, $block ) {
	$unique_id        = $attributes['uniqueId'];
	$columns          = $attributes['numberColumns'];
	$button_content   = $attributes['buttonContent'];
	$button_link      = $attributes['buttonLink'];
	$button_alignment = $attributes['buttonAlignment'];
	$items            = $attributes['items'];
	$layout           = $attributes['layout'];
	$show_title       = $attributes['showTitle'];
	$show_count       = $attributes['showCount'];

	$args = array(
		'include' => wp_list_pluck( $items, 'productCat' ),
		'orderby' => 'include',
	);

	// TODO: Account for no categories selected.
	$product_categories = get_terms( 'product_cat', $args );

	$is_editor           = defined( 'REST_REQUEST' ) && REST_REQUEST;
	$container_classes   = array(
		'gutenbee-product-category-list__content',
		'gutenbee-row',
		'gutenbee-row-items',
	);
	$container_classes[] = "gutenbee-row-columns-{$columns}";
	$class_name          = '';

	$classes[] = gutenbee_get_columns_classes( $columns, $attributes );

	if ( function_exists( 'ci_theme_ignition_customizer_defaults' ) ) {
		$mobile_classes = get_theme_mod( 'woocommerce_shop_mobile_columns', ci_theme_ignition_customizer_defaults( 'woocommerce_shop_mobile_columns' ) );

		if ( 2 === (int) $mobile_classes && 1 !== (int) $columns ) {
			$classes[0] = str_replace( 'col-12', 'col-6', $classes[0] );
		}
	}

	$item_template_vars = array(
		'columns'    => $columns,
		'classes'    => array_filter( array_map( 'trim', explode( ' ', $class_name ) ) ),
		'show-title' => $show_title,
		'show-count' => $show_count,
	);

	foreach ( $items as $key => $value ) {
		$items[ $value['productCat'] ] = $value['customImage'];
		unset( $items[ $key ] );
	}

	ob_start();
	?>
	<div id="gutenbee-product-category-list-<?php echo esc_attr( $unique_id ); ?>" class="wp-block-gutenbee-product-category-list wp-block-gutenbee-product-category-list-<?php echo esc_attr( $button_alignment ); ?> wp-block-gutenbee-product-category-list-<?php echo esc_attr( $layout ); ?>">
		<?php
		if ( $product_categories ) :
			?>
		<div class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>" data-columns="<?php echo (int) $columns; ?>">
			<?php foreach ( $product_categories as $product_category ) : ?>
			<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
				<?php
				$item_template_vars['product-category'] = $product_category;
				$item_template_vars['custom-image']     = $items[ $product_category->term_id ];
				gutenbee_get_template_part( 'product-category-list', 'product-category', '', $item_template_vars );
				?>
			</div>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
	</div>
	<?php

	return ob_get_clean();
}
