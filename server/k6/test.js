import http from 'k6/http';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 500,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '15s',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 100, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default () => {
  //GET Questions
   http.get(`http://localhost:3000/qa/questions/${Math.floor(Math.random() * 99999)}`);

  // //  //GET Answers
  //  http.get(`http://localhost:3000/qa/questions/${Math.floor(Math.random() * 99999)}/answers`);

  // //  //PUT Increment Helpful Question
  //  http.put(`http://localhost:3000/qa/questions/${Math.floor(Math.random() * 99999)}/helpful`);

  // //  //PUT Increment Helpful Question
  //  http.put(`http://localhost:3000/qa/answers/${Math.floor(Math.random() * 99999)}/helpful`);

  //  http.post(`http://localhost:3000/qa/questions/${Math.floor(Math.random() * 99999)}`);

  //  http.post(`http://localhost:3000/qa/questions/${Math.floor(Math.random() * 99999)}/answers`);

}