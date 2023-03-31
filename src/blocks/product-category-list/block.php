<?php
add_action( 'init', 'gutenbee_create_block_product_category_list_block_init' );
function gutenbee_create_block_product_category_list_block_init() {
	register_block_type(
		'gutenbee/product-category-list',
		array(
			'attributes'      => array(
				'uniqueId'      => array(
					'type'    => 'string',
					'default' => '',
				),
				'numberColumns' => array(
					'type'    => 'integer',
					'default' => 3,
				),
				'showTitle'     => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showCount'     => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'layout'        => array(
					'type'    => 'string',
					'default' => 'grid',
				),
				'items'         => array(
					'type'    => 'array',
					'default' => array(),
				),
			),
			'render_callback' => 'gutenbee_product_category_list',
		)
	);
}

function gutenbee_product_category_list( $attributes, $content, $block ) {
	$unique_id  = $attributes['uniqueId'];
	$columns    = $attributes['numberColumns'];
	$items      = $attributes['items'];
	$layout     = $attributes['layout'];
	$show_title = $attributes['showTitle'];
	$show_count = $attributes['showCount'];

	$args = array(
		'include' => wp_list_pluck( $items, 'productCat' ),
		'orderby' => 'include',
	);

	// TODO: Account for no categories selected.
	$product_categories = get_terms( 'product_cat', $args );

	$is_editor           = defined( 'REST_REQUEST' ) && REST_REQUEST;
	$container_classes   = array(
		'wp-block-gutenbee-product-category-list__content',
		'gutenbee-row',
		'gutenbee-row-items',
	);
	$container_classes[] = "gutenbee-row-columns-{$columns}";
	// TODO: Classes are needed.
	$class_name          = '';

	$classes[] = gutenbee_get_columns_classes( $columns, $attributes );

	// TODO: No ci_theme.
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
		// TODO: Duplicate 'classes' key. Remove one of the two.
		'classes'    => $classes,
	);

	foreach ( $items as $key => $value ) {
		$items[ $value['productCat'] ] = $value['customImage'];
		unset( $items[ $key ] );
	}

	ob_start();
	?>
	<div id="gutenbee-product-category-list-<?php echo esc_attr( $unique_id ); ?>" class="wp-block-gutenbee-product-category-list wp-block-gutenbee-product-category-list__<?php echo esc_attr( $layout ); ?>">
		<?php
		if ( $product_categories ) :
			?>
			<?php
			if ( $is_editor && 'slider' === $layout && count( $product_categories ) >= $columns ) {
				?>
				<button class="slick-prev slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"></path></svg></button>
				<button class="slick-next slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"></path></svg></button>
				<?php
			}
			?>
		<ul class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>" data-columns="<?php echo (int) $columns; ?>">
			<?php
			if ( $is_editor && 'slider' === $layout ) {
				// TODO: What is $i ? Give a more descriptive name.
				$i = 0;
			}

			foreach ( $product_categories as $product_category ) :
				?>
				<?php
				$item_template_vars['product-category'] = $product_category;
				// TODO: Check the existence of the key as well, not just the emptiness of the array.
				$item_template_vars['custom-image']     = ! empty( $items ) ? $items[ $product_category->term_id ] : false;
				if ( $is_editor && 'slider' === $layout && $i >= $columns ) {
					continue;
				} else {
					gutenbee_get_template_part( 'product-category-list', 'product-category', '', $item_template_vars );
				}
				if ( $is_editor && 'slider' === $layout ) {
					$i++;
				}
				?>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
	</div>
	<?php

	return ob_get_clean();
}
