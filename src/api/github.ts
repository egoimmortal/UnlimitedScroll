export default class Github {
    static instance: Github;

    // eslint-disable-next-line camelcase
    static per_page = 6;

    static getInstance() {
      if (Github.instance == null) {
        Github.instance = new Github();
      }
      return Github.instance;
    }

    static GetRepos(userName: string, page: number) {
      return fetch(`https://api.github.com/users/${userName}/repos?page=${page}&per_page=${this.per_page}`)
        .then((response) => {
          if (!response.ok) return '';
          return response.json();
        })
        .then((data) => data)
        .catch((_error) => {
          console.log(_error);
        });
    }
}
