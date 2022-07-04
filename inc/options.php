<?php
	class Gutenbee_Settings {
		protected $settings = false;
		protected $general_settings = false;

		public function __construct() {
			add_action( 'init', array( $this, 'init' ) );

			add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
			add_action( 'admin_init', array( $this, 'settings_init' ) );
			add_action( 'admin_head', array( $this, 'create_high_contrast_styles' ) );
			add_action( 'admin_head', array( $this, 'create_editor_width_styles' ) );
		}

		public function init() {
			// Don't use gutenbee_get_settings() here, as any extra/dynamically added (via filter) settings will end up
			// getting stored into the option array. See self::settings_sanitize().

			$this->settings = get_option( 'gutenbee_settings' );
			$this->settings = gutenbee_validate_settings( $this->settings );

			$this->general_settings = get_option( 'gutenbee_general_settings' );
			$this->general_settings = gutenbee_validate_settings( $this->general_settings );
		}

		public function add_admin_menu() {
			add_submenu_page( 'options-general.php', esc_html__( 'GutenBee', 'gutenbee' ), esc_html__( 'GutenBee Settings', 'gutenbee' ), 'manage_options', 'gutenbee', array( $this, 'options_page' ) );
		}

		public function settings_sanitize( $settings ) {
			$new_settings = $this->settings;

			$new_settings['active_google-maps']  = $settings['active_google-maps'];
			$new_settings['google_maps_api_key'] = isset( $settings['google_maps_api_key'] ) ? sanitize_text_field( $settings['google_maps_api_key'] ) : '';
			foreach ( gutenbee_get_setting_block_names() as $id => $name ) {
				$new_settings[ 'active_' . $id ] = isset( $settings[ 'active_' . $id ] ) && 1 === intval( $settings[ 'active_' . $id ] );
			}

			return $new_settings;
		}

		public function general_settings_sanitize( $settings ) {
			$new_settings = array();

			$new_settings['active_high-contrast']      = isset( $settings['active_high-contrast'] ) && 1 === intval( $settings['active_high-contrast'] );
			$new_settings['high-contrast-color']       = isset( $settings['high-contrast-color'] ) ? sanitize_hex_color( $settings['high-contrast-color'] ) : '';
			$new_settings['active_editor-width']       = isset( $settings['active_editor-width'] ) && 1 === intval( $settings['active_editor-width'] );
			$new_settings['editor-width-value']        = isset( $settings['editor-width-value'] ) ? intval( $settings['editor-width-value'] ) : 680;
			$new_settings['active_animation-controls'] = isset( $settings['active_animation-controls'] ) && 1 === intval( $settings['active_animation-controls'] );

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

			register_setting( 'gutenbee_general', 'gutenbee_general_settings', array( $this, 'general_settings_sanitize' ) );

			add_settings_section(
				'gutenbee_general_settings_section',
				__( 'GutenBee General Options', 'gutenbee' ),
				array( $this, 'general_settings_section_callback' ),
				'gutenbee_general_settings'
			);

			$simple_block_settings = gutenbee_get_setting_block_names();

			// All block checkboxes
			foreach ( $simple_block_settings as $key => $label ) {
				add_settings_field(
					'active_' . $key,
					$label,
					array( $this, 'checkbox_render' ),
					'gutenbee',
					'gutenbee_settings_section',
					array(
						'id'        => 'active_' . $key,
						'label_for' => 'active_' . $key,
					)
				);
			}

			// Google Maps Options
			add_settings_field(
				'active_google-maps',
				__( 'Google Maps Block', 'gutenbee' ),
				array( $this, 'checkbox_render' ),
				'gutenbee',
				'gutenbee_settings_section',
				array( 'id' => 'active_google-maps' )
			);

			add_settings_field(
				'google_maps_api_key',
				__( 'Google Maps API Key', 'gutenbee' ),
				array( $this, 'api_maps_render' ),
				'gutenbee',
				'gutenbee_settings_section'
			);

			add_settings_field(
				'active_high-contrast',
				__( 'Enable high contrast styles', 'gutenbee' ),
				array( $this, 'general_checkbox_render' ),
				'gutenbee_general_settings',
				'gutenbee_general_settings_section',
				array(
					'id'        => 'active_high-contrast',
					'label_for' => 'active_high-contrast',
				)
			);

			add_settings_field(
				'high-contrast-color',
				__( 'High contrast color', 'gutenbee' ),
				array( $this, 'color_input_render' ),
				'gutenbee_general_settings',
				'gutenbee_general_settings_section',
				array( 'id' => 'high-contrast-color' )
			);

			add_settings_field(
				'active_editor-width',
				__( 'Enable custom editor width', 'gutenbee' ),
				array( $this, 'general_checkbox_render' ),
				'gutenbee_general_settings',
				'gutenbee_general_settings_section',
				array(
					'id'        => 'active_editor-width',
					'label_for' => 'active_editor-width',
				)
			);

			add_settings_field(
				'editor-width-value',
				__( 'Editor width (in px)', 'gutenbee' ),
				array( $this, 'width_input_render' ),
				'gutenbee_general_settings',
				'gutenbee_general_settings_section',
				array( 'id' => 'editor-width-value' )
			);

			add_settings_field(
				'active_animation-controls',
				__( 'Enable block animation controls', 'gutenbee' ),
				array( $this, 'general_checkbox_render' ),
				'gutenbee_general_settings',
				'gutenbee_general_settings_section',
				array(
					'id'        => 'active_animation-controls',
					'label_for' => 'active_animation-controls',
				)
			);
		}

		public function settings_section_callback() {
			echo '<p>' . esc_html__( 'Use the checkboxes below to enable or disable your new blocks.', 'gutenbee' ) . '</p>';
		}

		public function general_settings_section_callback() {
			echo '<p>' . esc_html__( 'General plugin configuration.', 'gutenbee' ) . '</p>';
		}

		public function checkbox_render( $args ) {
			$id = $args['id'];
			?>
			<input
				id="<?php echo esc_attr( $id ); ?>"
				type="checkbox"
				name="gutenbee_settings[<?php echo esc_attr( $id ); ?>]"
				<?php checked( $this->settings[ $id ] ); ?>
				value="1"
			>
			<?php
		}

		public function color_input_render( $args ) {
			$id = $args['id'];
			?>
			<input
				id="gutenbee_general_settings-<?php echo esc_attr( $id ); ?>"
				type="text"
				name="gutenbee_general_settings[<?php echo esc_attr( $id ); ?>]"
				value="<?php echo esc_attr( $this->general_settings[ $id ] ); ?>"
			>
			<?php
		}

		public function width_input_render( $args ) {
			$id = $args['id'];
			?>
			<input
				id="gutenbee_general_settings-<?php echo esc_attr( $id ); ?>"
				type="number"
				name="gutenbee_general_settings[<?php echo esc_attr( $id ); ?>]"
				value="<?php echo esc_attr( $this->general_settings[ $id ] ); ?>"
			>
			<?php
		}

		public function general_checkbox_render( $args ) {
			$id = $args['id'];
			?>
			<input
				id="<?php echo esc_attr( $id ); ?>"
				type="checkbox"
				name="gutenbee_general_settings[<?php echo esc_attr( $id ); ?>]"
				<?php checked( $this->general_settings[ $id ] ); ?>
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
			$active_tab = isset( $_GET['tab'] ) ? $_GET['tab'] : 'general_options';
			?>
			<div class="wrap">
				<div class="gutenbee-settings-container">
					<div class="gutenbee-settings-content">

						<h2 class="nav-tab-wrapper">
							<a href="?page=gutenbee&tab=general_options" class="nav-tab <?php echo esc_attr( $active_tab === 'general_options' ? 'nav-tab-active' : '' ); ?>"><?php esc_html_e( 'General Options', 'gutenbee' ); ?></a>
							<a href="?page=gutenbee&tab=settings_section" class="nav-tab <?php echo esc_attr( $active_tab === 'settings_section' ? 'nav-tab-active' : '' ); ?>"><?php esc_html_e( 'Block Options', 'gutenbee' ); ?></a>
						</h2>
						<form action="options.php" method="post" class="gutenbee-settings-form">
							<?php
								if ( 'general_options' === $active_tab ) {
									settings_fields( 'gutenbee_general' );
									do_settings_sections( 'gutenbee_general_settings' );
								}

								if ( 'settings_section' === $active_tab ) {
									settings_fields( 'gutenbee' );
									do_settings_sections( 'gutenbee' );
								}

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

		public function create_high_contrast_styles() {
			$screen = get_current_screen();
			if ( ! $this->general_settings['active_high-contrast'] || ! $screen->is_block_editor ) {
				return;
			}

			echo '<style>
				.block-editor-button-block-appender {
					-webkit-box-shadow: inset 0 0 0 1px ' . $this->general_settings['high-contrast-color'] . ';
					box-shadow: inset 0 0 0 1px ' . $this->general_settings['high-contrast-color'] . ';
				}

				.block-editor-button-block-appender svg {
					fill: ' . $this->general_settings['high-contrast-color'] . ';
				}

				.block-editor-block-list__block-popover-inserter .block-editor-inserter__toggle.components-button.has-icon, .block-editor-block-list__empty-block-inserter .block-editor-inserter__toggle.components-button.has-icon, .block-editor-block-list__insertion-point-inserter .block-editor-inserter__toggle.components-button.has-icon, .block-editor-default-block-appender .block-editor-inserter__toggle.components-button.has-icon {
					background-color: ' . $this->general_settings['high-contrast-color'] . ';
				}
			</style>';
		}

		public function create_editor_width_styles() {
			$screen = get_current_screen();
			if ( ! $this->general_settings['active_editor-width'] || ! $screen->is_block_editor ) {
				return;
			}

			$custom_width = $this->general_settings['editor-width-value'];
			echo '<style id="gb-ew">
				div.editor-styles-wrapper .wp-block,
				div.editor-styles-wrapper [data-type="gutenbee/container"][data-theme-grid] > .wp-block-gutenbee-container  > .wp-block-gutenbee-container-inner,
				div.editor-styles-wrapper [data-type="gutenbee/container"][data-theme-grid] > .wp-block > .wp-block-gutenbee-container > .wp-block-gutenbee-container-inner {
					max-width: ' . $custom_width . 'px;
				}

				div.editor-styles-wrapper [data-type="gutenbee/container"][data-theme-grid][data-align="full"] > .wp-block > .wp-block-gutenbee-container > .wp-block-gutenbee-container-inner {
					max-width: ' . ($custom_width + 30) . 'px;
				}
			</style>';
		}

	}

	new Gutenbee_Settings();
