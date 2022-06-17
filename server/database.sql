DROP DATABASE IF EXISTS questionsandanswers2;

CREATE DATABASE questionsandanswers2;

\c questionsandanswers2;

CREATE TABLE question (
 question_id SERIAL,
 product_id INTEGER NOT NULL,
 question_body TEXT NOT NULL,
 question_date TEXT NOT NULL,
 asker_name TEXT NOT NULL,
 asker_email TEXT NOT NULL,
 reported BOOLEAN NOT NULL,
 question_helpfulness INTEGER NOT NULL
);

ALTER TABLE question ADD CONSTRAINT question_pkey PRIMARY KEY (question_id);

CREATE TABLE answer (
 answer_id SERIAL,
 question_id INTEGER NOT NULL,
 body TEXT NOT NULL,
 answer_date TEXT NOT NULL DEFAULT NULL,
 answerer_name TEXT NOT NULL,
 answerer_email TEXT NOT NULL,
 reported BOOLEAN NOT NULL,
 helpfulness INTEGER NOT NULL
);

ALTER TABLE answer ADD CONSTRAINT answer_pkey PRIMARY KEY (answer_id);

CREATE TABLE photo (
 photo_id SERIAL,
 answer_id INTEGER,
 photo_url TEXT
);

ALTER TABLE photo ADD CONSTRAINT photo_pkey PRIMARY KEY (photo_id);

ALTER TABLE answer ADD CONSTRAINT answer_question_id_fkey FOREIGN KEY (question_id) REFERENCES question(question_id);
ALTER TABLE photo ADD CONSTRAINT photo_id_answer_fkey FOREIGN KEY (answer_id) REFERENCES answer(answer_id);


COPY question FROM '/Users/elliotlandon/Desktop/SDC/questions.csv' DELIMITER ',' CSV HEADER;
COPY answer FROM '/Users/elliotlandon/Desktop/SDC/answers.csv' DELIMITER ',' CSV HEADER;
COPY photo FROM '/Users/elliotlandon/Desktop/SDC/answers_photos.csv' DELIMITER ',' CSV HEADER;


CREATE INDEX questionID ON question (question_id);
CREATE INDEX productid ON question (product_id);
CREATE INDEX answerID ON answer (answer_id);
CREATE INDEX photoID ON photo (photo_id);
CREATE INDEX questionIDinanswer ON answer (question_id);
CREATE INDEX answerIDinphoto ON photo (answer_id);

CREATE INDEX answerHelpful ON answer (helpfulness);
CREATE INDEX answerReported ON answer (reported);
CREATE INDEX questionReported ON question (reported);
CREATE INDEX questionHelpful ON question (question_helpfulness);

ALTER SEQUENCE question_question_id_seq RESTART WITH 5000000;
ALTER SEQUENCE answer_answer_id_seq RESTART WITH 5000000;




