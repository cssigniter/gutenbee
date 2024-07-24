=== GutenBee - Gutenberg Blocks ===
Contributors: cssigniterteam, silencerius, nvourva, tsiger, anastis
Tags: gutenberg, blocks
Requires at least: 6.4
Tested up to: 6.6
Stable tag: 2.18.0
License: GPLv2 or later
License URI: http://www.gnu.org/licen2ses/gpl-2.0.html
Requires PHP: 7.0

GutenBee enhances the Gutenberg editor with more blocks!

== Description ==
[GutenBee is a collection of elegant WordPress blocks](https://www.cssigniter.com/plugins/gutenbee/) enhancing your editing experience in the Gutenberg editor and vastly extending the potential of the new editor experience.

Check out [the demo](https://www.cssigniter.com/gutenbee/) now!

The plugin's documentation can be found [here](https://www.cssigniter.com/docs/gutenbee/).

Here's the demo of one of our latest blocks, the Food Menu block

https://www.youtube.com/watch?v=Wv_zwREKi68

**Blocks:**

* **Accordion**: Organize your content into accordion elements. All the content including titles can be edited directly in the WordPress editor and you can choose any color combination from the block’s settings.
* **Banner**: Create beautiful and flexible banners on your site to capture user attention. Supports video backgrounds.
* **Buttons**: Actionable content needs clickable buttons. Add one or more buttons, tweak their colors, borders and alignment and you're all set!
* **Container**: A powerful container block allowing content grouping or splitting in columns, complete with fully responsive settings.
* **Countdown**: Have an upcoming event? Pick a date directly inside the editor screen, choose your layout, colors, and typography and you’re ready!
* **CountUp**: Maybe not every block counts, but this one does! Pick a starting and ending number, add a suffix or prefix, style it and you’re done!
* **Divider**: Provide thematic content spacing with a fancy divider, edit its style, colors, and margins.
* **Food Menu**: Display your dishes and drink offerings in a stylish fashion.
* **Google Maps**: Easy-peasy fancy maps with the Google Maps block. Just enter a location and save, it just works! With support for beautiful predefined map styles and Snazzy custom map styles!
* **Heading**: A normal heading block with responsive settings.
* **Icon**: Display icons from a custom designed, curated list of over one hundred icons, with more icons being added in regular updates!
* **Icon Box**: Your standard icon box block on steroids. Choose from over one hundred custom designed icons, style them any way and at any size you like, add some text and you’re good to go.
* **Icon List**: Create lists with beautiful icons instead of bullets.
* **Image**: A variation of the core Image block with extra responsive spacing and sizing settings.
* **Image Box**: A standard image box with title and text block on steroids. Adjust your spacing, layout, alignment, or colors and typography.
* **Image Comparison**: Need to showcase your photo editing skills or writing up a camera review? With the Image Comparison block you can enhance your posts with side-by-side comparison of any two photos you wish.
* **Justified Gallery**: Create beautiful justified grid layout galleries inside any of your post or pages.
* **Paragraph**: A variation of the core Paragraph block with responsive spacing settings.
* **Progress Bar**: Add stylish progress bars and display either progress or your skillset with the most visually captivating way.
* **Review**: Transform any post into a review. Score items individually, and average them out automatically.
* **Slideshow**: Add a fancy slideshow to your posts or pages. Drag and drop your images, choose your settings and hit publish!
* **Spacer**: Complete control spacing of elements in your posts and pages with the responsive Spacer block.
* **Tabs**: Organize your content into fancy tabs. All the content including titles can be edited directly in the WordPress editor and you can choose any color combination from the block’s settings.
* **Testimonial**: An easy to use block to help you display your testimonials with multiple layouts.
* **Post Types**: List posts from any post type in a configurable grid, complete with fully responsive settings.
* **Video**: Embed a video from your media library or upload a new one.
* **Video Embed**: Embed videos from YouTube or Vimeo and lazy-load theme if you wish to.

**JOIN OUR COMMUNITY**
Join our [Facebook group](https://www.facebook.com/groups/2601788933169108) to discuss new features and stay up to date on our latest releases.

**Contribute**
Visit the [GitHub repository](https://github.com/cssigniter/gutenbee) for full source code and to report any bugs.

== Installation ==
From within WordPress' dashboard:

1. Go to Plugins -> Add New
2. Search for "GutenBee"
3. Click "Install"
4. Click "Activate"
5. New Gutenberg Blocks will appear!

Note that if you want to use the Google Maps block you will also need a Google Maps API Key. Instruction can be found in GutenBee's settings page.

== Screenshots ==
1. GutenBee's fancy new blocks.
2. Display your photos in beautiful slideshows.
3. Create awesome looking justified galleries.
4. Compare any two images.
5. Flexible Google Maps block with custom map styles.
6. Over a hundred icons to choose from with more being added regularly.
7. Tabs or Accordions, group your content the way you want.

== Changelog ==

= 2.18.0 =
* WP 6.6 / React 19 update.
* Added GitHub link.
* Fixed an issue with the column block, sometimes invalidating in WordPress 6.5

= 2.17.4 =
* Fixed an issue where some blocks could not be edited or the editor would not load properly due to lodash's removal from core.
* Fixed an issue where the Icon list item rich text field would not accept input.

= 2.17.3 =
* Enqueueing of Google Maps API key is now filterable via 'gutenbee_enqueue_google_maps_api'

= 2.17.2 =
* Fixed issue where since the iframe-ing of the block editor in WP 6.3, block editor assets would not get enqueued under specific circumstances.
* Block editor assets are now enqueued via the 'enqueue_block_assets' action instead of 'enqueue_block_editor_assets'.

= 2.17.1 =
* Fixed issue where some required files would not be included in the distributed plugin.

= 2.17.0 =
* Button block: The Button’s “outline” predefined template now correctly applies no background.
* Container / Column block: Added option to control the container’s column block height.
* Container / Column block: Fixed overlap in nested layouts.
* Fix layout of some inner blocks when placed inside of the Banner block.
* Food menu block: Minor layout adjustment in price text
* Gallery block: Added ability to display captions on the images.
* Image comparison block: Fix strings to be able to be translated.
* Progress bar block: Added option to control the block’s height.
* Review block: Fix an issue where it would calculate the score incorrectly.
* Review block: Fix performance issues when changing the rating.
* Review block: Fix block from displaying an error in the editor.
* Added WPML support.
* Maintenance tasks.

= 2.16.1 =
* Various spacing fixes in block controls
* Fix spacer appearance in the block editor
* Prevent URL picker from appearing above the media gallery picker

= 2.16.0 =
* Divider block: Fixed an issue where resetting the color would break the block in the editor.
* Container block: Fixed an issue where adding padding to a column would apply it to nested columns.
* All blocks: Added desktop only setting for animations.
* All blocks: Updated animation logic for longer blocks that surpass the animation viewport threshold.
* Accordion block: Allow more accordion and tab items.
* Block attributes are passed to gutenbee_get_columns_classes() for context.

= 2.15.0 =
* All blocks: Added animation controls. Can be disabled via the plugin's options.
* Paragraph block: Add advanced responsive typography controls.
* Heading block: Add advanced responsive typography controls.
* Post type block: Updated deprecated getAuthors to getUsers method.
* Banner block: Fixed background color reset from breaking the block.
* Image block: Don't add the caption by default when selecting an image.

= 2.14.0 =
* All blocks: Update code deprecations for WP 6.0
* Gallery block: Link to the full image URLs when images are linked to media.

= 2.13.1 =
* Image Box block: Fixed max image size on WordPress 6.0
* Post Types block: Fixed max image size on WordPress 6.0
* Post Types block: Fixed box sizing on WordPress 6.0
* Post Types block: Edge case would set maximum number of columns per post type to a wrong number.
* Gallery block: Fixed box sizing on WordPress 6.0
* Google Maps Block: Conditionally load google maps api only if it’s necessary.

= 2.13.0 =
* Divider block: Fix an issue where the divider block would not clear itself in the editor when around floated elements.
* Post Types block: Improve the experience of searching terms and included/excluded posts.
* Food Menu block: Fixed for WP 5.9
* Container block: Added tooltip descriptions on the more complex settings of the Container block.
* Countup Block: Added option to start the countup when the countup is in the viewport.
* Accordion Block: Added plus/minus icons on expand/collapse.
* Banner Block: Added default minimum height of 450px
* Image Box block: Fixed alignment setting.
* Post Types Block: Fixed load more button.
* Adjust text control for WP 5.9
* Fixed color picker for WP 5.9
* Fixed various smaller issues in support of WP 5.9
* Various smaller bugfixes and improvements

= 2.12.5 =
* Post Types Block: Added “gutenbee.posts-loaded” event when posts are finished loading via load more button.

= 2.12.4 =
* Post Types Block: Fix an issue where the post type would not render properly after changing it from the dropdown.
* Post Types Block: Added load more button functionality as a type of pagination.
* Fixed a layout issue with food items in the editor.

= 2.12.3 =
* Fixed an issue where the Post Types block would be limited to 10 post types.

= 2.12.2 =
* Fixed appearance of heading select controls (icons) in the block sidebar.
* Divider and Spacer blocks: Allow for heights less than 10px.

= 2.12.1 =
* Update link controls on all blocks that support them and moved them on the block toolbar.
* Added a way to link padding and margin values together so that they can be changed at the same time with the same value.
* Fix issue with the font size picker on all blocks where the unit selection would not work.
* Fix Food Menu block appearance in the editor.
* Fix heading selection overflowing in the editor.
* Minor style adjustments for WordPress 5.8
* A deprecation warning would be thrown after WP 5.8 (action 'block_categories' renamed to 'block_categories_all').
* The wp-editor script should not be enqueued together with the new block widgets editor in WP 5.8.

= 2.12.0 =
* Added support for showing all/upcoming/past/recurring events from the Ignition Framework.
* Post Types Block: Added custom label for read more buttons.
* Make it easier to search for GutenBee blocks in the inserter (video, video embed, etc).
* Accordion Block: Added hover + active colors for the titles.
* Banner Block: Fix the ability to revert to "auto" height.
* Image Block: Migrate to editor API v2 - Improve editor appearance and UX.
* Image Comparison Block: Start images hidden until the comparison script is ready.
* List Icon Block: Improve horizontal appearance of icons and labels.
* Maps Block: Added the ability for HTML markup in marker info windows.
* Paragraph & Heading Blocks: Fixed an issue where custom classes would not be applied.
* Post Types Block: Improved appearance of one column layout.
* Tabs Block: New hover colors.

= 2.11.1 =
* Updated positioning of the video background spinner on the bottom center of the Container and Banner block.
* Fixed an issue where background overlay would sometimes disappear when a video background started playing in Safari.
* Fixed an issue where self hosted video backgrounds would not start in Firefox.
* Moved video background controls below the background image control (editor).
* Slideshow block: Arrow navigation now uses inline SVGs.
* Updated all "Circle Mask" block styles on Image and Testimonial blocks to "Rounded".


= 2.11.0 =
* Post Type block: Improve performance by creating new searchable controls for Tags and Posts.
* Banner & Container block: Added support for start time in video backgrounds.
* Banner & Container block: Added loading indicator for video backgrounds.
* Fixed an issue where some Range Slider controls would not be reset.
* Improved background video loading.

= 2.10.6 =
* Post Type block: Prevent block style previews from loading complete preview of the block to improve performance.

= 2.10.5 =
* Post Type block: Pass the number of columns and any classes (including block style-sourced ones) down into the item templates.

= 2.10.4 =
* Fixed an infinite loop that was causing the Container block to crash in WP 5.7
* Fixed issue with color pickers where they would open and close immediately in WP 5.7

= 2.10.3 =
* Fixed an issue where custom font sizes would not be applied in the editor for the Paragraph, Heading, Button, and Icon List blocks.
* Fixed deprecations from version 2.6.x on Container, Divider, and Spacer blocks.

= 2.10.2 =
* Added the ability to mark Accordion tabs as default open
* Fixed an issue where a background image would get repeated if you had nested Container blocks.
* Fixed an issue where a background image would get repeated if you had nested Banner blocks.
* Enable anchor on the Spacer block.

= 2.10.1 =
* Fix an issue that prevented JavaScript assets from being minified.
* Updated all instances of window.load to avoid a race condition causing Firefox to not run the scripts occasionally (Banner block / Slideshow block)
* Image block: Removed clearfix styling.
* Banner block: Fixed an issue where the banner's background image would be hidden if it was inside a container with an overlay color.
* Slideshow block: Remove all dependencies on jquery-migrate.

= 2.10.0 =
* Paragraph block's content can now be included in auto-generated excerpts.
* Modernized CSS prefixes.
* Added responsive background image on Container, Column, Banner, Spacer, Divider Blocks.
* Fixed an issue where the responsive controls would not be clickable on dropdown controls (editor).
* Accordion block: Fixed title background application in editor.
* Accordion block: Fixed the title background color application in the editor.
* Banner block: Fixed issue where box shadow would not get applied correctly.
* Banner block: Fixed inset box shadow appearance in the editor.
* Banner block: Fixed application of box shadow and border.
* Banner block: Remove "noreferrer" attribute from link's rel when "new target" setting is enabled.
* Buttons block: Remove "noreferrer" attribute from link's rel when "new target" setting is enabled.
* Container block: Fixed a border radius issue when the block had a background overlay.
* Container block: Fixed issue where box shadow would not get applied correctly if the zoom option was enabled on the background image.
* Container block: Fixed an issue where the border would become clipped by parallax if it was enabled.
* Container block: Fixed application of box shadow and border.
* Container block: The container block's width will now fit any custom editor width.
* Container block: Refactored width edge cases.
* Countdown block: Adjust for the case where the default date was set and the countdown was expired.
* Countdown block: Remove left and right margins from the first and last time element respectively.
* Google Maps block: Fixed an issue with the settings toggle.
* Icon block: Rearranged settings panels in editor.
* Icon Box block: Renamed alignment settings to better reflect what they do.
* Icon Box block: Fixed icon padding/margin.
* Image block: Added link destination setting.
* Image block: Fixed an issue where the image would overlap content if there was alignment in place (frontend).
* Review block: Fixed a case where applying bold font weight to the score subtitle would change its appearance.
* Review block: Fixed overflowing issues.
* Review block: Removed explicit width so that it won't overlap containers if it has margin applied.
* Tabs block: Tab navigation now becomes vertical on small viewports.

= 2.9.0 =
* Added Review block.
* Video Embed block: Added option "Stick to bottom on scroll".
* Post Type block: Themes may now opt in to user-selectable image sizes for specific post types.
* Added Background zoom support for the Banner & Container blocks.
* Added Background zoom option to BackgroundControl.
* Added plugin option to modify editor width globally.
* Added plugin option to modify inserter & appender button colors globally.
* Front-end styles are now minified.
* Added link to the GutenBee settings on the plugin listing page.
* Renamed gutenbee_admin_styles() to gutenbee_admin_assets()
* gutenbee_get_template_part()'s 4th parameter renamed to $args, in order for template parts to be compatible with any other standard template parts, since the $args parameter was added in get_template_part().
* Fixed initial appender size on Banner block.
* Fixed initial minimum height of Banner block.

= 2.8.1 =
* Fixed an issue with inner block wrappers caused by changes made in Gutenberg v9.2 / WordPress 5.6
* Fixed an issue where some blocks would force the inspector controls to extend past the viewport.

= 2.8.0 =
* Added Banner block.
* Added support for video background in the Container block.
* Added filters 'gutenbee_enqueue_frontend_styles' and 'gutenbee_enqueue_frontend_scripts' to force enqueueing frontend assets.
* UPDATED: Convert all internal block inline CSS rules from ID based to class based.
* Merge all identical selector CSS rules in block inline styles.
* Fixed an issue where in some blocks "undefined" would appear as a class.
* Fixed an issue where the video block would break in the editor when adding padding/margin.
* Added support for anchor links on all blocks.
* Fixed issue where an empty element was output when no avatar was selected, or no quote text was set, in the Testimonial block.
* Fixed minor spacing issues in the Testimonial element.
* Added Toolbar button to clear avatar on the Testimonial block.
* Added Visibility settings on all blocks.
* Fixed an issue in the Video Embed block that caused it to crash in the editor when changing padding and margin settings.
* Added self hosted video support for video backgrounds.
* Added per Button font size control.
* Fixed some undefined variables.
* Fixed an issue where the border radius would not be migrated on Buttons.

= 2.7.0 =
* Added new "Icon List" block.
* Added new "Testimonial" block.
* Added new "Video Embed" block.
* GutenBee block styles are loaded when the blocks are in reusable blocks.

= 2.6.2 =
* Fixed Post Type block support for custom classes.
* Post Type block: Min-max columns are now filterable per post type (see 'gutenbee_block_post_types_post_types_columns').
* Fixed an issue where heading colors would not be overridden by the applied text color.
* Fixed an issue on the Icon block where deleting the icon input would invalidate the block.
* Updated buttons on the poster image setting in the Video block.
* Display initial values on the border settings.
* Always display the border radius setting, regardless of the border style attribute.
* Fixed handling of offset when used in combination with pagination in the Post Type block.

= 2.6.1 =
* Fixed an issue with the IconBox and the ImageBox blocks where if the font size was reset the block would break validation.

= 2.6.0 =
* Added new "Food Item" block.
* Fixed an issue where the theme-grid option would be incompatible with fullwidth alignment in the container block.
* Added background color for arrows and dots navigation in the Slideshow block.
* Update all color pickers on all blocks with RGBA ones.
* Changed the "Icon" and "Icon Box" blocks to render SVG for their icons instead of an icon font.
* Fixed an issue where the "Icon Box" and "Image Box" blocks would not accept the paste command in their text inputs.
* Front-end scripts and styles are now only enqueued when they are required by the GutenBee blocks used.
* Fixed Spacer block's parallax setting.
* Now the container block will remain selected when choosing columns from the initial layouts.
* Updated default gutter size to "30px - large" in the container block (will not affect existing content).
* Fixed an issue where the reverse column order settings in tablet and mobile would not take effect on the container block.
* Fixed an issue where the styling would break on the Slideshow block if custom classes were added.
* Fixed an issue where center aligned Image blocks would cause their images to be stretched on iOS.
* Minor style adjustments.

= 2.5.0 =
* Fixed container block issue spacing when theme grid is on.
* Fixed paragraph block border and box shadow application element.
* Fixed an issue where the move handlers were being clipped when the container block was fullwidth.
* Updated container block for WordPress 5.5 support.
* Fixed container block direction setting in the editor
* Fixed minor styling issue for blocks for WordPress 5.5 support
* Added "Included posts" in Post Type block
* Fixed an issue where the selected term in the post types block would not be preserved on subsequent page loads

= 2.4.0 =
* Added border and border radius settings on all blocks (except Tabs and Accordion).
* Added box shadow settings on all blocks (except Tabs and Accordion).
* Fixed an issue where custom classes would make some blocks break their styling.
* Various editor UI fixes.

= 2.3.2 =
* Added link in image block.
* Update Container block to work on WordPress 5.4
* Added the ability to rearrange columns within the container block.
* Fix container and column block hover controls from being inaccessible.

= 2.3.1 =
* Skipped.

* Added New buttons block.
= 2.3.0 =
* Added New buttons block.
* Added background overlay option for the container block.
* Added responsive alignment options for the Heading / Paragraph blocks.
* Added background color and spacing controls in image box and icon box blocks.
* Added transformations from Heading to Paragraph and Paragraph to Heading.
* Fixed an issue where the slider controls value would keep resetting on input blur.
* Override fixed image attachment when in mobile.
* Minor aesthetic fixes.
* Container alignment settings now will inherit its desktop values over to the smaller breakpoints unless explicitly overridden.
* Fixed single column width in container block to be 100%
* Fixed visual alignment issues in image box and icon box blocks.
* Fixed image attachment setting to be reverted when in mobile breakpoints.
* Updated all block icons.
* Fixed slideshow block.
* Add new paragraph when return is pressed for GutenBee paragraph and heading blocks.
* Fixed an issue with the Google Maps block where it would break in the editor if the height was adjusted.

= 2.2.0 =
* Added new video block.
* Added responsive settings for blocks: ImageBox, Icon, IconBox.
* Fixed responsive styles. Unset properties will not get applied.
* Added font size in Heading block.
* Fixed issue where Post Types block wouldn't respect WooCommerce's products visibility option.
* Grouped block options in more relevant sections.
* Fixed incorrect wording on labels.

= 2.1.0 =
* Added new blocks: Container, Heading, Paragraph, Image, Spacer, Post Types.

= 2.0.9 =
* Added new blocks: Accordion, Countdown, CountUp, Google Maps, Icon, Icon Box, Image Box, Image Comparison, Justified Gallery, Progress Bar, Slideshow, Tabs.
* Removed the Spacer block.

= 1.0.0 =
* Initial release.
