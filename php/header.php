<!DOCTYPE HTML> 
<html <?php language_attributes(); ?>>

<head>
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width">
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen, print" />
	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header>
    <div>
        <nav>
            <div id="main-nav" class="nav-wrapper nav" >
                <h1 class="brand-logo"><? bloginfo('name'); ?></h1>
                <?php wp_nav_menu( array(     
                    'menu'=>'main_menu',
                    'depth'=>1,
                    'menu_class'=>'main_menu right hide-on-med-and-down',
                    'before'=>'',
                    'after'=> '',
                    'theme_location'=>'main_menu'
                    )); 
                ?>  
            </div>
        </nav>
    </div>
</header>
<main class='container valign-wrapper'>



