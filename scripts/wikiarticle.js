const axios = require('axios');
const fs = require('fs');

async function downloadRandomWikipediaArticle() {
    try {
        // Step 1: Get a random Wikipedia article URL
        const randomArticleResponse = await axios.get(
            'https://en.wikipedia.org/w/api.php',
            {
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'random',
                    rnnamespace: 0, // Namespace 0 is for main articles
                    rnlimit: 1
                }
            }
        );

        const randomArticle = randomArticleResponse.data.query.random[0];
        const title = randomArticle.title;

        console.log(`Downloading article: ${title}`);

        // Step 2: Fetch the article content
        const articleContentResponse = await axios.get(
            'https://en.wikipedia.org/w/api.php',
            {
                params: {
                    action: 'query',
                    format: 'json',
                    prop: 'extracts',
                    explaintext: true, // Plain text extract without HTML
                    titles: title
                }
            }
        );

        const pages = articleContentResponse.data.query.pages;
        const page = Object.values(pages)[0]; // Get the first page object
        const articleText = page.extract;

        if (!articleText) {
            console.error('Could not fetch article content.');
            return;
        }

        // Step 3: Save to JSON file
        const output = {
            title: title,
            text: articleText
        };

        //fs.writeFileSync('random_article.json', JSON.stringify(output, null, 2));
        //console.log('Article saved to random_article.json');

        return output

    } catch (error) {
        console.error('Error fetching article:', error);
    }
}


module.exports = downloadRandomWikipediaArticle;

