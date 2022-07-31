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
      console.log("sending result: ", sendToClientData);
      console.log('rate-limit: '+response.headers['x-ratelimit-remaining']+' / '+response.headers['x-ratelimit-limit']);
      res.send({
        items : sendToClientData,
        limit : response.headers['x-ratelimit-limit'],
        remaining : response.headers['x-ratelimit-remaining'],
      });
    } else {
      console.log(`Github API ${apiString} response for ${queryString} >> `);
      console.log(response);
      res.status(404).send(response);
    }
  } catch (err) {
    console.log('Error GitHub API called: ', err)
    res.status(404).send(err);
  }
}

module.exports = {
  searchQuery
}