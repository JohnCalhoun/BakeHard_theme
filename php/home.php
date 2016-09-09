<?php get_header(); ?>

<div class='container'> 
    <div class="post page home" id="post-<?php the_ID(); ?>">
        <div class="entry">
            <?php if (have_posts()) : ?>
                <ul> 
                <?php while (have_posts()) : ?>
                    <?php the_post(); ?>
                    <li>   
                        <h2><?php the_title(); ?></h2>
                        <p><?php the_excerpt(); ?></p>
                        <a href="<?php the_permalink(); ?>">view</a>
                        <?php the_post_thumbnail('thumbnail'); ?>
                    </li>
                <?php endwhile; ?>
                </ul>
            <?php endif; ?>
        </div>
    </div>	
</div>

<?php get_footer(); ?>

