=== GutenBee - Gutenberg Blocks ===
Contributors: cssigniterteam, silencerius, nvourva, tsiger, anastis
Tags: gutenberg, blocks
Requires at least: 5.4
Tested up to: 5.5.3
Stable tag: 2.7.0
License: GPLv2 or later
License URI: http://www.gnu.org/licen2ses/gpl-2.0.html
Requires PHP: 5.6

GutenBee enhances the Gutenberg editor with more blocks!

== Description ==
[GutenBee is a collection of elegant WordPress blocks](https://www.cssigniter.com/gutenbee/) enhancing your editing experience in the Gutenberg editor and vastly extending the potential of the new editor experience.

Check out [the demo](https://www.cssigniter.com/gutenbee/) now!

The plugin's documentation can be found [here](https://www.cssigniter.com/docs/gutenbee/).

Here's the demo of one of our latest blocks, the Food Menu block

https://www.youtube.com/watch?v=Wv_zwREKi68

**Blocks:**

* **Accordion**: Organize your content into accordion elements. All the content including titles can be edited directly in the WordPress editor and you can choose any color combination from the block’s settings.
* **Buttons**: Actionable content needs clickable buttons. Add one or more buttons, tweak their colors, borders and alignment and you're all set!
* **Countdown**: Have an upcoming event? Pick a date directly inside the editor screen, choose your layout, colors, and typography and you’re ready!
* **CountUp**: Maybe not every block counts, but this one does! Pick a starting and ending number, add a suffix or prefix, style it and you’re done!
* **Divider**: Provide thematic content spacing with a fancy divider, edit its style, colors, and margins.
* **Food Menu**: Display your dishes and drink offerings in a stylish fashion.
* **Google Maps**: Easy-peasy fancy maps with the Google Maps block. Just enter a location and save, it just works! With support for beautiful predefined map styles and Snazzy custom map styles!
* **Icon**: Display icons from a custom designed, curated list of over one hundred icons, with more icons being added in regular updates!
* **Icon Box**: Your standard icon box block on steroids. Choose from over one hundred custom designed icons, style them any way and at any size you like, add some text and you’re good to go.
* **Icon List**: Create lists with beautiful icons instead of bullets.
* **Image**: A variation of the core Image block with extra responsive spacing and sizing settings.
* **Image Box**: A standard image box with title and text block on steroids. Adjust your spacing, layout, alignment, or colors and typography.
* **Image Comparison**: Need to showcase your photo editing skills or writing up a camera review? With the Image Comparison block you can enhance your posts with side-by-side comparison of any two photos you wish.
* **Justified Gallery**: Create beautiful justified grid layout galleries inside any of your post or pages.
* **Progress Bar**: Add stylish progress bars and display either progress or your skillset with the most visually captivating way.
* **Slideshow**: Add a fancy slideshow to your posts or pages. Drag and drop your images, choose your settings and hit publish!
* **Tabs**: Organize your content into fancy tabs. All the content including titles can be edited directly in the WordPress editor and you can choose any color combination from the block’s settings.
* **Container**: A powerful container block allowing content grouping or splitting in columns, complete with fully responsive settings.
* **Heading**: A normal heading block with responsive settings.
* **Paragraph**: A variation of the core Paragraph block with responsive spacing settings.
* **Spacer**: Complete control spacing of elements in your posts and pages with the responsive Spacer block.
* **Testimonial**: An easy to use block to help you display your testimonials with multiple layouts.
* **Post Types**: List posts from any post type in a configurable grid, complete with fully responsive settings.
* **Video**: Embed a video from your media library or upload a new one.
* **Video Embed**: Embed videos from YouTube or Vimeo and lazy-load theme if you wish to.

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
