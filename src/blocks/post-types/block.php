<?php
	/**
	 * Custom Post Type dynamic block
	 */


	function gutenbee_block_post_types_get_theme_support_defaults() {
		return array(
			'gridEffect'      => false,
			'masonry'         => false,
			'categoryFilters' => false,
		);
	}
	/**
	 * Returns whether the active theme supports a specific feature.
	 *
	 * @param string $feature The feature name you wish to check support for. Pass an empty string to return an array of all features.
	 *
	 * @return mixed The support state for the passed feature. Array of all features if $feature is empty.
	 */
	function gutenbee_block_post_types_get_theme_support( $feature = '' ) {
		$support = get_theme_support( 'block/gutenbee/post-types' );
		if ( ! is_array( $support ) ) {
			return $support;
		}

		$support = $support[0];

		$support = wp_parse_args( $support, gutenbee_block_post_types_get_theme_support_defaults() );

		if ( empty( $feature ) ) {
			return $support;
		} elseif ( array_key_exists( $feature, $support ) ) {
			return $support[ $feature ];
		}

		return false;
	}

	add_action( 'init', 'gutenbee_block_post_types_init' );
	/**
	 * Initializes the CPT block.
	 */
	function gutenbee_block_post_types_init() {
		register_block_type( 'gutenbee/post-types', array(
			'attributes'      => array(
				'postType'        => array(
					'type'    => 'string',
					'default' => 'post',
				),
				'taxonomySlug'    => array(
					'type'    => 'string',
					'default' => '',
				),
				'termId'          => array(
					'type'    => 'string',
					'default' => '',
				),
				'authorId'        => array(
					'type'    => 'string',
					'default' => '',
				),
				'postsPerPage'    => array(
					'type'    => 'number',
					'default' => 3,
				),
				'pagination'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'offset'          => array(
					'type'    => 'number',
					'default' => 0,
				),
				'orderBy'         => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'order'           => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'excludedPostIds' => array(
					'type'    => 'array',
					'items'   => array(
						'type' => 'number',
					),
					'default' => array(),
				),
				'includedPostIds' => array(
					'type'    => 'array',
					'items'   => array(
						'type' => 'number',
					),
					'default' => array(),
				),
				'columns'         => array(
					'type'    => 'number',
					'default' => 3,
				),
				'gridEffect'      => array(
					'type'    => 'string',
					'default' => 'none',
				),
				'gridSpacing'     => array(
					'type'    => 'string',
					'default' => 'gutters',
				),
				'masonry'         => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'categoryFilters' => array(
					'type'    => 'boolean',
					'default' => false,
				),
			),
			'render_callback' => 'gutenbee_block_post_types_render_callback',
		) );
	}

	function gutenbee_block_post_types_get_category_filters( $args ) {
		$terms = array();
		if ( $args['taxonomy'] ) {
			$terms = get_terms( $args );
		}

		?>
		<div class="ci-item-filters">
			<button class="ci-item-filter filter-active" data-filter="*">
				<?php echo esc_html( _x( 'All', 'all categories', 'gutenbee' ) ); ?>
			</button>

			<?php if ( is_array( $terms ) ) : ?>
				<?php foreach ( $terms as $term ) : ?>
					<button class="ci-item-filter" data-filter=".term-<?php echo esc_attr( $term->term_id ); ?>"><?php echo esc_html( $term->name ); ?></button>
				<?php endforeach; ?>
			<?php endif; ?>
		</div>
		<?php
	}

	/**
	 * Renders the CPT block in the editor and on the front end.
	 *
	 * @param {Array} $attributes The block's attributes.
	 *
	 * @return string
	 */
	function gutenbee_block_post_types_render_callback( $attributes ) {
		$post_type         = $attributes['postType'];
		$posts_per_page    = $attributes['postsPerPage'];
		$pagination        = (bool) $attributes['pagination'];
		$offset            = $attributes['offset'];
		$order             = $attributes['order'];
		$order_by          = $attributes['orderBy'];
		$excluded_post_ids = $attributes['excludedPostIds'];
		$included_post_ids = $attributes['includedPostIds'];
		$author_id         = intval( $attributes['authorId'] );
		$taxonomy_slug     = $attributes['taxonomySlug'];
		$term_id           = intval( $attributes['termId'] );
		$columns           = intval( $attributes['columns'] );
		$grid_spacing      = $attributes['gridSpacing'];

		$masonry          = (bool) $attributes['masonry'];
		$grid_effect      = $attributes['gridEffect'];
		$category_filters = (bool) $attributes['categoryFilters'];


		$post_type_taxonomies = get_object_taxonomies( $post_type, 'objects' );
		if ( $post_type_taxonomies ) {
			$hierarchical_taxonomies = wp_list_filter( $post_type_taxonomies, array( 'hierarchical' => true ) );
			if ( $hierarchical_taxonomies ) {
				$taxonomy      = reset( $hierarchical_taxonomies );
				$taxonomy_slug = $taxonomy->name;
			}
		}

		if ( ! taxonomy_exists( $taxonomy_slug ) ) {
			$taxonomy_slug = false;
		}

		$args = array(
			'post_type'           => $post_type,
			'ignore_sticky_posts' => true,
			'posts_per_page'      => $posts_per_page,
			'order'               => $order,
			'post__not_in'        => $excluded_post_ids,
			'post__in'            => $included_post_ids,
		);

		if ( $offset ) {
			$args['offset'] = $offset;
		}

		if ( $pagination ) {
			$args['paged'] = gutenbee_get_page_var();
		}

		if ( $category_filters ) {
			$args['posts_per_page'] = -1;
			unset( $args['paged'] );
		}

		$tax_query_args = array();

		if ( 'product' === $post_type && taxonomy_exists( 'product_visibility' ) ) {
			$tax_query_args[] = array(
				'taxonomy' => 'product_visibility',
				'field'    => 'slug',
				'terms'    => array( 'exclude-from-catalog' ),
				'operator' => 'NOT IN',
			);
		}

		$get_terms_args = array(
			'hide_empty' => 1,
		);

		if ( $taxonomy_slug ) {
			$get_terms_args['taxonomy'] = $taxonomy_slug;
		}

		if ( $taxonomy_slug && $term_id > 0 ) {
			$tax_query_args[] = array(
				'taxonomy'         => $taxonomy_slug,
				'field'            => 'term_id',
				'terms'            => $term_id,
				'include_children' => true,
			);

			$get_terms_args['child_of'] = $term_id;
		}

		if ( count( $tax_query_args ) > 1 ) {
			$tax_query_args = array_merge( array(
				'relation' => 'AND',
			), $tax_query_args );
		}

		if ( count( $tax_query_args ) >= 1 ) {
			$query_args = array_merge( $args, array(
				'tax_query' => $tax_query_args,
			) );
		} else {
			$query_args = $args;
		}

		if ( $author_id ) {
			$query_args = array_merge( $query_args, array(
				'author' => $author_id,
			) );
		}

		if ( isset( $order_by ) ) {
			$query_args = array_merge( $query_args, array(
				'orderby' => $order_by,
			) );
		}

		$q = new WP_Query( $query_args );

		$container_classes = array(
			'gutenbee-row',
			'gutenbee-row-items',
		);

		if ( $masonry ) {
			$container_classes[] = 'row-isotope';
		}

		if ( $grid_effect && ! in_array( $grid_effect, array( '', 'none' ), true ) ) {
			$container_classes[] = 'row-effect';
			$container_classes[] = "row-effect-{$grid_effect}";
		}

		if ( 'no-gutters' === $grid_spacing ) {
			$container_classes[] = 'no-gutters';
		}

		$container_classes[] = "gutenbee-row-columns-{$columns}";

		$container_classes = apply_filters( 'gutenbee_post_types_container_classes', $container_classes, $attributes );
		$container_classes = array_unique( array_filter( $container_classes ) );

		if ( $q->have_posts() ) {
			ob_start();

			if ( $category_filters ) {
				gutenbee_block_post_types_get_category_filters( $get_terms_args );
			}

			?><div class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>"><?php

			while ( $q->have_posts() ) {
				$q->the_post();

				$classes = array();
				if ( $taxonomy_slug ) {
					$terms    = get_the_terms( get_the_ID(), $taxonomy_slug );
					$terms    = ! empty( $terms ) ? $terms : array();
					$classes  = array_map( 'urldecode', wp_list_pluck( $terms, 'slug' ) );
					$term_ids = wp_list_pluck( $terms, 'term_id' );
					foreach ( $term_ids as $term_id ) {
						$classes[] = 'term-' . $term_id;
					}
				}

				$classes[] = gutenbee_get_columns_classes( $columns );

				?>
				<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>"><?php

				if ( 1 === $columns ) {
					gutenbee_get_template_part( 'post-types', 'article-media', get_post_type() );
				} else {
					if ( $masonry ) {
						gutenbee_get_template_part( 'post-types', 'article-default-tall', get_post_type() );
					} else {
						gutenbee_get_template_part( 'post-types', 'article-default', get_post_type() );
					}
				}

				?></div><?php

			}

			?></div><?php

			wp_reset_postdata();

			if ( $pagination && ! $category_filters ) {
				global $wp_query;

				$old_wp_query = $wp_query;
				$wp_query     = $q;

				the_posts_pagination();

				$wp_query = $old_wp_query;
			}

			$response = ob_get_clean();

		} else {
			$response = __( 'No posts found.', 'gutenbee' );
		}

		return $response;
	}

