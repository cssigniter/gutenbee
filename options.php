<?php
// TODO Refactor?
add_action('admin_menu', 'gutenbee_settings_create_menu');

function gutenbee_settings_create_menu() {
	add_menu_page(
		'GutenBee Settings',
		'GutenBee',
		'administrator',
		__FILE__,
		'gutenbee_settings_page'
		// plugins_url('/images/icon.png', __FILE__)
	);

	add_action('admin_init', 'gutenbee_register_settings');
}

function gutenbee_register_settings() {
	register_setting('gutenbee-settings-group', 'google_maps_api_key');
}

function gutenbee_settings_page() {
	?>
	<div class="wrap">
		<h2>GutenBee Settings</h2>

		<form method="post" action="options.php">
			<?php settings_fields('gutenbee-settings-group'); ?>
			<?php do_settings_sections('gutenbee-settings-group'); ?>

			<table class="form-table">
				<tr valign="top">
					<th scope="row">
						<label for="google_maps_api_key">Google Maps API Key</label>
					</th>
					<td>
						<input
							type="text"
							id="google_maps_api_key"
							name="google_maps_api_key"
							value="<?php echo esc_attr(get_option('google_maps_api_key')); ?>"
						/>
					</td>
				</tr>
			</table>

			<?php submit_button(); ?>
		</form>
	</div>
<?php } ?>
