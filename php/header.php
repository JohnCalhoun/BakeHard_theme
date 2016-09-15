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
                <a href=''>
                    <h1 class="brand-logo"><? bloginfo('name'); ?></h1>
                </a>
                <ul class="main_menu right"> 
                    <li>
                        <a href='' >Home</a>
                    </li> 
                    <li>
                        <a href='' >Blog</a>
                    </li> 
                </ul>
            </div>
        </nav>
    </div>
</header>
<main class='container valign-wrapper'>



