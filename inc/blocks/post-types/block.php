<?php
	/**
	 * Custom Post Type dynamic block
	 */

	add_filter( 'gutenbee_settings', 'gutenbee_block_post_types_filter_gutenbee_settings' );
	function gutenbee_block_post_types_filter_gutenbee_settings( $settings ) {
		$settings['post_type_columns'] = gutenbee_block_post_types_get_post_types_columns();

		return $settings;
	}

	function gutenbee_block_post_types_get_post_types_columns() {
		$post_types = get_post_types( array(
			'public' => true,
		) );

		$min = apply_filters( 'gutenbee_block_post_types_post_types_columns_default_min', 1 );
		$max = apply_filters( 'gutenbee_block_post_types_post_types_columns_default_max', 4 );

		$pt_cols = array();
		foreach ( $post_types as $post_type ) {
			$pt_cols[ $post_type ] = array(
				'min' => $min,
				'max' => $max,
			);
		}

		return apply_filters( 'gutenbee_block_post_types_post_types_columns', $pt_cols );
	}

	function gutenbee_block_post_types_get_theme_support_defaults() {
		return array(
			'gridEffect'      => false,
			'masonry'         => false,
			'categoryFilters' => false,
			'selectImageSize' => array(),
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
				'uniqueId'           => array(
					'type'    => 'string',
					'default' => '',
				),
				'postType'               => array(
					'type'    => 'string',
					'default' => 'post',
				),
				'taxonomySlug'           => array(
					'type'    => 'string',
					'default' => '',
				),
				'termId'                 => array(
					'type'    => 'string',
					'default' => '',
				),
				'authorId'               => array(
					'type'    => 'string',
					'default' => '',
				),
				'postsPerPage'           => array(
					'type'    => 'number',
					'default' => 3,
				),
				'pagination'             => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'paginationType'             => array(
					'type'    => 'string',
					'default' => 'normal',
				),
				'offset'                 => array(
					'type'    => 'number',
					'default' => 0,
				),
				'orderBy'                => array(
					'type'    => 'string',
					'default' => '',
				),
				'order'                  => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'postTagSlugs'           => array(
					'type'    => 'array',
					'items'   => array(
						'type' => 'string',
					),
					'default' => array(),
				),
				'ignitionEventQueryType' => array(
					'type'    => 'string',
					'default' => '',
				),
				'excludedPostIds'        => array(
					'type'    => 'array',
					'items'   => array(
						'type' => 'number',
					),
					'default' => array(),
				),
				'includedPostIds'        => array(
					'type'    => 'array',
					'items'   => array(
						'type' => 'number',
					),
					'default' => array(),
				),
				'columns'                => array(
					'type'    => 'number',
					'default' => 3,
				),
				'gridEffect'             => array(
					'type'    => 'string',
					'default' => 'none',
				),
				'gridSpacing'            => array(
					'type'    => 'string',
					'default' => 'gutters',
				),
				'masonry'                => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'categoryFilters'        => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'className'              => array(
					'type'    => 'string',
					'default' => '',
				),
				'imageSizeSlug'          => array(
					'type'    => 'string',
					'default' => '',
				),
				'readMoreButtonLabel'    => array(
					'type'    => 'string',
					'default' => '',
				),
				'animation'              => array(
					'type'    => 'object',
					'default' => array(
						'type'        => '',
						'duration'    => '',
						'delay'       => '',
						'easing'      => '',
						'threshold'   => '',
						'repeat'      => false,
						'desktopOnly' => null,
					),
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

	function gutenbee_block_post_types_get_load_more_button () {
		?>
		<div class="navigation wp-block-gutenbee-post-types-navigation-load-more">
			<button class="btn wp-block-gutenbee-post-types-load-more-button"><?php esc_html_e( 'Load More', 'gutenbee'); ?></button>
		</div>
		<?php
	}

	function gutenbee_block_post_types_get_animation_control_data_attributes ( $animation ) {
		if ( empty( $animation['type'] ) ) {
			return '';
		}

		$block_animation_data_attributes = array_merge( array(
			'data-sal'              => $animation['type'],
			'data-sal-delay'        => ! empty( $animation['delay'] ) ? $animation['delay'] * 1000 : 50,
			'data-sal-duration'     => ! empty( $animation['duration'] ) ? $animation['duration'] * 1000 : 700,
			'data-sal-easing'       => ! empty( $animation['easing'] ) ? $animation['easing'] : 'ease-in-out',
			'data-sal-threshold'    => ! empty( $animation['threshold'] ) ? $animation['threshold'] / 100 : '',
			'data-sal-repeat'       => ! empty( $animation['repeat'] ) ? $animation['repeat'] : null, // Don't output anything if false.
			'data-sal-desktop-only' => ! empty( $animation['desktopOnly'] ) ? $animation['desktopOnly'] : null, // Don't output anything if false.
		) );

		$data = '';

		foreach ( $block_animation_data_attributes as $attribute => $value ) {
			if ( null === $value ) {
				continue;
			}

			$data .= sprintf( '%s="%s" ', sanitize_key( $attribute ), esc_attr( $value ) );
		}

		return $data;
	}

	/**
	 * Renders the CPT block in the editor and on the front end.
	 *
	 * @param {Array} $attributes The block's attributes.
	 *
	 * @return string
	 */
	function gutenbee_block_post_types_render_callback( $attributes ) {
		$unique_id                 = $attributes['uniqueId'];
		$post_type                 = $attributes['postType'];
		$posts_per_page            = $attributes['postsPerPage'];
		$pagination                = (bool) $attributes['pagination'];
		$pagination_type           = $attributes['paginationType'];
		$offset                    = $attributes['offset'];
		$order                     = $attributes['order'];
		$order_by                  = $attributes['orderBy'];
		$post_tag_slugs            = $attributes['postTagSlugs'];
		$ignition_event_query_type = $attributes['ignitionEventQueryType'];
		$excluded_post_ids         = $attributes['excludedPostIds'];
		$included_post_ids         = $attributes['includedPostIds'];
		$author_id                 = intval( $attributes['authorId'] );
		$taxonomy_slug             = $attributes['taxonomySlug'];
		$term_id                   = intval( $attributes['termId'] );
		$columns                   = intval( $attributes['columns'] );
		$grid_spacing              = $attributes['gridSpacing'];
		$image_size_slug           = $attributes['imageSizeSlug'];
		$read_more_button_label    = $attributes['readMoreButtonLabel'];
		$animation                 = $attributes['animation'];

		$masonry          = (bool) $attributes['masonry'];
		$grid_effect      = $attributes['gridEffect'];
		$category_filters = (bool) $attributes['categoryFilters'];
		$class_name       = $attributes['className'];

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
			$args['gb_pt_offset'] = $offset;
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

		if ( ! empty( $post_tag_slugs ) && is_array( $post_tag_slugs ) ) {
			$tax_query_args[] = array(
				'taxonomy' => 'post_tag',
				'field'    => 'slug',
				'terms'    => $post_tag_slugs,
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

		if ( 'ignition-event' === $post_type ) {
			// Provide context to the query.
			$query_args['ignition_event_query'] = $ignition_event_query_type;
		}


		$q = new WP_Query( $query_args );

		$block_id = 'block-' . $unique_id;

		$block_classes = array_merge( array(
			'wp-block-gutenbee-post-types',
			$block_id,
		), explode( ' ', $class_name ) );

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

		$item_template_vars = array(
			'columns'    => $columns,
			'classes'    => array_filter( array_map( 'trim', explode( ' ', $class_name ) ) ),
			'image-size' => false, // Don't force a default image size. Let templates decide for themselves.
		);

		$available_image_sizes = array_merge( array( 'full' ), get_intermediate_image_sizes() );
		if ( ! empty( $image_size_slug ) && in_array( $image_size_slug, $available_image_sizes, true ) ) {
			$item_template_vars['image-size'] = $image_size_slug;
		}

		if ( ! empty( $read_more_button_label ) ) {
			$item_template_vars['read-more-button-label'] = $read_more_button_label;
		}

		if ( $q->have_posts() ) {
			ob_start();

			?><div
				id="<?php echo esc_attr( $block_id ); ?>"
				class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>"
				<?php echo gutenbee_block_post_types_get_animation_control_data_attributes( $animation ); ?>
			><?php

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

				$classes[] = gutenbee_get_columns_classes( $columns, $attributes );

				?>
				<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>"><?php

				if ( 1 === $columns ) {
					gutenbee_get_template_part( 'post-types', 'article-media', get_post_type(), $item_template_vars );
				} else {
					if ( $masonry ) {
						gutenbee_get_template_part( 'post-types', 'article-default-tall', get_post_type(), $item_template_vars );
					} else {
						gutenbee_get_template_part( 'post-types', 'article-default', get_post_type(), $item_template_vars );
					}
				}

				?></div><?php

			}

			?></div><?php

			wp_reset_postdata();

			if ( $pagination && ! $category_filters ) {
				global $wp_query;

				$old_wp_query     = $wp_query;
				$wp_query         = $q;
				$pagination_class = $pagination_type === 'load_more' ? 'wp-block-gutenbee-post-types-nav-load-more' : '';

				the_posts_pagination( array( 'class' => $pagination_class ) );

				if ( $pagination_type === 'load_more' ) {
					gutenbee_block_post_types_get_load_more_button();
				}

				$wp_query = $old_wp_query;
			}

			?></div><?php

			$response = ob_get_clean();

		} else {
			$response = __( 'No posts found.', 'gutenbee' );
		}

		return $response;
	}

	add_action( 'pre_get_posts', 'gutenbee_block_post_types_pre_get_posts_offset' );
	/**
	 * Fixes the query with the correct offset parameter, when used in combination with pagination.
	 *
	 * Looks for and uses the custom query variable 'gb_pt_offset'.
	 *
	 * @link https://codex.wordpress.org/Making_Custom_Queries_using_Offset_and_Pagination
	 *
	 * @since 2.6.2
	 *
	 * @param WP_Query $query
	 */
	function gutenbee_block_post_types_pre_get_posts_offset( $query ) {
		if ( isset( $query->query_vars['gb_pt_offset'] ) ) {
			// First, define your desired offset...
			$offset = $query->query_vars['gb_pt_offset'];

			// Next, determine how many posts per page you want (we'll use WordPress's settings)
			$ppp = isset( $query->query_vars['posts_per_page'] ) ? $query->query_vars['posts_per_page'] : get_option( 'posts_per_page' );

			// Next, detect and handle pagination...
			if ( $query->is_paged ) {

				// Manually determine page query offset (offset + current page (minus one) x posts per page)
				$page_offset = $offset + ( ( $query->query_vars['paged'] - 1 ) * $ppp );

				// Apply adjust page offset
				$query->set( 'offset', $page_offset );

			} else {
				// This is the first page. Just use the offset...
				$query->set( 'offset', $offset );

			}
		}
	}

	add_filter( 'found_posts', 'gutenbee_block_post_types_found_posts_offset', 10, 2 );
	/**
	 * Fixes the found_posts value when offset is used in combination with pagination.
	 *
	 * Looks for and uses the custom query variable 'gb_pt_offset'.
	 *
	 * @link https://codex.wordpress.org/Making_Custom_Queries_using_Offset_and_Pagination
	 *
	 * @since 2.6.2
	 *
	 * @param int      $found_posts
	 * @param WP_Query $query
	 *
	 * @return int
	 */
	function gutenbee_block_post_types_found_posts_offset( $found_posts, $query ) {
		if ( isset( $query->query_vars['gb_pt_offset'] ) ) {
			$offset = $query->query_vars['gb_pt_offset'];

			return $found_posts - $offset;
		}

		return $found_posts;
	}
