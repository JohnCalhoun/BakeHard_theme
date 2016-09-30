<?php 
class spa_walker extends Walker {
 
    var $db_fields = array( 'parent' => 'parent_id', 'id' => 'object_id' );
 
    function start_lvl(&$output, $depth=0, $args=array()) {
        $output .= "\n<ul>\n";
    }
 
    function end_lvl(&$output, $depth=0, $args=array()) {
        $output .= "</ul>\n";
    }
 
    function start_el(&$output, $item, $depth=0, $args=array()) {
        $link="<a class='link-button' href='/pages/".$item->object_id."'>".$item->title."</a>";

        $output .= "<li>".$link;
    }
 
    function end_el(&$output, $item, $depth=0, $args=array()) {
        $output .= "</li>\n";
    }
}

?>
