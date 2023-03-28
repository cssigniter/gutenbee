<?php
/** @var array $args */
$show_cat      = $args['show-cat'];
$show_rating   = $args['show-rating'];
$show_price    = $args['show-price'];
$show_stock    = $args['show-stock'];
$show_button   = $args['show-button'];
$selected_term = $args['selected-term'];
?>
<article
	<?php post_class( 'wp-block-gutenbee-featured-product-category__item' ); ?>
>
	<?php
		woocommerce_template_loop_product_link_open();
		woocommerce_show_product_loop_sale_flash();
		woocommerce_template_loop_product_thumbnail();
		woocommerce_template_loop_product_link_close();
	?>

	<div class="entry-item-content">
		<?php
		if ( $show_cat && $selected_term ) {
			?>
			<a href="<?php echo esc_url_raw( get_term_link( $selected_term->term_id, 'product_cat' ) ); ?>" class="product-category-title"><?php echo $selected_term->name; ?></a>
			<?php
		} elseif ( $show_cat ) {
			?>
			<div class="product-category-terms"><?php echo get_the_term_list( get_the_ID(), 'product_cat', '', ', ', '' ); ?></div>
			<?php
		}

		woocommerce_template_loop_product_link_open();
		woocommerce_template_loop_product_title();
		woocommerce_template_loop_product_link_close();

		if ( $show_price ) {
			woocommerce_template_loop_price();
		}

		if ( $show_stock ) {
			echo wc_get_stock_html( wc_get_product( get_the_ID() ) );
		}

		if ( $show_rating ) {
			woocommerce_template_loop_rating();
		}
		if ( $show_button ) {
			woocommerce_template_loop_add_to_cart();
		}
		?>
	</div>
</article>
