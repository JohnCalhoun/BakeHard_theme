<?php

register_nav_menus( array(
        "main_menu"=>"Main menu in header,use for pages",
        "gallery_menu"=>"submenu for gallery page"
        )
);

function theme_script() {
    wp_register_script( "bake-hard",
                        get_template_directory_uri().'/js/bakehard.min.js',
                        array('jquery'),
                        null,
                        true);
    wp_enqueue_script("bake-hard");
};
add_action("wp_enqueue_scripts","theme_script");

add_action( 'rest_api_init', 'api_register_routes' );

function api_register_routes() {
    register_rest_field( 'post',
        'category_string',
        array(
            'get_callback'    => 'api_get_category_string',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post',
        'tag_strings',
        array(
            'get_callback'    => 'api_get_tag_strings',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post',
        'img_url',
        array(
            'get_callback'    => 'api_get_img_url',
            'update_callback' => null,
            'schema'          => null,
        )
    );
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


function api_get_category_string( $object, $field_name, $request ) {
    $cats=get_the_category(  $object[ 'id' ]);
    $output=array();
    foreach($cats as $cat){
        array_push($output,$cat->name);
    }
    return(implode(' ',$output));
};

function api_get_tag_strings( $object, $field_name, $request ) {
    $tags=wp_get_post_tags(  $object[ 'id' ]);
    $output=array();
    foreach($tags as $tag){
        array_push($output,$tag->name);
    }

    return($output);
};

?>
