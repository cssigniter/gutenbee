<?php
/** @var array $args */
$image_size             = ! empty( $args['image-size'] ) ? $args['image-size'] : 'post-thumbnail';
$read_more_button_label = ! empty( $args['read-more-button-label'] ) ? $args['read-more-button-label'] : __( 'Read More', 'gutenbee' );
?>
<article
	id="gutenbee-post-types-<?php the_ID(); ?>"
	<?php post_class( 'gutenbee-post-types-item' ); ?>
>
	<?php if ( has_post_thumbnail() ) : ?>
		<figure class="gutenbee-post-types-item-thumb">
			<a href="<?php the_permalink(); ?>">
				<?php the_post_thumbnail( $image_size  ); ?>
			</a>
		</figure>
	<?php endif; ?>

	<div class="gutenbee-post-types-item-content">
		<h3 class="gutenbee-post-types-item-title">
			<a href="<?php the_permalink(); ?>">
				<?php the_title(); ?>
			</a>
		</h3>

		<?php if ( get_post_type() === 'post' ) : ?>
			<div class="gutenbee-post-types-item-meta">
				<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
					<?php echo get_the_date(); ?>
				</time>
			</div>

			<div class="gutenbee-post-types-item-excerpt">
				<?php the_excerpt(); ?>
			</div>
		<?php endif; ?>

		<a href="<?php the_permalink(); ?>" class="gutenbee-post-types-item-more">
			<?php echo esc_html( $read_more_button_label ); ?>
		</a>
	</div>
</article>
