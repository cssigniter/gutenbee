<?php
	class Gutenbee_Settings {
		public function __construct() {
			add_action( 'admin_menu', [ $this, 'add_admin_menu' ], 502 );
			add_action( 'admin_init', [ $this, 'settings_init' ]);
		}

		function add_admin_menu() {
			add_submenu_page( 'options-general.php', 'GutenBee', __( 'GutenBee Settings', 'gutenbee' ), 'manage_options', 'gutenbee', [
					$this,
					'options_page'
				] );
		}

		function settings_init() {
			//TODO add sanitize_callback
			$args = array();
			register_setting( 'gutenbee', 'gutenbee_settings', $args );

			add_settings_section(
				'gutenbee_settings_section',
				__( 'GutenBee Settings', 'gutenbee' ),
				[ $this, 'settings_section_callback' ],
				'gutenbee'
			);

			// Setting keys here for each block MUST be the same slugs
			// used in the block's registration definition (check each block's
			// index.js file, after `gutenbee/XYZ`, XYZ is the block's key).
			$simple_block_settings = array(
				'divider' => __('Divider Block', 'gutenbee'),
				'slideshow' => __('Slideshow Block', 'gutenbee'),
				'icon' => __('Icon Block', 'gutenbee'),
				'iconbox' => __('Icon Box Block', 'gutenbee'),
				'imagebox' => __('Image Box Block', 'gutenbee'),
				'countup' => __('Countup Block', 'gutenbee'),
				'justified-gallery' => __('Justified Gallery Block', 'gutenbee'),
				'progress-bar' => __('Progress Bar Block', 'gutenbee'),
				'image-comparison' => __('Image Comparison Block', 'gutenbee'),
				'countdown' =>  __('Countdown Block', 'gutenbee'),
				'accordion' => __('Accordion Block', 'gutenbee'),
				'tabs' => __('Tabs Block', 'gutenbee'),
			);

			// All checkboxes
			foreach ( $simple_block_settings as $key => $label ) {
				add_settings_field(
					'active_' . $key,
					$label,
					[ $this, 'checkbox_render' ],
					'gutenbee',
					'gutenbee_settings_section',
					array( 'id' => $key )
				);
			}

			// Google Maps Options
			add_settings_field(
				'active_google-maps',
				__( 'Google Maps Block', 'gutenbee' ),
				[ $this, 'checkbox_render' ],
				'gutenbee',
				'gutenbee_settings_section',
				array( 'id' => 'google-maps' )
			);

			add_settings_field(
				'google_maps_api_key',
				__( 'Google Maps API Key', 'gutenbee' ),
				[ $this, 'api_maps_render' ],
				'gutenbee',
				'gutenbee_settings_section'
			);
		}

		function settings_section_callback() {
			echo '<p>' . esc_html_e( 'Use the checkboxes below to enable or disable your new blocks.', 'gutenbee' ) . '</p>';
		}

		function checkbox_render( $args ) {
			// TODO Sanitize
			$options = get_option( 'gutenbee_settings' );
			$id = $args['id'];
			?>
			<input
				type="checkbox"
				name="gutenbee_settings[active_<?php echo esc_attr( $id ); ?>]"
				<?php checked( $options[ 'active_' . $id] ); ?>
				value="1"
			>
			<?php
		}

		function api_maps_render() {
			$options = get_option( 'gutenbee_settings' );
			$api_key = $options['google_maps_api_key'];
			?>
			<p style="margin-bottom: 10px;">
				<?php
					/* translators: %s is a URL. */
					echo wp_kses( sprintf( __( 'Paste your Google Maps API Key below. This is <strong>required</strong> in order to get the Google maps block working. For info on how to get an API key read <a href="%s" target="_blank">this article</a>.', 'gutenberg' ), 'https://www.cssigniter.com/kb/generate-a-google-maps-api-key/' ), array(
						'strong' => array(),
						'a' => array(
							'href'   => true,
							'target' => true,
						),
					) );
				?>
			</p>
			<input
				type="text"
				style="min-width: 350px;"
				name="gutenbee_settings[google_maps_api_key]"
				value="<?php echo esc_attr( $api_key ); ?>"
			>
			<?php
		}

		function options_page() {
			?>
			<div class="wrap">
				<div class="gutenbee-settings-container">
					<div class="gutenbee-settings-content">
						<form action="options.php" method="post" class="gutenbee-settings-form">
							<?php
								settings_errors();
								settings_fields( 'gutenbee' );
								do_settings_sections( 'gutenbee' );
								submit_button();
							?>
						</form>
					</div>

					<div class="gutenbee-settings-sidebar">
						<a href="https://www.cssigniter.com/"><img
								src="<?php echo esc_url( GUTENBEE_PLUGIN_DIR_URL . 'assets/images/gutenbee-cssigniter-banner.jpg' ); ?>"
								class="gutenbee-settings-banner"/></a>
					</div>
				</div>
			</div>
			<?php
		}
	}

	new Gutenbee_Settings();
