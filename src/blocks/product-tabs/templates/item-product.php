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
		if ( $show_cat && $term_id ) {
			?>
			<a href="<?php echo esc_url_raw( get_term_link( $term_id, 'product_cat' ) ); ?>" class="product-category-title"><?php echo get_term( (int) $term_id )->name; ?></a>
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
