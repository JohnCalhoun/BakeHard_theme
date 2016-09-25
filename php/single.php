<?php get_header(); ?>

<div class='content content-other'> 
    <div class="post page" id="post-<?php the_ID(); ?>">
        <div class="entry">
            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                <h1 class='post-title'><?php the_title(); ?></h1>
                <hr/>
                <span class='post-date'><?php echo get_the_date('m-d-y') ?></span>
                <?php the_content(); ?>
            <?php endwhile; endif; ?>
        </div>
    </div>	
</div>

<?php get_footer(); ?>

