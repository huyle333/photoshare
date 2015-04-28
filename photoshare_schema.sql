DROP TABLE Pictures CASCADE;
DROP TABLE Users CASCADE;
DROP SEQUENCE Pictures_picture_id_seq;
DROP SEQUENCE Users_user_id_seq;

CREATE SEQUENCE Pictures_picture_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 14
  CACHE 1;

DROP SEQUENCE Tag_id_seq CASCADE;
CREATE SEQUENCE Tag_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 14
  CACHE 1;

DROP TABLE Tag CASCADE;
CREATE TABLE TAG
(
  id int4 NOT NULL PRIMARY KEY DEFAULT nextval('Tag_id_seq'),
  text varchar(255) NOT NULL
);

CREATE SEQUENCE Users_user_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 14
  CACHE 1;

DROP SEQUENCE Education_id_seq CASCADE;
CREATE SEQUENCE Education_id_seq 
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 14
  CACHE 1;

DROP TABLE Education;
CREATE TABLE Education
(
  id int4 NOT NULL DEFAULT nextval('Education_id_seq'),
  school varchar(255) NOT NULL,
  CONSTRAINT education_pk PRIMARY KEY (id)
);

DROP SEQUENCE Location_id_seq CASCADE;
CREATE SEQUENCE Location_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 14
  CACHE 1;
 
DROP TABLE Location;
CREATE TABLE Location
(
  id int4 NOT NULL DEFAULT nextval('Location_id_seq'),
  city varchar(255) NOT NULL,
  state varchar(255) NOT NULL,
  country varchar(255) NOT NULL,
  CONSTRAINT location_pk PRIMARY KEY (id)
);

CREATE TABLE Users
(
  user_id int4 NOT NULL DEFAULT nextval('Users_user_id_seq'),
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  role_name varchar(255) NOT NULL DEFAULT 'RegisteredUser',
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  dob date NOT NULL,
  gender varchar(1) NOT NULL,
  education int4 REFERENCES Education (id),
  location int4 REFERENCES Location (id),
  hometown int4 REFERENCES Location (id),
  UNIQUE(email),
  CONSTRAINT users_pk PRIMARY KEY (user_id)
);

DROP SEQUENCE Album_id_seq CASCADE;
CREATE SEQUENCE Album_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 14
  CACHE 1;

DROP TABLE Album CASCADE;
CREATE TABLE Album
(
  album_id int4 NOT NULL DEFAULT nextval('Album_id_seq'),
  name varchar(255) NOT NULL,
  user_id int4 REFERENCES Users (user_id),
  album_date date NOT NULL,
  CONSTRAINT album_pk PRIMARY KEY (album_id)
);

CREATE TABLE Pictures
(
  picture_id int4 NOT NULL DEFAULT nextval('Pictures_picture_id_seq'),
  caption varchar(255) NOT NULL,
  imgdata text NOT NULL,
  album int4 NOT NULL REFERENCES Album (album_id) ON DELETE CASCADE,
  CONSTRAINT pictures_pk PRIMARY KEY (picture_id)
); 

DROP TABLE Likes CASCADE;
CREATE TABLE Likes
(
  picture_id int4 REFERENCES Pictures (picture_id) ON DELETE CASCADE,
  user_id int4 REFERENCES users (user_id) ON DELETE CASCADE,
  CONSTRAINT likes_pk PRIMARY KEY (picture_id, user_id)
);

DROP TABLE PicturesTag;
CREATE TABLE PicturesTag
(
  photo int4 REFERENCES Pictures (picture_id) ON DELETE CASCADE,
  tag int4 REFERENCES Tag (id)
);

DROP TABLE Friends;
CREATE TABLE Friends
(
  user_id int4 PRIMARY KEY REFERENCES Users (user_id) ON DELETE CASCADE,
  friend_id int4 REFERENCES Users (user_id) ON DELETE CASCADE
);

DROP SEQUENCE Comment_id_seq CASCADE;
CREATE SEQUENCE Comment_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 14
  CACHE 1;

DROP TABLE Comment;
CREATE TABLE Comment
(
  comment_id int4 NOT NULL PRIMARY KEY DEFAULT nextval('Comment_id_seq'),
  picture_id int4 NOT NULL REFERENCES Pictures (picture_id) ON DELETE CASCADE,
  user_id int4 NOT NULL REFERENCES Users (user_id),
  text varchar(255) NOT NULL,
  comment_date date NOT NULL
);

INSERT INTO Users 
(
    email, password, first_name, last_name, dob, gender
) 
VALUES 
(
    'test@bu.edu', 'test', 'test', 'test1', '11/25/1992', 'M'
);
INSERT INTO Users 
(
    email, password, first_name, last_name, dob, gender
) 
VALUES 
(
    'test2@bu.edu', 'test2', 'test2', 'test2', '01/14/1995', 'M'
);

