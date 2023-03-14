<?php
add_action( 'init', 'gutenbee_create_block_product_tabs_block_init' );
function gutenbee_create_block_product_tabs_block_init() {
	register_block_type(
		'gutenbee/product-tabs',
		array(
			'attributes'      => array(
				'uniqueId'                => array(
					'type'    => 'string',
					'default' => '',
				),
				'categoryIds'             => array(
					'type'    => 'array',
					'default' => array(),
				),
				'tabIndices'              => array(
					'type' => 'array',
				),
				'activeTabIndex'          => array(
					'type'    => 'integer',
					'default' => 0,
				),
				'numberColumns'           => array(
					'type'    => 'integer',
					'default' => 3,
				),
				'numberProducts'          => array(
					'type'    => 'integer',
					'default' => 3,
				),
				'handpickedProducts'      => array(
					'type'    => 'array',
					'default' => array(),
				),
				'tabButtonAlignment'      => array(
					'type'    => 'string',
					'default' => 'left',
				),
				'showCat'                 => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showRating'              => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showPrice'               => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showStock'               => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'showButton'              => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'buttonTextColor'         => array(
					'type'    => 'string',
					'default' => '',
				),
				'buttonBgColor'           => array(
					'type'    => 'string',
					'default' => '',
				),
				'buttonBorderColor'       => array(
					'type'    => 'string',
					'default' => '',
				),
				'activeButtonTextColor'   => array(
					'type'    => 'string',
					'default' => '',
				),
				'activeButtonBgColor'     => array(
					'type'    => 'string',
					'default' => '',
				),
				'activeButtonBorderColor' => array(
					'type'    => 'string',
					'default' => '',
				),
				'layout'                  => array(
					'type'    => 'string',
					'default' => 'grid',
				),
			),
			'render_callback' => 'gutenbee_product_tabs_get_products',
		)
	);
}

