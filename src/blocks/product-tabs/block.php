<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
add_action('init', 'gutenbee_create_block_product_tabs_block_init');
function gutenbee_create_block_product_tabs_block_init()
{
	register_block_type(
		'gutenbee/product-tabs',
		array(
			'attributes' => array(
				'categoryIds' => array(
					'type' => 'array',
				),
				'tabIndices' => array(
					'type' => 'array',
				),
				'activeTabIndex' => array(
					'type' => 'integer',
					'default' => 0,
				),
				'numberColumns' => array(
					'type' => 'integer',
					'default' => 3,
				),
				'numberProducts' => array(
					'type' => 'integer',
					'default' => 3,
				),
				'handpickedProducts' => array(
					'type'    => 'array',
					'default' => array(),
				),
			),
			'render_callback' => 'gutenbee_product_tabs_get_products',
		)
	);
}

function gutenbee_product_tabs_get_products($attributes, $content, $block)
{
	//TODO: Make a better check, i.e. if not our block.
	// if ( !isset( $attributes['categoryIds'] ) ) {
	// 	return;
	// }

	$is_editor         = defined('REST_REQUEST') && REST_REQUEST;
	$active_tab_index  = $attributes['activeTabIndex'];
	$numTabs           = count($attributes['tabIndices']);
	$categories        = $attributes['categoryIds'];
	$handpicked		   = $attributes['handpickedProducts'];
	$columns           = $attributes['numberColumns'];
	$numberProducts    = $attributes['numberProducts'];
	$container_classes = array(
		'gutenbee-product-tabs-content',
		'gutenbee-row',
		'gutenbee-row-items',
	);

	$container_classes[] = "gutenbee-row-columns-{$columns}";
	$class_name          = '';

	$classes[] = gutenbee_get_columns_classes($columns, $attributes);

	$item_template_vars = array(
		'columns'    => $columns,
		'classes'    => array_filter(array_map('trim', explode(' ', $class_name))),
		'image-size' => false, // Don't force a default image size. Let templates decide for themselves.
	);

	ob_start();
?>
	<div class="wp-block-gutenbee-product-tabs">
		<ul class="wp-block-gutenbee-product-tabs-nav">
			<?php foreach ($block->inner_blocks as $inner_block) {
				echo wp_kses_post($inner_block->parsed_block['innerHTML']);
			} ?>
		</ul>

		<div class="wp-block-gutenbee-product-tabs-content-wrapper">

			<?php for ($i = 0; $i < $numTabs; $i++) {

				$product_data = !empty($handpicked[$i]['selectedProducts']) ? $handpicked[$i] : $categories[$i];

				// TODO: Find a better way.
				if (0 === intval($i)) {
					array_push($container_classes, 'active');
				} else {
					array_pop($container_classes);
				}

				if ($is_editor) {
					if (intval($i) === intval($active_tab_index)) {
						array_push($container_classes, 'active');
					} else {
						array_pop($container_classes);
					}
				}

				if ($is_editor && isset($product_data['termId']) && empty($product_data['termId'])) : ?>
					<div class="<?php echo esc_attr(implode(' ', $container_classes)); ?>">
						<?php

						for ($i = 0; $i < $numberProducts; $i++) {
							$classes[] = 'placeholder-wrapper';
						?>
							<div class="<?php echo esc_attr(implode(' ', $classes)); ?>">
								<div class="entry-item entry-item-product product type-product has-post-thumbnail first placeholder-product">
									<a href="#" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
										<div class="entry-item-thumb">
											<img src="<?php echo esc_url_raw( wc_placeholder_img_src() ); ?>">
										</div>
									</a>
									<div class="entry-item-content">
										<a href="#" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
											<h2 class="woocommerce-loop-product__title"><?php esc_html_e('Product title', 'gutenbee'); ?></h2>
										</a>
										<span class="price"><span class="woocommerce-Price-amount amount"><?php esc_html_e('Price', 'gutenbee'); ?></span></span>
										<a href="#" class="button wp-element-button product_type_simple add_to_cart_button ajax_add_to_cart" rel="nofollow"><?php esc_html_e('Add to cart', 'gutenbee'); ?></a>
									</div>
								</div>
							</div>
						<?php } ?>
					</div>
					<?php

				else :

					$args = array(
						'post_type' => 'product',
						'posts_per_page' => $numberProducts,
					);

					if (!empty($handpicked[$i]['selectedProducts'])) {
						$handpicked_query = array(
							'post__in' => $product_data['selectedProducts'],
						);

						$args = array_merge($args, $handpicked_query);
					} else if (!empty($categories[$i])) {
						$tax_query = array(
							'tax_query'           => array(
								array(
									'taxonomy'      => 'product_cat',
									'terms'         => $product_data['termId'],
									'field'         => 'id',
								)
							)
						);

						$args = array_merge($args, $tax_query);
					}

					$loop = new WP_Query($args);
					if ($loop->have_posts()) : ?>
						<div class="<?php echo esc_attr(implode(' ', $container_classes)); ?>">
							<?php while ($loop->have_posts()) : $loop->the_post(); ?>

								<div class="<?php echo esc_attr(implode(' ', $classes)); ?>"><?php

																									if (1 === $columns) {
																										gutenbee_get_template_part('post-types', 'article-media', get_post_type(), $item_template_vars);
																									} else {
																										gutenbee_get_template_part('post-types', 'article-default', get_post_type(), $item_template_vars);
																									}

																									?></div>
							<?php endwhile; ?>
						</div><?php
							else : ?>
						<div class="<?php echo esc_attr(implode(' ', $container_classes)); ?> wp-block-gutenbee-product-tabs-no-products">
							<?php echo esc_html('No products found'); ?>
						</div>
			<?php endif;
							wp_reset_postdata();
						endif;
					}
			?>
		</div>
	</div>
<?php

	return ob_get_clean();
}
