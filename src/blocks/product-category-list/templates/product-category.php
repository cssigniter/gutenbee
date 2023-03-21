<?php
/** @var array $args */
$show_title       = $args['show-title'];
$show_count       = $args['show-count'];
$product_category = $args['product-category'];
$custom_image     = $args['custom-image'];
$category_image   = $custom_image ? $custom_image['id'] : get_term_meta( $product_category->term_id, 'thumbnail_id', true );

$category_image_size = apply_filters( 'gutenbee_product_category_list_image_size', 'woocommerce_thumbnail' );
$dimensions          = wc_get_image_size( $category_image_size );

if ( $category_image ) {
	$image        = wp_get_attachment_image_src( $category_image, $category_image_size );
	$image        = $image[0];
	$image_srcset = function_exists( 'wp_get_attachment_image_srcset' ) ? wp_get_attachment_image_srcset( $category_image, $category_image_size ) : false;
	$image_sizes  = function_exists( 'wp_get_attachment_image_sizes' ) ? wp_get_attachment_image_sizes( $category_image, $category_image_size ) : false;
} else {
	$image        = wc_placeholder_img_src();
	$image_srcset = false;
	$image_sizes  = false;
}
?>

<div <?php wc_product_cat_class( 'gutenbee-product-category-list__item', $product_category ); ?>>
	<?php woocommerce_template_loop_category_link_open( $product_category ); ?>
	<?php
	if ( $image ) {
		// Prevent esc_url from breaking spaces in urls for image embeds.
		// Ref: https://core.trac.wordpress.org/ticket/23605.
		$image = str_replace( ' ', '%20', $image );

		// Add responsive image markup if available.
		if ( $image_srcset && $image_sizes ) {
			echo '<img src="' . esc_url( $image ) . '" alt="' . esc_attr( $product_category->name ) . '" width="' . esc_attr( $dimensions['width'] ) . '" height="' . esc_attr( $dimensions['height'] ) . '" srcset="' . esc_attr( $image_srcset ) . '" sizes="' . esc_attr( $image_sizes ) . '" />';
		} else {
			echo '<img src="' . esc_url( $image ) . '" alt="' . esc_attr( $product_category->name ) . '" width="' . esc_attr( $dimensions['width'] ) . '" height="' . esc_attr( $dimensions['height'] ) . '" />';
		}
	}
	?>
	<?php
	if ( $show_title ) :
		?>
		<h2 class="woocommerce-loop-category__title">
			<?php
			echo esc_html( $product_category->name );

			if ( $show_count && $product_category->count > 0 ) {
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				echo apply_filters( 'woocommerce_subcategory_count_html', ' <mark class="count">(' . esc_html( $product_category->count ) . ')</mark>', $product_category );
			}
			?>
		</h2>
		<?php
	endif;
	?>
	<?php woocommerce_template_loop_category_link_close(); ?>
</div>
