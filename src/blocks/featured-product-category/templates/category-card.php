<?php
$selected_term      = $args['selected-term'];
$selected_term_meta = $args['selected-term-meta'];
$category_image     = ! empty( $args['image'] ) ? $args['image']['id'] : $selected_term_meta['thumbnail_id'][0];
$category_title     = ! empty( $args['title'] ) ? $args['title'] : $selected_term->name;
$category_desc      = ! empty( $args['description'] ) ? $args['description'] : $selected_term->description;
$button_text        = ! empty( $args['button-text'] ) ? $args['button-text'] : __( 'Shop', 'gutenbee' ) . ' ' . $selected_term->name;
$content_position   = $args['content-position'];
?>
<div
	class="wp-block-gutenbee-featured-product-category__card"
>
	<div class="wp-block-gutenbee-featured-product-category__card-background">
		<img src="<?php echo esc_url_raw( wp_get_attachment_image_url( (int) $category_image, 'full' ) ); ?>" alt="">
	</div>
	<div class="wp-block-gutenbee-featured-product-category__card-content card-content-align-<?php echo esc_attr( $content_position ); ?>">
		<h2><a href="<?php echo esc_url_raw( get_term_link( $selected_term ) ); ?>"><?php echo esc_html( $category_title ); ?></a></h2>
		<?php if ( $category_desc ) : ?>
		<p>
			<?php echo wp_kses_post( $category_desc ); ?>
		</p>
		<?php endif; ?>
		<a href="<?php echo esc_url_raw( get_term_link( $selected_term ) ); ?>" class="btn"><?php echo esc_html( $button_text ); ?></a>
	</div>
</div>
