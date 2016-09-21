<?php

register_nav_menus( array(
        "main_menu"=>"Main menu in header,use for pages",
        "gallery_menu"=>"submenu for gallery page"
        )
);

function theme_script() {
//    wp_register_script( "isotope",
//                "https://unpkg.com/isotope-layout@3.0/dist/isotope.pkgd.min.js",
//                array('jquery'),
//                null,
//                true);
//    wp_register_script( "materialize",
//                    "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js",
//                    array('jquery'),
//                    null,
//                    true);
    wp_register_script( "bake-hard",
                        get_template_directory_uri().'/js/bakehard.min.js',
                        array('jquery'),
                        null,
                        true);
//    wp_enqueue_script("materialize");
//    wp_enqueue_script("isotope");
    wp_enqueue_script("bake-hard");
};
add_action("wp_enqueue_scripts","theme_script");
add_action( 'rest_api_init', 'api_register_img_url' );
add_action( 'rest_api_init', 'api_register_page_meta' );

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
function api_register_page_meta() {
    register_rest_field( 'page',
        'meta',
        array(
            'get_callback'    => 'api_get_page_meta',
            'update_callback' => null,
            'schema'          => null,
        )
    );
};

function api_get_img_url( $object, $field_name, $request ) {
    return(get_the_post_thumbnail_url( $object[ 'id' ]) );
};
function api_get_page_meta( $object, $field_name, $request ) {
    return(get_post_meta( $object[ 'id' ]) );
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


function api_get_site_url() {
    return( get_site_url());
};
function api_get_sticky_posts() {
    return( get_option('sticky_posts') );
};

add_action( 'rest_api_init', function () {
	register_rest_route( 'bakehard/v1', '/site_url', array(
		'methods' => 'GET',
		'callback' => 'api_get_site_url',
	) );
} );

add_action( 'rest_api_init', function () {
	register_rest_route( 'bakehard/v1', '/sticky_posts', array(
		'methods' => 'GET',
		'callback' => 'api_get_sticky_posts',
	) );
} );











?>
