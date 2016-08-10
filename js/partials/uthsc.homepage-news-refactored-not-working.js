/*
 * Get posts from news site
 */
function postsAjax(url, containerElement, parseNewsPosts) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		success: function (posts) {
			//console.log(posts);
			$(containerElement).empty();
			$(containerElement).html(parseNewsPosts);
		}
	});
}

function parseNewsPosts() {
	var html = '';

	for (var i=0;i<3;i++) {

		var postLink = posts[i]['link'],
			featuredImageLink = '',
			postTitle = posts[i]['title']['rendered'];

		if (typeof posts[i]._embedded['wp:featuredmedia'] !== 'undefined') {
			featuredImageLink = posts[i]._embedded['wp:featuredmedia'][0]['source_url'];
			featuredImageLink = featuredImageLink.replace('.jpg', '-300x300.jpg')
		} else {
			featuredImageLink = '-resources/2015/images/homepage-news-featured-image-place-holder.jpg';
		}

		html += '<a class="' + 'post-0' + (i + 1) + '" href="' + postLink + '"><div class="row collapse">' +
			'<figure> ' +
			'<img src="' + featuredImageLink + '"' +
			'class="attachment-thumbnail size-thumbnail wp-post-image" ' +
			'alt="Radhakrishna Feature">' +
			'</figure>' +
			'<p><span class="anchortext">' + postTitle +'</span></p>' +
			'</div></a>';
	}

	return html;
}



function renderEducationPosts() {
	postsAjax("http://news.uthsc.edu/wp-json/wp/v2/posts?categories=59&per_page=3&_embed", '.news-posts-academics', parseNewsPosts());
}

function renderResearchPosts() {
	postsAjax("http://news.uthsc.edu/wp-json/wp/v2/posts?categories=60&per_page=3&_embed", '.news-posts-research', parseNewsPosts());
}

function renderClinicalCarePosts() {
	postsAjax("http://news.uthsc.edu/wp-json/wp/v2/posts?categories=61&per_page=3&_embed", '.news-posts-clinical-care', parseNewsPosts());
}

function renderPublicServicePosts() {
	postsAjax("http://news.uthsc.edu/wp-json/wp/v2/posts?categories=331&per_page=3&_embed", '.news-posts-public-service', parseNewsPosts());
}

/*
 * Render names on page load
 */
$(document).ready(function(){
	renderEducationPosts();
	renderResearchPosts();
	renderClinicalCarePosts();
	renderPublicServicePosts();
});