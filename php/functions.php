<?php

register_nav_menus( array(
        "main_menu"=>"Main menu in header,use for pages",
        "gallery_menu"=>"submenu for gallery page"
        )
);

function theme_script() {
    wp_register_script( "isotope",
                get_template_directory_uri().'/js/isotope.min.js',
                array('jquery'),
                null,
                true);
    wp_register_script( "materialize",
                    get_template_directory_uri().'/js/materialize.min.js',
                    array('jquery'),
                    null,
                    true);
    wp_register_script( "bake-hard",
                        get_template_directory_uri().'/js/bakehard.min.js',
                        array('jquery'),
                        null,
                        true);
    wp_enqueue_script("materialize");
    wp_enqueue_script("isotope");
    wp_enqueue_script("bake-hard");
};
add_action("wp_enqueue_scripts","theme_script");
add_action( 'rest_api_init', 'api_register_img_url' );
function api_register_img_url() {
    register_rest_field( 'post',
        'img_url',
        array(
            'get_callback'    => 'api_get_img_url',
            'update_callback' => null,
            'schema'          => null,
        )
    );
};
function api_get_img_url( $object, $field_name, $request ) {
    return(get_the_post_thumbnail_url( $object[ 'id' ]) );
};

add_action( 'rest_api_init', 'api_register_category_string' );
function api_register_category_string() {
    register_rest_field( 'post',
        'category_string',
        array(
            'get_callback'    => 'api_get_category_string',
            'update_callback' => null,
            'schema'          => null,
        )
    );
};
function api_get_category_string( $object, $field_name, $request ) {
    $cats=get_the_category(  $object[ 'id' ]);
    $output=array();
    foreach($cats as $cat){
        array_push($output,$cat->name);
    }
    return(implode(' ',$output));
};







?>
