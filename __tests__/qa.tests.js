const supertest = require('supertest');
const { createServer } = require('../server/create');

const app = createServer();
// const db = require('../server/db');

const productID = 1;
const questionID = 1;
const answerID = 1;

afterAll(async () => {
  await db.end()
})

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
      expect(response.body.results[0].question_id).not.toBe(undefined)
      expect(typeof (response.body.results[0].question_id)).toBe('number')
    })
    it('should have question body string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[0].question_body).not.toBe(undefined)
      expect(typeof (response.body.results[0].question_body)).toBe('string')
    })
    it('should have question date string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[0].question_date).not.toBe(undefined)
      expect(typeof (response.body.results[0].question_date)).toBe('string')
    })
    it('should have asker name string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[0].asker_name).not.toBe(undefined)
      expect(typeof (response.body.results[0].asker_name)).toBe('string')
    })
    it('should have question helpfulness number in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[0].question_helpfulness).not.toBe(undefined)
      expect(typeof (response.body.results[0].question_helpfulness)).toBe('number')
    })
    it('should have reported boolean in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[0].reported).not.toBe(undefined)
      expect(typeof (response.body.results[0].reported)).toBe('boolean')
    })
    it('should have answers object in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}`);
      expect(response.body.results[0].answers).not.toBe(undefined)
      expect(typeof (response.body.results[0].answers)).toBe('object')
      expect(Array.isArray(response.body.results[0].answers)).toBe(false)
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
      expect(response.body.results[0].answer_id).not.toBe(undefined)
      expect(typeof (response.body.results[0].answer_id)).toBe('number')
    })
    it('should have answer body string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.body.results[0].body).not.toBe(undefined)
      expect(typeof (response.body.results[0].body)).toBe('string')
    })
    it('should have answer date string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.body.results[0].answer_date).not.toBe(undefined)
      expect(typeof (response.body.results[0].answer_date)).toBe('string')
    })
    it('should have answerer name string in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.body.results[0].answerer_name).not.toBe(undefined)
      expect(typeof (response.body.results[0].answerer_name)).toBe('string')
    })
    it('should have helpfulness number in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.body.results[0].helpfulness).not.toBe(undefined)
      expect(typeof (response.body.results[0].helpfulness)).toBe('number')
    })
    it('should have photo array in result array', async () => {
      const response = await supertest(app).get(`/qa/questions/${productID}/answers`);
      expect(response.body.results[0].photos).not.toBe(undefined)
      expect(Array.isArray(response.body.results[0].photos)).toBe(true)
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
  it('should return 204 status code for success', async () => {
    const response = await supertest(app).put(`/qa/questions/${questionID}/helpful`);
    expect(response.statusCode).toBe(204)
  })
  it('should return 400 status code for failure', async () => {
    const response = await supertest(app).put(`/qa/questions/abc/helpful`);
    expect(response.statusCode).toBe(400)
  })
})

describe('increment answer helpfulness count', () => {
  it('should return 204 status code for success', async () => {
    const response = await supertest(app).put(`/qa/answers/${answerID}/helpful`);
    expect(response.statusCode).toBe(204)
  })
  it('should return 400 status code for failure', async () => {
    const response = await supertest(app).put(`/qa/answers/abc/helpful`);
    expect(response.statusCode).toBe(400)
  })
})

describe('report question', () => {
  it('should return 204 status code for success', async () => {
    const response = await supertest(app).put(`/qa/questions/${questionID}/report`);
    expect(response.statusCode).toBe(204)
  })
  it('should return 400 status code for failure', async () => {
    const response = await supertest(app).put(`/qa/questions/abc/report`);
    expect(response.statusCode).toBe(400)
  })
})

describe('report answer', () => {
  it('should return 204 status code for success', async () => {
    const response = await supertest(app).put(`/qa/answers/${answerID}/report`);
    expect(response.statusCode).toBe(204)
  })
  it('should return 400 status code for failure', async () => {
    const response = await supertest(app).put(`/qa/answers/abc/report`);
    expect(response.statusCode).toBe(400)
  })
})

describe('add a question post route', () => {
  it('should return 201 status code', async () => {
    const response = await supertest(app).post(`/qa/questions`).send({body: 'new question', name: 'asker', email: 'asker@ask.com', product_id: 1});
    expect(response.statusCode).toBe(201)
  })
  it('should return 422 status code for failure', async () => {
    const response = await supertest(app).post(`/qa/questions`).send({body: 'new question'});
    expect(response.statusCode).toBe(422)
  })
})

describe('add an answer post route', () => {
  it('should return 201 status code for success', async () => {
    const response = await supertest(app).post(`/qa/questions/${questionID}/answers`).send({body: 'new question', name: 'asker', email: 'asker@ask.com'});
    expect(response.statusCode).toBe(201)
  })
  it('should return 422 status code for failure', async () => {
    const response = await supertest(app).post(`/qa/questions/${questionID}/answers`).send({body: 'new question', name: 'asker'});
    expect(response.statusCode).toBe(422)
  })
})

describe.only('edit a question patch route', () => {
  it('should return 204 status code for success', async () => {
    const response = await supertest(app).patch(`/qa/questions/${questionID}/edit`).send({question_body: 'changed question'});
    expect(response.statusCode).toBe(200)
  })
  it('should return 400 status code for failure', async () => {
    const response = await supertest(app).patch(`/qa/questions/${questionID}/edit`).send({});
    expect(response.statusCode).toBe(400)
  })
  it('should successfully change question body in database', async () => {
    const firstGetResponse = await supertest(app).get(`/qa/questions/1`);
    const initalQuestionBody = JSON.parse(firstGetResponse.text).results[0].question_body;

    const editRequest = await supertest(app).patch(`/qa/questions/3/edit`).send({question_body: 'changed question'});
    const updatedQuestionBody = JSON.parse(editRequest.text).rows[0].updated_question_body

    expect(updatedQuestionBody).not.toBe(initalQuestionBody)
    expect(updatedQuestionBody).toBe('changed question')
  })
})

afterAll(async () => {
  await db.end()
})


// describe.only('edit a answer patch route', () => {
//   it('should return 204 status code for success', async () => {
//     const response = await supertest(app).patch(`/qa/answers/${answerID}/edit`).send({answer_body: 'answer question'});
//     expect(response.statusCode).toBe(204)
//   })
//   it('should return 400 status code for failure', async () => {
//     const response = await supertest(app).patch(`/qa/questions/${questionID}/edit`).send({});
//     expect(response.statusCode).toBe(400)
//   })
// })

    // const secondGetResponse =  await supertest(app).get(`/qa/questions/${questionID}`);
    // const updatedQuestionBody = editRequest.body[1].rows[0].question_body