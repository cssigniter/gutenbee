<?php
// TODO: Reformat/beautify/indent code properly on all 3 blocks.

add_action( 'init', 'gutenbee_create_block_featured_product_category_block_init' );
function gutenbee_create_block_featured_product_category_block_init() {
	register_block_type(
		'gutenbee/featured-product-category',
		array(
			'attributes'      => array(
				'uniqueId'            => array(
					'type'    => 'string',
					'default' => '',
				),
				'categoryId'          => array(
					'type'    => 'integer',
					'default' => -1,
				),
				'numberColumns'       => array(
					'type'    => 'integer',
					'default' => 3,
				),
				'numberProducts'      => array(
					'type'    => 'integer',
					'default' => 3,
				),
				'handpickedProducts'  => array(
					'type'    => 'array',
					'default' => array(),
				),
				'showCat'             => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showRating'          => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showPrice'           => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showStock'           => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showButton'          => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'layout'              => array(
					'type'    => 'string',
					'default' => 'grid',
				),
				'showCategory'        => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'categoryImage'       => array(
					'type'    => 'object',
					'default' => '',
				),
				'categoryTitle'       => array(
					'type'    => 'string',
					'default' => '',
				),
				'categoryDescription' => array(
					'type'    => 'string',
					'default' => '',
				),
				'buttonText'          => array(
					'type'    => 'string',
					'default' => '',
				),
				'contentPosition'     => array(
					'type'    => 'string',
					'default' => 'bottom-center',
				),
				'textColor'           => array(
					'type'    => 'string',
					'default' => '',
				),
				'gradient'            => array(
					'type'    => 'string',
					'default' => '',
				),
				'gradientOpacity'     => array(
					'type'    => 'number',
					'default' => 0.5,
				),
			),
			'render_callback' => 'gutenbee_featured_product_category',
		)
	);
}

