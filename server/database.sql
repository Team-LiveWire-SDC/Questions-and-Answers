CREATE TABLE question (
 queston_id SERIAL,
 -- fix typo
 product_id INTEGER NOT NULL,
 question_body TEXT NOT NULL,
 question_date TEXT NOT NULL,
 asker_name TEXT NOT NULL,
 asker_email TEXT NOT NULL,
 reported BOOLEAN NOT NULL,
 question_helpfulness INTEGER NOT NULL
);

ALTER TABLE question ADD CONSTRAINT question_pkey PRIMARY KEY (queston_id);

CREATE TABLE answer (
 answer_id SERIAL,
 queston_id INTEGER NOT NULL,
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

ALTER TABLE answer ADD CONSTRAINT answer_queston_id_fkey FOREIGN KEY (queston_id) REFERENCES question(queston_id);
ALTER TABLE photo ADD CONSTRAINT photo_id_answer_fkey FOREIGN KEY (answer_id) REFERENCES answer(answer_id);






