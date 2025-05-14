import PocketBase from "pocketbase";
export const prerender = true;

export async function GET() {
    const headers = {
        'Content-Type': 'application/xml',
        'Cache-Control': 'max-age=0, s-maxage=3600'
    };

    const pb = new PocketBase('https://pocketbase.capinski.dev');
    const EXCLUDE_PAGES = ['home', 'new'] // TODO refactor pages into separate collection

    // fetch blogs from pocketbase
    let blogs;
    try {
        blogs = await pb.collection('pages').getFullList({
            sort: '-pub_date',
            filter: ('published=true && ') + EXCLUDE_PAGES.map(page => `page!="${page}"`).join(' && '),
            expand: 'thumbnail',
        });
    } catch (e) {
        console.log(e);
        return {status: 500};
    }


    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
	    <title>capinski.dev</title>
	    <description>With great power comes high-voltage physics shenanigans and a surge of current procrastination.</description>
	    <link>https://www.capinski.dev/</link>
	    <atom:link href="https://www.capinski.dev/blog/rss.xml" rel="self" type="application/rss+xml"/>
	    <language>en</language>
	    <enclosure url="https://www.capinski.dev/favicon.png" type="image/png" />
	    ${blogs
        .map(
            (post) => `
	      <item>
	        <title>${post.title}</title>
	        <link>https://www.capinski.dev/blog/${post.page}</link>
	        <guid>https://www.capinski.dev/blog/${post.page}</guid>
	        <pubDate>${new Date(post.pub_date).toUTCString()}</pubDate>
	        <author>Theodore Capinski</author>
	        <description>${post.summary}</description>
	        <enclosure url="${post.thumbnail ? pb.getFileUrl(post, post.thumbnail) : ''}" type="image/png" />
	      </item>
	    `
        )
        .join('')}
    </channel>
	</rss>`;

    return new Response(xml, { headers });
}