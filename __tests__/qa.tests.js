const supertest = require('supertest');
const { createServer } = require('../server/create');

const app = createServer();
const db = require('../server/db');
const productID = 1
const questionID = 1
const answerID = 1

describe('get questions route', () => {
  describe('given product exists', () => {
    it('should return 200 status code and result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.statusCode).toBe(200)
      expect(response.body.product_id).not.toBe(undefined)
      expect(typeof (response.body.product_id)).toBe('string')
      expect(Array.isArray(response.body.results)).toBe(true)
    })
    it('should have question ID number in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[1].question_id).not.toBe(undefined)
      expect(typeof (response.body.results[1].question_id)).toBe('number')
    })
    it('should have question body string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[1].question_body).not.toBe(undefined)
      expect(typeof (response.body.results[1].question_body)).toBe('string')
    })
    it('should have question date string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[1].question_date).not.toBe(undefined)
      expect(typeof (response.body.results[1].question_date)).toBe('string')
    })
    it('should have asker name string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[1].asker_name).not.toBe(undefined)
      expect(typeof (response.body.results[1].asker_name)).toBe('string')
    })
    it('should have question helpfulness number in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[1].question_helpfulness).not.toBe(undefined)
      expect(typeof (response.body.results[1].question_helpfulness)).toBe('number')
    })
    it('should have reported boolean in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[1].reported).not.toBe(undefined)
      expect(typeof (response.body.results[1].reported)).toBe('boolean')
    })
    it('should have answers object in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[1].answers).not.toBe(undefined)
      expect(typeof (response.body.results[1].answers)).toBe('object')
      expect(Array.isArray(response.body.results[1].answers)).toBe(false)
    })
  })

  describe('given product does not exist', () => {
    it('should return 501 status code', async () => {
      const response = await supertest(app).get(`/qa/questions/abc`);
      expect(response.statusCode).toBe(501)
    })
  })
})

describe('get answers route', () => {
  describe('given product exists', () => {
    it('should return 200 status code and results array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.statusCode).toBe(200)
      expect(response.body.question).not.toBe(undefined)
      expect(typeof (response.body.question)).toBe('string')
      expect(response.body.page).not.toBe(undefined)
      expect(typeof (response.body.page)).toBe('number')
      expect(response.body.count).not.toBe(undefined)
      expect(typeof (response.body.count)).toBe('number')
      expect(Array.isArray(response.body.results)).toBe(true)
    })
    it('should have answer ID number in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.body.results[1].answer_id).not.toBe(undefined)
      expect(typeof (response.body.results[1].answer_id)).toBe('number')
    })
    it('should have answer body string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.body.results[1].body).not.toBe(undefined)
      expect(typeof (response.body.results[1].body)).toBe('string')
    })
    it('should have answer date string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.body.results[1].answer_date).not.toBe(undefined)
      expect(typeof (response.body.results[1].answer_date)).toBe('string')
    })
    it('should have answerer name string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.body.results[1].answerer_name).not.toBe(undefined)
      expect(typeof (response.body.results[1].answerer_name)).toBe('string')
    })
    it('should have helpfulness number in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.body.results[1].helpfulness).not.toBe(undefined)
      expect(typeof (response.body.results[1].helpfulness)).toBe('number')
    })
    it('should have photo array in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.body.results[1].photos).not.toBe(undefined)
      expect(Array.isArray(response.body.results[1].photos)).toBe(true)
    })
  })

  describe('given product does not exist', () => {
    it('should return 501 status code', async () => {
      const response = await supertest(app).get(`/qa/questions/abc/answers`);
      expect(response.statusCode).toBe(501)
    })
  })
})

describe('increment question helpfulness count', () => {
  it('should return 204 status code', async () => {
    const response = await supertest(app).put(`/qa/questions/${questionID}/helpful`);
    expect(response.statusCode).toBe(204)
  })
})

describe('increment answer helpfulness count', () => {
  it('should return 204 status code', async () => {
    const response = await supertest(app).put(`/qa/answers/${answerID}/helpful`);
    expect(response.statusCode).toBe(204)
  })
})

describe('report question', () => {
  it('should return 204 status code', async () => {
    const response = await supertest(app).put(`/qa/questions/${questionID}/report`);
    expect(response.statusCode).toBe(204)
  })
})

describe('report answer', () => {
  it('should return 204 status code', async () => {
    const response = await supertest(app).put(`/qa/answers/${answerID}/report`);
    expect(response.statusCode).toBe(204)
  })
})

describe('add a question post route', () => {
  it('should return 201 status code', async () => {
    const response = await supertest(app).post(`/qa/questions`).send({body: 'new question', name: 'asker', email: 'asker@ask.com', product_id: 1});
    expect(response.statusCode).toBe(201)
  })
})

describe('add an answer post route', () => {
  it('should return 201 status code', async () => {
    const response = await supertest(app).post(`/qa/questions/${questionID}/answers`).send({body: 'new question', name: 'asker', email: 'asker@ask.com'});
    expect(response.statusCode).toBe(201)
  })
})
