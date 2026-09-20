import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const siteUrl = 'https://vinicius-gpl.com';
	const currentDate = new Date().toISOString().split('T')[0];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
	<url>
		<loc>${siteUrl}/</loc>
		<lastmod>${currentDate}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>1.0</priority>
		<xhtml:link rel="alternate" hreflang="pt-br" href="${siteUrl}/" />
		<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
		<image:image>
			<image:loc>${siteUrl}/social/vinicius-gpl.com.png</image:loc>
			<image:title>Vinícius GPL - Portfólio</image:title>
			<image:caption>Desenvolvedor Full-Stack</image:caption>
		</image:image>
	</url>
	<url>
		<loc>${siteUrl}/en</loc>
		<lastmod>${currentDate}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
		<xhtml:link rel="alternate" hreflang="pt-br" href="${siteUrl}/" />
		<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
		<image:image>
			<image:loc>${siteUrl}/social/vinicius-gpl.com.png</image:loc>
			<image:title>Vinícius GPL - Portfolio</image:title>
			<image:caption>Full-Stack Developer</image:caption>
		</image:image>
	</url>
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
