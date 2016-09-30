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
    <nav id="main-nav">
        <ul class="main_menu"> 
            <li>
                <a href='/pages' class='link-button' id='home-btn'>Home</a>
            </li> 
<li>
                <h1 class="brand-logo">
                    <a href='/front' class='link-button' id='font-btn'>
                        <? bloginfo('name'); ?>
                    </a>
                </h1>
            </li>
                        <li>
                <a href='/posts' class='link-button' id='blog-btn'>Blog</a>
            </li> 
        </ul>
    </nav>
    <div class='header-menu'>
    </div>
</header>