function gutenbee_product_tabs_get_products( $attributes, $content, $block ) {
	$active_tab_index           = $attributes['activeTabIndex'];
	$num_tabs                   = ! empty( $attributes['tabIndices'] ) ? count( $attributes['tabIndices'] ) : 1;
	$categories                 = $attributes['categoryIds'];
	$handpicked                 = $attributes['handpickedProducts'];
	$columns                    = $attributes['numberColumns'];
	$num_products               = $attributes['numberProducts'];
	$tab_button_alignment       = $attributes['tabButtonAlignment'];
	$show_cat                   = $attributes['showCat'];
	$show_rating                = $attributes['showRating'];
	$show_price                 = $attributes['showPrice'];
	$show_stock                 = $attributes['showStock'];
	$show_button                = $attributes['showButton'];
	$unique_id                  = $attributes['uniqueId'];
	$button_text_color          = $attributes['buttonTextColor'];
	$button_bg_color            = $attributes['buttonBgColor'];
	$button_border_color        = $attributes['buttonBorderColor'];
	$active_button_text_color   = $attributes['activeButtonTextColor'];
	$active_button_bg_color     = $attributes['activeButtonBgColor'];
	$active_button_border_color = $attributes['activeButtonBorderColor'];
	$layout                     = $attributes['layout'];

	$is_editor         = defined( 'REST_REQUEST' ) && REST_REQUEST;
	$container_classes = array(
		'gutenbee-product-tabs-content',
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
		'columns'     => $columns,
		'classes'     => array_filter( array_map( 'trim', explode( ' ', $class_name ) ) ),
		'show-cat'    => $show_cat,
		'show-rating' => $show_rating,
		'show-price'  => $show_price,
		'show-stock'  => $show_stock,
		'show-button' => $show_button,
	);

	ob_start();
	if ( $button_text_color || $button_bg_color || $button_border_color ) : ?>
		#gutenbee-product-tabs-<?php echo esc_attr( $unique_id ); ?> li {
		<?php if ( $button_text_color ) : ?>
			color: <?php echo esc_attr( $button_text_color ); ?>;
		<?php endif; ?>
		<?php if ( $button_bg_color ) : ?>
			background-color: <?php echo esc_attr( $button_bg_color ); ?>;
		<?php endif; ?>
		<?php if ( $button_border_color ) : ?>
			border-color: <?php echo esc_attr( $button_border_color ); ?>;
		<?php endif; ?>
		}
		<?php
	endif;
	if ( $active_button_text_color || $active_button_bg_color || $active_button_border_color ) :
		?>
		#gutenbee-product-tabs-<?php echo esc_attr( $unique_id ); ?> li.active {
		<?php if ( $active_button_text_color ) : ?>
			color: <?php echo esc_attr( $active_button_text_color ); ?>;
		<?php endif; ?>
		<?php if ( $active_button_bg_color ) : ?>
			background-color: <?php echo esc_attr( $active_button_bg_color ); ?>;
		<?php endif; ?>
		<?php if ( $active_button_border_color ) : ?>
			border-color: <?php echo esc_attr( $active_button_border_color ); ?>;
		<?php endif; ?>
		}
		<?php
	endif;
	$css = ob_get_clean();

	wp_enqueue_style( 'gutenbee-product-tabs' );
	wp_add_inline_style( 'gutenbee-product-tabs', $css );

	ob_start();
	?>
	<div id="gutenbee-product-tabs-<?php echo esc_attr( $unique_id ); ?>" class="wp-block-gutenbee-product-tabs wp-block-gutenbee-product-tabs-<?php echo esc_attr( $tab_button_alignment ); ?> wp-block-gutenbee-product-tabs-<?php echo esc_attr( $layout ); ?>">
		<?php if ( ! $is_editor ) : ?>
			<ul class="wp-block-gutenbee-product-tabs-nav">
				<?php
				$is_active = true;
				foreach ( $block->inner_blocks as $inner_block ) {
					$content = $inner_block->parsed_block['innerHTML'];
					if ( $is_active ) {
						$content = str_replace( 'wp-block-gutenbee-product-tab', 'wp-block-gutenbee-product-tab active', $content );
					}
					echo wp_kses_post( $content );
					$is_active = false;
				}
				?>
			</ul>
		<?php endif; ?>
		<div class="wp-block-gutenbee-product-tabs-content-wrapper">

			<?php
			for ( $i = 0; $i < $num_tabs; $i++ ) {
				$product_data = array();

				if ( ! empty( $handpicked[ $i ]['selectedProducts'] ) ) {
					$product_data = $handpicked[ $i ];
				} elseif ( isset( $categories[ $i ] ) ) {
					$product_data = $categories[ $i ];
				}

				// TODO: Find a better way.
				if ( 0 === intval( $i ) ) {
					array_push( $container_classes, 'active' );
				} elseif ( in_array( 'active', $container_classes, true ) ) {
					$key = array_search( 'active', $container_classes, true );
					unset( $container_classes[ $key ] );
				}

				if ( $is_editor ) {
					if ( intval( $i ) === intval( $active_tab_index ) ) {
						array_push( $container_classes, 'active' );
					} elseif ( in_array( 'active', $container_classes, true ) ) {
						$key = array_search( 'active', $container_classes, true );
						unset( $container_classes[ $key ] );
					}
				}

				if ( $is_editor && ( null === $product_data || isset( $product_data['termId'] ) && empty( $product_data['termId'] ) ) ) :
					?>
					<div class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>">
						<?php

						for ( $j = 0; $j < $num_products; $j++ ) {
							$classes[] = 'placeholder-wrapper';
							?>
							<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
								<div class="entry-item entry-item-product product type-product has-post-thumbnail first placeholder-product">
									<a href="#" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
										<div class="entry-item-thumb">
											<img src="<?php echo esc_url_raw( wc_placeholder_img_src() ); ?>">
										</div>
									</a>
									<div class="entry-item-content">
										<a href="#" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
											<h2 class="woocommerce-loop-product__title"><?php esc_html_e( 'Product title', 'gutenbee' ); ?></h2>
										</a>
										<?php if ( $show_price ) : ?>
											<span class="price"><span class="woocommerce-Price-amount amount"><?php esc_html_e( 'Price', 'gutenbee' ); ?></span></span>
										<?php endif; ?>
										<?php if ( $show_button ) : ?>
											<a href="#" class="button wp-element-button product_type_simple add_to_cart_button ajax_add_to_cart" rel="nofollow"><?php esc_html_e( 'Add to cart', 'gutenbee' ); ?></a>
										<?php endif; ?>
									</div>
								</div>
							</div>
						<?php } ?>
					</div>
					<?php

				else :

					$args = array(
						'post_type'      => 'product',
						'posts_per_page' => $num_products,
					);

					if ( ! empty( $handpicked[ $i ]['selectedProducts'] ) ) {
						$handpicked_query = array(
							'post__in' => $product_data['selectedProducts'],
						);

						$args = array_merge( $args, $handpicked_query );
					} elseif ( ! empty( $categories[ $i ] ) ) {
						$tax_query = array(
							'tax_query' => array(
								array(
									'taxonomy' => 'product_cat',
									'terms'    => $product_data['termId'],
									'field'    => 'id',
								),
							),
						);

						$args = array_merge( $args, $tax_query );
					}

					$loop = new WP_Query( $args );
					if ( $loop->have_posts() ) :
						$item_template_vars['term-id'] = $product_data['termId'];
						?>
						<div class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>" data-columns="<?php echo (int) $columns; ?>" data-products="<?php echo (int) $num_products; ?>">
						<?php
						if ( $is_editor && 'slider' === $layout && $loop->found_posts >= $columns ) {
							?>
									<button class="slick-prev slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"></path></svg></button>
									<button class="slick-next slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"></path></svg></button>
							<?php
						}
						while ( $loop->have_posts() ) :
							$loop->the_post();
							?>
							<?php
							if ( $is_editor && 'slider' === $layout && $loop->current_post >= $columns ) {
								continue;
							} else {
								?>
								<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
									<?php
									gutenbee_get_template_part( 'product-tabs', 'item', get_post_type(), $item_template_vars );
									?>
								</div>
									<?php
							}
							endwhile;
						?>
						</div>
						<?php
					else :
						?>
						<div class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?> wp-block-gutenbee-product-tabs-no-products">
							<?php esc_html_e( 'No products found', 'gutenbee' ); ?>
						</div>
						<?php
					endif;
					wp_reset_postdata();
				endif;
			}
			?>
		</div>
	</div>
	<?php

	return ob_get_clean();
}
