const { Octokit } = require('octokit');

const githubToken = process.env.GH_PERSONAL_ACCESS_TOKEN;
const octokit = new Octokit({ auth: githubToken });

const searchQuery = async (req, res) => {
  console.log('search query received: ', req.query)
  let keywords = req.query.query;
  // let queryString = encodeURIComponent(keywords + '+language:assembly&sort=stars&order=desc');
  let queryString = encodeURIComponent(keywords + '+repos:30+followers:100');

  try {
    const response = await octokit.request('GET /search/users', {
      q : queryString
    });
    if (response.data) {
      console.log("octokit get result: ", response.data);
      res.send(response.data);
    }
  } catch (err) {
    console.log('Error GitHub API called: ', err)
    res.status(404).send(err);
  }
}

module.exports = {
  searchQuery
}