<?php
/** @var array $args */
$show_price  = $args['show-price'];
$show_button = $args['show-button'];
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
		woocommerce_template_loop_product_title();
		woocommerce_template_loop_product_link_close();
	if ( $show_price ) {
		woocommerce_template_loop_price();
	}
	if ( $show_button ) {
		woocommerce_template_loop_add_to_cart();
	}
	?>
	</div>
</article>
