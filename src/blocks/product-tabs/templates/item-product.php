<?php
/** @var array $args */
$show_cat    = $args['show-cat'];
$show_rating = $args['show-rating'];
$show_price  = $args['show-price'];
$show_stock  = $args['show-stock'];
$show_button = $args['show-button'];
$term_id     = $args['term-id'];
?>
<article
	id="gutenbee-product-tabs-<?php the_ID(); ?>"
	<?php post_class( 'gutenbee-product-tabs-item' ); ?>
>
	<?php
		woocommerce_template_loop_product_link_open();
		woocommerce_show_product_loop_sale_flash();
		woocommerce_template_loop_product_thumbnail();
		woocommerce_template_loop_product_link_close();
	?>

	<div class="entry-item-content">
	<?php
		woocommerce_template_loop_product_link_open();
	if ( $show_cat ) {
		?>
		<span><?php echo get_term( $term_id )->name; ?></span>
		<?php
	}
		woocommerce_template_loop_product_title();
		woocommerce_template_loop_product_link_close();
	if ( $show_rating ) {
		woocommerce_template_loop_rating();
	}
	if ( $show_price ) {
		woocommerce_template_loop_price();
	}
	if ( $show_stock ) {
		echo wc_get_stock_html( wc_get_product( get_the_ID() ) );
	}
	if ( $show_button ) {
		woocommerce_template_loop_add_to_cart();
	}
	?>
	</div>
</article>
