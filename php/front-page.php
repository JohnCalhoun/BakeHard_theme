<?php get_header(); ?>

<div class='content content-other' data-url='<?php echo get_site_url() ?>/front'> 
    <div class="post front-page" id="post-<?php the_ID(); ?>">
        <div class="entry">
            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                <?php the_content(); ?>
            <?php endwhile; endif; ?>
        </div>
    </div>	
</div>

<?php get_footer(); ?>

