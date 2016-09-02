<?php get_header(); ?>
<header>
    <div class="container">
        <div> 
            <h1 class="flow-text"><? bloginfo('name'); ?></h1>
        </div>
        <div>
            <nav>
                <div id="main-nav" class="nav-wrapper"> 
                    <?php wp_nav_menu( array(     
                        'menu'=>'main_menu',
                        'depth'=>1,
                        'menu_class'=>'main_menu right',
                        'before'=>'',
                        'after'=> '',
                        'theme_location'=>'main_menu'
                        )); 
                    ?>    
                </div>
            </nav>
        </div>
    </div>
</header>
<main>
    <div id="content">
    </div>
</main>
<?php get_footer(); ?>
