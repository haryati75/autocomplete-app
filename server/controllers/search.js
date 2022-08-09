const { Octokit } = require('octokit');

const githubToken = process.env.GH_PERSONAL_ACCESS_TOKEN;
const octokit = new Octokit({ auth: githubToken });

const searchQuery = async (req, res) => {
  console.log('search query received: ', req.query)
  let keywords = req.query.query;

  // Search configurations
  let apiString = 'GET /search/users';
  let qualifier = 'name'
  let minRepos = 10;
  let minFollowers = 500;
  let sortString = 'followers-desc'

  let queryString = `${keywords}+in:${qualifier}+repos:>${minRepos}+followers:>${minFollowers}`; 

  try {
    const response = await octokit.request(apiString, {
      q : queryString,
      sort : sortString,
    });
    if (response.data.total_count >= 0) {
      // return only what's necessary
      const sendToClientData = response.data.items.map(item => {
        return { 
          id: item.id,
          login: item.login,
          html_url: item.html_url,
          url: item.url
        }
      })
      const remaining = response.headers['x-ratelimit-remaining'];

      console.log(`'${keywords}'`, 'searched, total_count: ', response.data.total_count, ', sent_count: ', sendToClientData.length);
      console.log('rate-limit: ', remaining);
      console.log('resets in: ', new Date(parseInt(response.headers['x-ratelimit-reset']) * 1000))
      res.send({
        items : sendToClientData,
        isLimitReached : remaining === 0,
        resetTime : new Date(parseInt(response.headers['x-ratelimit-reset']) * 1000)
      });
    } else {
      console.log(`Github API ${apiString} response for ${queryString} >> `);
      console.log(response);
      res.send(response);
    }
  } catch (err) {
    console.log('Error GitHub API called: ', err)
    res.status(err.status).send(err);
  }
}

module.exports = {
  searchQuery
}