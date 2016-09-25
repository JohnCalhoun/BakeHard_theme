<!DOCTYPE HTML> 
<html <?php language_attributes(); ?>>

<head>
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width"/>
	<meta name='site_url' content='<?php echo get_site_url() ?>' /> 
    <meta name='sticky_posts' content='<?php echo json_encode(get_option("sticky_posts")) ?>' /> 
 
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
                <h1 class="brand-logo">
                    <a href='<?php echo site_url(); ?>/front'>
                        <? bloginfo('name'); ?>
                    </a>
                </h1>
                <ul class="main_menu right"> 
                    <li>
                        <a href='<?php echo site_url(); ?>/Pages' id='home-btn'>Home</a>
                    </li> 
                    <li>
                        <a href='<?php echo site_url(); ?>/Posts' id='blog-btn'>Blog</a>
                    </li> 
                </ul>
            </div>
        </nav>
    </div>
</header>
<main class='valign-wrapper'>



