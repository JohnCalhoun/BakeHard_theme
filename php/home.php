<?php get_header(); ?>

<div class='content content-thumbnail'> 
    <h2>Categories</h2> 
    <ul>
        <?php wp_list_categories(array(
                        'depth'=>1,
                        'title_li'=>''
        )); ?>
    </ul>
    <h2>Posts</h2>
    <div>
        <div class="thumbnail">
            <div class='grid-sizer'></div>
            <div class='gutter-sizer'></div>
        </div>	
    </div>
    <div>
        <span class='waves-effect waves-light btn load-thumbnail'>
            Load More
        </span>
    </div>
    <div id="thumbnail-status">
    </div>
</div>

<?php get_footer(); ?>

