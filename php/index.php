<?php get_header(); ?>

<main class='valign-wrapper'>
    <div class='content' id='front-page'> 
        <div class="post front-page" id="post-<?php the_ID(); ?>">
            <div class="entry">
                <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                    <?php the_content(); ?>
                <?php endwhile; endif; ?>
            </div>
        </div>	
    </div>
</main>

<?php get_footer(); ?>

