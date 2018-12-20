<?php
	class Gutenbee_Settings {
		protected $settings = false;

		public function __construct() {
			add_action( 'init', array( $this, 'init' ) );

			add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
			add_action( 'admin_init', array( $this, 'settings_init' ) );
		}

		public function init() {
			$this->settings = get_option( 'gutenbee_settings' );
			$this->settings = gutenbee_validate_settings( $this->settings );
		}

		public function add_admin_menu() {
			add_submenu_page( 'options-general.php', esc_html__( 'GutenBee', 'gutenbee' ), esc_html__( 'GutenBee Settings', 'gutenbee' ), 'manage_options', 'gutenbee', array( $this, 'options_page' ) );
		}

		public function settings_sanitize( $settings ) {
			$new_settings = $this->settings;

			$new_settings['active_google-maps']  = isset( $settings['active_google-maps'] ) && 1 === intval( $settings['active_google-maps'] );
			$new_settings['google_maps_api_key'] = isset( $settings['google_maps_api_key'] ) ? sanitize_text_field( $settings['google_maps_api_key'] ) : '';
			foreach ( gutenbee_get_setting_block_names() as $id => $name ) {
				$new_settings[ 'active_' . $id ] = isset( $settings[ 'active_' . $id ] ) && 1 === intval( $settings[ 'active_' . $id ] );
			}

			return $new_settings;
		}

		public function settings_init() {
			register_setting( 'gutenbee', 'gutenbee_settings', array( $this, 'settings_sanitize' ) );

			add_settings_section(
				'gutenbee_settings_section',
				__( 'GutenBee Settings', 'gutenbee' ),
				array( $this, 'settings_section_callback' ),
				'gutenbee'
			);

			$simple_block_settings = gutenbee_get_setting_block_names();

			// All checkboxes
			foreach ( $simple_block_settings as $key => $label ) {
				add_settings_field(
					'active_' . $key,
					$label,
					array( $this, 'checkbox_render' ),
					'gutenbee',
					'gutenbee_settings_section',
					array( 'id' => $key )
				);
			}

			// Google Maps Options
			add_settings_field(
				'active_google-maps',
				__( 'Google Maps Block', 'gutenbee' ),
				array( $this, 'checkbox_render' ),
				'gutenbee',
				'gutenbee_settings_section',
				array( 'id' => 'google-maps' )
			);

			add_settings_field(
				'google_maps_api_key',
				__( 'Google Maps API Key', 'gutenbee' ),
				array( $this, 'api_maps_render' ),
				'gutenbee',
				'gutenbee_settings_section'
			);
		}

		public function settings_section_callback() {
			echo '<p>' . esc_html__( 'Use the checkboxes below to enable or disable your new blocks.', 'gutenbee' ) . '</p>';
		}

		public function checkbox_render( $args ) {
			$id = $args['id'];
			?>
			<input
				type="checkbox"
				name="gutenbee_settings[active_<?php echo esc_attr( $id ); ?>]"
				<?php checked( $this->settings[ 'active_' . $id ] ); ?>
				value="1"
			>
			<?php
		}

		public function api_maps_render() {
			?>
			<p style="margin-bottom: 10px;">
				<?php
					/* translators: %s is a URL. */
					echo wp_kses( sprintf( __( 'Paste your Google Maps API Key below. This is <strong>required</strong> in order to get the Google maps block working. For info on how to get an API key read <a href="%s" target="_blank">this article</a>.', 'gutenbee' ), 'https://www.cssigniter.com/kb/generate-a-google-maps-api-key/' ), array(
						'strong' => array(),
						'a'      => array(
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
				value="<?php echo esc_attr( $this->settings['google_maps_api_key'] ); ?>"
			>
			<?php
		}

		public function options_page() {
			?>
			<div class="wrap">
				<div class="gutenbee-settings-container">
					<div class="gutenbee-settings-content">
						<form action="options.php" method="post" class="gutenbee-settings-form">
							<?php
								settings_fields( 'gutenbee' );
								do_settings_sections( 'gutenbee' );
								submit_button();
							?>
						</form>
					</div>

					<div class="gutenbee-settings-sidebar">
						<a href="https://www.cssigniter.com/docs/gutenbee/"><img
								src="<?php echo esc_url( GUTENBEE_PLUGIN_DIR_URL . 'assets/images/gutenbee-docs.jpg' ); ?>"
								class="gutenbee-banner"/></a>
						<a href="https://www.cssigniter.com/"><img
								src="<?php echo esc_url( GUTENBEE_PLUGIN_DIR_URL . 'assets/images/gutenbee-cssigniter-banner.jpg' ); ?>"
								class="gutenbee-banner"/></a>
					</div>
				</div>
			</div>
			<?php
		}
	}

	new Gutenbee_Settings();
