<?php

register_nav_menus( array(
        "main_menu"=>"Main menu in header,use for pages",
        "gallery_menu"=>"submenu for gallery page"
        )
);

function theme_script() {
    wp_register_script( "materialize",
                        get_template_directory_uri().'/js/materialize.min.js',
                        array('jquery'),
                        null,
                        true);
    wp_register_script( "bake-hard",
                        get_template_directory_uri().'/js/cljs.js',
                        array(),
                        null,
                        true);
    wp_enqueue_script("materialize");
    wp_enqueue_script("bake-hard");
}
add_action("wp_enqueue_scripts","theme_script");
?>