function gutenbee_featured_product_category( $attributes, $content, $block ) {
	$unique_id        = $attributes['uniqueId'];
	$category         = $attributes['categoryId'];
	$handpicked       = $attributes['handpickedProducts'];
	$columns          = $attributes['numberColumns'];
	$num_products     = $attributes['numberProducts'];
	$layout           = $attributes['layout'];
	$show_cat         = $attributes['showCat'];
	$show_rating      = $attributes['showRating'];
	$show_price       = $attributes['showPrice'];
	$show_stock       = $attributes['showStock'];
	$show_button      = $attributes['showButton'];
	$show_category    = $attributes['showCategory'];
	$category_image   = $attributes['categoryImage'];
	$category_title   = $attributes['categoryTitle'];
	$category_desc    = $attributes['categoryDescription'];
	$button_text      = $attributes['buttonText'];
	$content_position = $attributes['contentPosition'];
	$text_color       = $attributes['textColor'];
	$gradient         = $attributes['gradient'];
	$gradient_opacity = $attributes['gradientOpacity'];

	$is_editor         = defined( 'REST_REQUEST' ) && REST_REQUEST;
	$container_classes = array(
		'wp-block-gutenbee-featured-product-category__content',
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
		'columns'       => $columns,
		'classes'       => array_filter( array_map( 'trim', explode( ' ', $class_name ) ) ),
		'show-cat'      => $show_cat,
		'show-rating'   => $show_rating,
		'show-price'    => $show_price,
		'show-stock'    => $show_stock,
		'show-button'   => $show_button,
		'selected-term' => empty( $handpicked ) ? get_term( $category ) : false,
	);

	ob_start();
	// TODO: Indentation
	if ( $text_color || $gradient ) : ?>
		<?php if ( $text_color ) : ?>
		#gutenbee-featured-product-category-<?php echo esc_attr( $unique_id ); ?> .wp-block-gutenbee-featured-product-category__card  {
			color: <?php echo esc_attr( $text_color ); ?>;
		}
		<?php endif; ?>

		<?php if ( $gradient ) : ?>
		#gutenbee-featured-product-category-<?php echo esc_attr( $unique_id ); ?> .wp-block-gutenbee-featured-product-category__card::after  {
			background: <?php echo esc_attr( $gradient ); ?>;
			opacity: <?php echo esc_attr( $gradient_opacity ); ?>;
		}
		<?php endif; ?>
		<?php
	endif;
	$css = ob_get_clean();

	wp_enqueue_style( 'gutenbee-featured-product-category' );
	wp_add_inline_style( 'gutenbee-featured-product-category', $css );

	ob_start();

	if ( $is_editor && ( $text_color || $gradient ) ) :
		// TODO: Indentation
		?>
		<style type="text/css">
		<?php if ( $text_color ) : ?>
		#gutenbee-featured-product-category-<?php echo esc_attr( $unique_id ); ?> .wp-block-gutenbee-featured-product-category__card  {
			color: <?php echo esc_attr( $text_color ); ?>;
		}
		<?php endif; ?>

		<?php if ( $gradient ) : ?>
		#gutenbee-featured-product-category-<?php echo esc_attr( $unique_id ); ?> .wp-block-gutenbee-featured-product-category__card::after  {
			background: <?php echo esc_attr( $gradient ); ?>;
			opacity: <?php echo esc_attr( $gradient_opacity ); ?>;
		}
		<?php endif; ?>
		</style>
	<?php endif; ?>
	<div id="gutenbee-featured-product-category-<?php echo esc_attr( $unique_id ); ?>" class="wp-block-gutenbee-featured-product-category wp-block-gutenbee-featured-product-category__<?php echo esc_attr( $layout ); ?>">
	<?php
	$product_data = array();

	if ( ! empty( $handpicked ) ) {
		$product_data = $handpicked;
	} elseif ( isset( $category ) ) {
		$product_data = $category;
	}

	$args = array(
		'post_type'      => 'product',
		'posts_per_page' => $num_products,
	);

	if ( ! empty( $handpicked ) ) {
		$handpicked_query = array(
			'post__in' => $product_data,
		);

		$args = array_merge( $args, $handpicked_query );
	} elseif ( ! empty( $category ) && -1 !== $category ) {
		$tax_query = array(
			'tax_query' => array(
				array(
					'taxonomy' => 'product_cat',
					'terms'    => $product_data,
					'field'    => 'id',
				),
			),
		);

		$args = array_merge( $args, $tax_query );
	}

	$loop = new WP_Query( $args );
	if ( $loop->have_posts() ) :
		// TODO: Indentation
		?>
	<div class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>" data-columns="<?php echo (int) $columns; ?>" data-products="<?php echo (int) $num_products; ?>">
		<?php
		// TODO: Indentation
		if ( $is_editor && 'slider' === $layout && $loop->found_posts >= $columns ) {
			?>
			<button class="slick-prev slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"></path></svg></button>
			<button class="slick-next slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"></path></svg></button>
			<?php
		}
		while ( $loop->have_posts() ) :
			$loop->the_post();
			// TODO: Unneeded opening/closing tags.
			?>
			<?php
			$item_cuttoff = $columns;

			// TODO: This can be an && in a single if.
			if ( empty( $handpicked ) ) {
				if ( $show_category ) {
					$item_cuttoff = $columns - 1;
				}
			}

			if ( $is_editor && 'slider' === $layout && $loop->current_post >= $item_cuttoff ) {
				continue;
			} else {
				?>
				<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
					<?php
					gutenbee_get_template_part( 'featured-product-category', 'item', get_post_type(), $item_template_vars );
					?>
				</div>
				<?php
			}
			// TODO: Indentation
			endwhile;

		if ( $show_category && ! empty( $category ) && empty( $handpicked ) ) :
			$card_template_vars = array(
				'columns'            => $columns,
				'classes'            => array_filter( array_map( 'trim', explode( ' ', $class_name ) ) ),
				'selected-term'      => get_term( $category ),
				'selected-term-meta' => get_term_meta( $category ),
				'show-price'         => $show_price,
				'show-stock'         => $show_stock,
				'show-button'        => $show_button,
				// TODO: Rename to image_url or image_id, depending on what this holds.
				'image'              => $category_image,
				'title'              => $category_title,
				'description'        => $category_desc,
				'button-text'        => $button_text,
				'content-position'   => $content_position,
			);

			$classes[] = 'wp-block-gutenbee-featured-product-category__card-wrap'
			// TODO: Indentation
			?>
			<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
			<?php
			// TODO: Indentation. Can be a single line with the opening/closing php tags.
			gutenbee_get_template_part( 'featured-product-category', 'category-card', '', $card_template_vars );
			?>
			</div>
			<?php
			endif;
		// TODO: Indentation
		?>
		</div>
		<?php
		else :
			?>
			<div class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?> wp-block-gutenbee-featured-product-category-no-products">
				<?php esc_html_e( 'No products found', 'gutenbee' ); ?>
			</div>
			<?php
		endif;
		// TODO: wp_reset_postdata() should be after the endwhile, and inside the loop's if.
		wp_reset_postdata();
		?>
	</div>
	<?php
	return ob_get_clean();
}
