<?php get_header(); ?>

<div class='content valign'> 
    <div class="post front-page" id="post-<?php the_ID(); ?>">
        <div class="entry">
            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                <?php the_content(); ?>
            <?php endwhile; endif; ?>
        </div>
    </div>	
</div>

<?php get_footer(); ?>

